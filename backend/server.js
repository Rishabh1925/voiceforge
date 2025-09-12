// Load environment variables FIRST - before any other requires
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

// Import routes AFTER dotenv loads
const voiceRoutes = require('./routes/voice');
const callRoutes = require('./routes/call');

const app = express();
const PORT = process.env.PORT || 5000;

// Debug: Check if env is loaded
console.log('Server.js - API Key loaded:', !!process.env.ELEVENLABS_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for audio files)
app.use('/audio', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/voice', voiceRoutes);
app.use('/api/call', callRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running!', 
    timestamp: new Date().toISOString(),
    envLoaded: !!process.env.ELEVENLABS_API_KEY
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  // Ensure uploads directory exists
  fs.ensureDirSync(path.join(__dirname, 'uploads'));
});

module.exports = app;
