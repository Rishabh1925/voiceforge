
```markdown
# Voice-over AI Agent

<div align="center">

![Voice AI Agent](https://img.shields.io/badge/Voice-AI%20Agent-blue?style=for-the-badge&logo=microphone)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![ElevenLabs](https://img.shields.io/badge/ElevenLabs-TTS-orange?style=for-the-badge)

**A sophisticated web application that converts text to natural-sounding speech and makes phone calls using AI voice synthesis.**

[Live Demo](#) • [Documentation](#) • [Report Bug](https://github.com/Rishabh1925/voice-ai-agent/issues) • [Request Feature](https://github.com/Rishabh1925/voice-ai-agent/issues)

</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## About The Project

Voice-over AI Agent is a cutting-edge web application that bridges the gap between text and voice communication. Built with modern web technologies, it leverages ElevenLabs' advanced AI voice synthesis to transform written content into natural-sounding speech and enables automated phone calls through Exotel's telephony platform.

### Why This Project?

- **Accessibility**: Makes content accessible through voice for visually impaired users
- **Automation**: Automates voice-based communication workflows
- **Customization**: Multiple voice options for different use cases
- **Business Ready**: Professional-grade APIs with proper error handling
- **Developer Friendly**: Clean code structure with comprehensive documentation

---

## Features

### Text-to-Speech Conversion
- Multiple AI-generated voices from ElevenLabs
- High-quality audio output (MP3 format)
- Real-time speech generation
- Voice preview and selection

### Phone Call Integration
- Automated phone calls with custom audio
- Exotel API integration
- Call status tracking
- Simulation mode for testing

### User Experience
- Clean, responsive web interface
- Real-time feedback and loading states
- Error handling with user-friendly messages
- Character count and input validation

### Security & Performance
- Secure API key management
- Environment-based configuration
- Audio file caching and cleanup
- Rate limiting ready

---

## Built With

### Frontend
- [![React](https://img.shields.io/badge/React-18.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
- [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=flat&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?style=flat)](https://axios-http.com/)
- [![Lucide React](https://img.shields.io/badge/Lucide-Icons-FF6B6B?style=flat)](https://lucide.dev/)

### Backend
- [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)
- [![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=flat&logo=express)](https://expressjs.com/)
- [![ElevenLabs](https://img.shields.io/badge/ElevenLabs-TTS%20API-orange?style=flat)](https://elevenlabs.io/)
- [![Exotel](https://img.shields.io/badge/Exotel-Telephony%20API-blue?style=flat)](https://exotel.com/)

### Tools & Utilities
- [![Nodemon](https://img.shields.io/badge/Nodemon-Development-76D04B?style=flat)](https://nodemon.io/)
- [![CORS](https://img.shields.io/badge/CORS-Middleware-FF6B6B?style=flat)](https://github.com/expressjs/cors)
- [![dotenv](https://img.shields.io/badge/dotenv-Config-ECD53F?style=flat)](https://github.com/motdotla/dotenv)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0 or higher)
  ```
  node --version
  ```
- **npm** (v8.0 or higher)
  ```
  npm --version
  ```

### Installation

1. **Clone the repository**
   ```
   git clone https://github.com/Rishabh1925/voice-ai-agent.git
   cd voice-ai-agent
   ```

2. **Install backend dependencies**
   ```
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```
   cd ../frontend
   npm install
   ```

### Configuration

1. **Create environment file**
   ```
   cd ../backend
   cp .env.example .env
   ```

2. **Configure your API keys** in `backend/.env`:
   ```
   PORT=5000
   
   # ElevenLabs Configuration
   ELEVENLABS_API_KEY=sk_your_elevenlabs_api_key_here
   
   # Exotel Configuration (Optional for phone calls)
   EXOTEL_ACCOUNT_SID=your_exotel_account_sid
   EXOTEL_API_TOKEN=your_exotel_api_token
   EXOTEL_PHONE_NUMBER=your_exotel_phone_number
   ```

3. **Get your API keys**:
   - **ElevenLabs**: [Get API Key](https://elevenlabs.io/app/settings/api-keys)
   - **Exotel**: [Developer Portal](https://developer.exotel.com/)

4. **Start the development servers**

   **Option 1: Start both servers separately**
   ```
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

   **Option 2: Use development script (if available)**
   ```
   npm run dev
   ```

5. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Health Check**: http://localhost:5000/health

---

## Usage

### Generating Speech

1. **Enter your text** in the textarea (up to 500 characters)
2. **Select a voice** from the dropdown menu
3. **Click "Generate Speech"** and wait for processing
4. **Listen to the audio** using the built-in player

### Making Phone Calls

1. **Generate speech** first (following steps above)
2. **Enter a phone number** in international format (e.g., +1234567890)
3. **Click "Make Call"** to initiate the phone call
4. **Monitor call status** in the interface

> **Note**: Phone calls will be simulated if Exotel credentials are not configured. This is perfect for testing and development.

### Tips

- Use clear, well-punctuated text for better speech quality
- Test different voices to find the best fit for your content
- Phone numbers should include country codes
- Check the console for detailed error messages during development

---

## API Reference

### Voice Endpoints

#### Get Available Voices
```
GET /api/voice/voices
```
**Response:**
```
{
  "success": true,
  "voices": [
    {
      "voice_id": "pNInz6obpgDQGcFmaJgB",
      "name": "Adam",
      "category": "generated",
      "description": "Middle aged American male"
    }
  ]
}
```

#### Generate Speech
```
POST /api/voice/generate
```
**Request Body:**
```
{
  "text": "Hello, this is a test message",
  "voice_id": "pNInz6obpgDQGcFmaJgB"
}
```
**Response:**
```
{
  "success": true,
  "audioUrl": "/audio/speech_1234567890.mp3?t=1234567890",
  "fileName": "speech_1234567890.mp3",
  "message": "Speech generated successfully"
}
```

### Call Endpoints

#### Make Phone Call
```
POST /api/call/make-call
```
**Request Body:**
```
{
  "phoneNumber": "+1234567890",
  "audioUrl": "/audio/speech_1234567890.mp3"
}
```

### Utility Endpoints

#### Health Check
```
GET /health
```
**Response:**
```
{
  "status": "Server is running!",
  "timestamp": "2025-09-12T18:30:00.000Z",
  "envLoaded": true
}
```

---

## Project Structure

```
voice-ai-agent/
├── README.md                       # Project documentation
├── LICENSE                         # MIT License
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment template
├── package.json                    # Root package configuration
├── backend/                        # Node.js server
│   ├── .env                        # Environment variables
│   ├── package.json                # Backend dependencies
│   ├── server.js                   # Express server setup
│   ├── routes/                     # API route handlers
│   │   ├── voice.js                # Text-to-speech routes
│   │   └── call.js                 # Phone call routes
│   └── uploads/                    # Generated audio files
└── frontend/                       # React application
    ├── package.json                # Frontend dependencies
    ├── public/                     # Static assets
    │   ├── index.html              # HTML template
    │   └── favicon.ico             # App icon
    └── src/                        # React source code
        ├── App.js                  # Main application component
        ├── App.css                 # Application styles
        ├── index.js                # React entry point
        └── index.css               # Global styles
```

---

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### Development Setup

1. **Fork the Project**
2. **Create your Feature Branch**
   ```
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes**
4. **Commit your Changes**
   ```
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push to the Branch**
   ```
   git push origin feature/AmazingFeature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly
- Include relevant tests if applicable

### Bug Reports

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)

---

## License

Distributed under the MIT License. See `LICENSE` file for more information.

```
MIT License - see the LICENSE file for details
```

---

## Contact

**Your Name** - [@Rishabh1925](https://twitter.com/Rishabh1925) - email@example.com

**Project Link**: [https://github.com/Rishabh1925/voice-ai-agent](https://github.com/Rishabh1925/voice-ai-agent)

### Connect with me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/Rishabh1925)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/Rishabh1925)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Rishabh1925)

---

## Acknowledgments

### Special Thanks

- **[ElevenLabs](https://elevenlabs.io/)** - For providing exceptional AI voice synthesis technology
- **[Exotel](https://exotel.com/)** - For reliable telephony API services
- **[React Team](https://reactjs.org/)** - For the amazing frontend framework
- **[Express.js](https://expressjs.com/)** - For the robust backend framework
- **[Lucide](https://lucide.dev/)** - For beautiful, consistent icons

### Resources

- [ElevenLabs API Documentation](https://elevenlabs.io/docs)
- [Exotel API Documentation](https://developer.exotel.com/)
- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

### Inspiration

This project was inspired by the need to make voice technology more accessible and to demonstrate the power of combining modern web frameworks with AI-powered APIs.

---

<div align="center">

**Star this repository if it helped you!**

Made with care by [Rishabh Ranjan Singh](https://github.com/Rishabh1925)

</div>
```
