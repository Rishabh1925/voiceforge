const express = require('express');
const axios   = require('axios');
const fs      = require('fs-extra');
const path    = require('path');
const router  = express.Router();

const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';

router.get('/voices', async (_, res) => {
  try {
    const key = process.env.ELEVENLABS_API_KEY;
    if (!key) return res.status(500).json({ success:false, error:'Missing API key' });

    const { data } = await axios.get(`${ELEVENLABS_BASE_URL}/voices`, {
      headers:{ 'xi-api-key': key }
    });

    const voices = data.voices.map(v => ({
      voice_id   : v.voice_id,
      name       : v.name,
      category   : v.category,
      description: v.description || ''
    }));

    res.json({ success:true, voices });
  } catch (err) {
    console.error('Voice list error', err.response?.data || err.message);
    res.status(500).json({ success:false, error:'Failed to fetch voices' });
  }
});

router.post('/generate', async (req, res) => {
  try {
    const key = process.env.ELEVENLABS_API_KEY;
    if (!key) return res.status(500).json({ success:false, error:'Missing API key' });

    const { text, voice_id = 'pNInz6obpgDQGcFmaJgB' } = req.body;
    if (!text?.trim()) return res.status(400).json({ success:false, error:'Text is required' });

    const { data } = await axios.post(
      `${ELEVENLABS_BASE_URL}/text-to-speech/${voice_id}`,
      {
        text,
        model_id      : 'eleven_monolingual_v1',
        voice_settings: { stability:0.5, similarity_boost:0.8 }
      },
      {
        headers:{
          'xi-api-key' : key,
          'Content-Type':'application/json',
          'Accept'      :'audio/mpeg'
        },
        responseType:'arraybuffer'
      }
    );

    const fileName = `speech_${Date.now()}.mp3`;
    
    // FIXED: Use /tmp in production (Vercel), uploads locally
    const uploadsDir = process.env.NODE_ENV === 'production' 
      ? '/tmp' 
      : path.join(__dirname, '..', 'uploads');
    
    const filePath = path.join(uploadsDir, fileName);

    // Ensure directory exists
    await fs.ensureDir(uploadsDir);
    await fs.writeFile(filePath, data);

    res.json({
      success : true,
      audioUrl: `/audio/${fileName}?t=${Date.now()}`,
      fileName,
      message : 'Speech generated successfully'
    });
  } catch (err) {
    console.error('Generate error', err.response?.data || err.message);
    res.status(500).json({ success:false, error:'Failed to generate speech' });
  }
});

module.exports = router;
