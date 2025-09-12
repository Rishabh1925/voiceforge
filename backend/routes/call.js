const express = require('express');
const axios = require('axios');
const router = express.Router();

const EXOTEL_ACCOUNT_SID = process.env.EXOTEL_ACCOUNT_SID;
const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN;
const EXOTEL_PHONE_NUMBER = process.env.EXOTEL_PHONE_NUMBER;

// Make a call using Exotel
router.post('/make-call', async (req, res) => {
  try {
    const { phoneNumber, audioUrl } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number is required' 
      });
    }

    // Exotel API endpoint
    const exotelUrl = `https://api.exotel.com/v1/Accounts/${EXOTEL_ACCOUNT_SID}/Calls/connect.json`;

    // Prepare call data
    const callData = {
      From: EXOTEL_PHONE_NUMBER,
      To: phoneNumber,
      CallerId: EXOTEL_PHONE_NUMBER,
      Url: audioUrl ? `${req.protocol}://${req.get('host')}/api/call/play-audio?url=${encodeURIComponent(audioUrl)}` : undefined,
      TimeLimit: 30, // Call duration limit in seconds
      TimeOut: 30,   // Ring timeout in seconds
    };

    // Make API call to Exotel
    const response = await axios.post(exotelUrl, callData, {
      auth: {
        username: EXOTEL_ACCOUNT_SID,
        password: EXOTEL_API_TOKEN,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    res.json({
      success: true,
      callSid: response.data.Call.Sid,
      status: response.data.Call.Status,
      message: 'Call initiated successfully',
    });

  } catch (error) {
    console.error('Error making call:', error.response?.data || error.message);
    
    // If Exotel is not available, simulate the call
    if (error.response?.status === 401 || error.code === 'ENOTFOUND') {
      console.log('Exotel not available, simulating call...');
      return res.json({
        success: true,
        callSid: `SIMULATED_${Date.now()}`,
        status: 'initiated',
        message: 'Call simulated successfully (Exotel not available)',
        isSimulated: true,
      });
    }

    res.status(500).json({ 
      success: false, 
      error: 'Failed to make call',
      message: error.response?.data || error.message
    });
  }
});

// Webhook to handle call events
router.post('/webhook', (req, res) => {
  console.log('Call webhook received:', req.body);
  res.status(200).send('OK');
});

// Endpoint to play audio during call
router.get('/play-audio', (req, res) => {
  const { url } = req.query;
  
  // Generate TwiML-like response for playing audio
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${url}</Play>
  <Hangup/>
</Response>`;

  res.set('Content-Type', 'text/xml');
  res.send(twiml);
});

// Get call status
router.get('/status/:callSid', async (req, res) => {
  try {
    const { callSid } = req.params;

    if (callSid.startsWith('SIMULATED_')) {
      return res.json({
        success: true,
        status: 'completed',
        isSimulated: true,
      });
    }

    const exotelUrl = `https://api.exotel.com/v1/Accounts/${EXOTEL_ACCOUNT_SID}/Calls/${callSid}.json`;

    const response = await axios.get(exotelUrl, {
      auth: {
        username: EXOTEL_ACCOUNT_SID,
        password: EXOTEL_API_TOKEN,
      },
    });

    res.json({
      success: true,
      status: response.data.Call.Status,
      duration: response.data.Call.Duration,
    });

  } catch (error) {
    console.error('Error getting call status:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get call status',
      message: error.message
    });
  }
});

module.exports = router;