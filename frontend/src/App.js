import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Volume2, Loader2, CheckCircle, XCircle } from 'lucide-react';
import './App.css';

// Updated to support both local and production
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://voiceforge1.vercel.app/api'  // Production backend
  : 'http://localhost:5000/api';  // Local development

function App() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [voices, setVoices] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [audioKey, setAudioKey] = useState(0);
  const [callStatus, setCallStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchVoices();
  }, []);

  const fetchVoices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/voice/voices`);
      if (response.data.success) {
        setVoices(response.data.voices);
        if (response.data.voices.length > 0) {
          setSelectedVoice(response.data.voices[0].voice_id);
        }
      }
    } catch (error) {
      console.error('Error fetching voices:', error);
      setMessage('Failed to fetch voices. Please check your ElevenLabs API key.');
    }
  };

  const generateSpeech = async () => {
    if (!text.trim()) {
      setMessage('Please enter some text to convert to speech.');
      return;
    }

    setIsGenerating(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/voice/generate`, {
        text: text,
        voice_id: selectedVoice,
      });

      if (response.data.success) {
        setAudioUrl('');
        setAudioKey(k => k + 1);
        
        setTimeout(() => {
          // Updated to use dynamic base URL
          const baseUrl = import.meta.env.PROD 
            ? 'https://voiceforge1.vercel.app' 
            : 'http://localhost:5000';
          setAudioUrl(`${baseUrl}${response.data.audioUrl}`);
        }, 50);
        
        setMessage('Speech generated successfully! You can now make a call.');
      } else {
        setMessage('Failed to generate speech: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      setMessage('Error generating speech: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsGenerating(false);
    }
  };

  const makeCall = async () => {
    if (!phoneNumber.trim()) {
      setMessage('Please enter a phone number to call.');
      return;
    }

    if (!audioUrl) {
      setMessage('Please generate speech first before making a call.');
      return;
    }

    setIsCalling(true);
    setCallStatus('');
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/call/make-call`, {
        phoneNumber: phoneNumber,
        audioUrl: audioUrl,
      });

      if (response.data.success) {
        setCallStatus('Call initiated successfully');
        if (response.data.isSimulated) {
          setMessage('Call simulated (Exotel not configured). Check console for details.');
        } else {
          setMessage(`Call initiated! Call SID: ${response.data.callSid}`);
        }
      } else {
        setMessage('Failed to make call: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error making call:', error);
      setMessage('Error making call: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>VoiceForge</h1>
        <p>Convert text to speech and make phone calls</p>
      </header>

      <main className="main-content">
        <div className="form-container">
          <div className="input-section">
            <label htmlFor="text-input">Enter text to convert to speech:</label>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your message here..."
              rows="4"
              maxLength="500"
            />
            <div className="char-count">{text.length}/500 characters</div>
          </div>

          <div className="input-section">
            <label htmlFor="voice-select">Choose a voice:</label>
            <select
              id="voice-select"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              disabled={voices.length === 0}
            >
              {voices.length === 0 ? (
                <option>Loading voices...</option>
              ) : (
                voices.map((voice) => (
                  <option key={voice.voice_id} value={voice.voice_id}>
                    {voice.name} ({voice.category})
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="input-section">
            <label htmlFor="phone-input">Phone number to call:</label>
            <input
              id="phone-input"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
            />
          </div>

          <div className="button-section">
            <button
              onClick={generateSpeech}
              disabled={isGenerating || !text.trim()}
              className="generate-btn"
            >
              {isGenerating ? (
                <><Loader2 className="spin" /> Generating...</>
              ) : (
                <><Volume2 /> Generate Speech</>
              )}
            </button>

            <button
              onClick={makeCall}
              disabled={isCalling || !audioUrl || !phoneNumber.trim()}
              className="call-btn"
            >
              {isCalling ? (
                <><Loader2 className="spin" /> Calling...</>
              ) : (
                <><Phone /> Make Call</>
              )}
            </button>
          </div>

          {audioUrl && (
            <div className="audio-section">
              <h3>Generated Audio:</h3>
              <audio key={audioKey} controls className="audio-player">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {message && (
            <div className={`message ${message.includes('Error') || message.includes('Failed') ? 'error' : 'success'}`}>
              {message.includes('Error') || message.includes('Failed') ? (
                <XCircle size={16} />
              ) : (
                <CheckCircle size={16} />
              )}
              {message}
            </div>
          )}

          {callStatus && (
            <div className="call-status">
              <strong>Call Status:</strong> {callStatus}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ElevenLabs TTS API & Exotel Telephony</p>
      </footer>
    </div>
  );
}

export default App;
