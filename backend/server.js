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
console.log('Server.js - Environment:', process.env.NODE_ENV);

// CORS configuration - Allow both local and production URLs
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5000',
  'https://voiceforge1-zct2.vercel.app',  // Your actual frontend URL
  'https://voiceforge1.vercel.app'        // Your backend URL (for testing)
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for audio files)
// Note: On Vercel, use external storage instead of local uploads
app.use('/audio', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/voice', voiceRoutes);
app.use('/api/call', callRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!', 
    timestamp: new Date().toISOString(),
    envLoaded: !!process.env.ELEVENLABS_API_KEY,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'VoiceForge API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      health: '/api/health',
      voice: '/api/voice',
      call: '/api/call'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    path: req.path
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'An error occurred' : error.message 
  });
});

// Local development server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📍 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📍 API Docs: http://localhost:${PORT}/`);
    
    // Ensure uploads directory exists (only for local dev)
    fs.ensureDirSync(path.join(__dirname, 'uploads'));
  });
}

// Export for Vercel serverless functions
module.exports = app;
