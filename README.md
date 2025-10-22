# VoiceForge

<div align="left">

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![ElevenLabs](https://img.shields.io/badge/ElevenLabs-AI%20Voices-FF6B6B?style=for-the-badge)

**AI-powered voice automation platform for text-to-speech and automated calling**

Powered by ElevenLabs AI • Built for Scale • Developer-Friendly

[![Live Platform](https://img.shields.io/badge/Live%20Platform-Try%20Now-success?style=for-the-badge)](https://voiceforge-ai.vercel.app)
[![Demo Video](https://img.shields.io/badge/Demo%Video-Visit%20Now-success?style=for-the-badge)](https://your-demo-url.com)
[![Report Bug](https://img.shields.io/badge/Report-Bug-red?style=for-the-badge)](https://github.com/Rishabh1925/voiceforge/issues)

</div>

---

## Getting Started

You have two options to use VoiceForge:

### Option 1: Use the Hosted Platform (Recommended for Quick Start)

Access the fully deployed application instantly - no setup required.

**Visit:** [https://voiceforge-ai.vercel.app](https://voiceforge-ai.vercel.app)

Perfect for:
- Testing the platform immediately
- Evaluating features before local setup
- Using the service without technical configuration
- Quick demonstrations and prototypes

### Option 2: Run Locally on Your Machine

Set up VoiceForge on your own computer for development, customization, or self-hosting.

**Best for:**
- Developers wanting to modify or extend the platform
- Organizations requiring self-hosted solutions
- Learning how the system works under the hood
- Contributing to the project

Continue reading below for complete local installation instructions.

---

## Local Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)

Verify your installations:
```bash
node --version
npm --version
git --version
```

### Step 1: Clone and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rishabh1925/voiceforge.git
   cd voiceforge
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Step 2: Environment Configuration

1. **Create environment file:**
   ```bash
   cd ../backend
   cp .env.example .env
   ```

2. **Get your API keys:**
   - **ElevenLabs API Key**: 
     - Go to [ElevenLabs](https://elevenlabs.io)
     - Sign up for a free account
     - Navigate to Settings > API Keys
     - Copy your API key
   
   - **Exotel API (Optional for phone calls):**
     - Visit [Exotel Developer Portal](https://developer.exotel.com)
     - Sign up and get your credentials

3. **Configure your `.env` file:**
   Open `backend/.env` in a text editor and add:
   ```env
   PORT=5000
   
   # Required: ElevenLabs Configuration
   ELEVENLABS_API_KEY=sk_your_elevenlabs_api_key_here
   
   # Optional: Exotel Configuration (for phone calls)
   EXOTEL_ACCOUNT_SID=your_exotel_account_sid
   EXOTEL_API_TOKEN=your_exotel_api_token
   EXOTEL_PHONE_NUMBER=your_exotel_phone_number
   ```

### Step 3: Run the Application

**Start both servers:**

Open two terminal windows:

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### Step 4: Access Your Local Application

Once both servers are running:

- **Frontend Application**: Open [http://localhost:3000](http://localhost:3000) in your browser
- **Backend API**: Running on [http://localhost:5000](http://localhost:5000)
- **API Health Check**: Visit [http://localhost:5000/health](http://localhost:5000/health)

### Troubleshooting Local Setup

**Common Issues:**

1. **Port already in use:**
   ```bash
   # Kill processes on specific ports
   lsof -ti:3000 | xargs kill -9
   lsof -ti:5000 | xargs kill -9
   ```

2. **API Key not working:**
   - Double-check your ElevenLabs API key
   - Ensure no extra spaces in the .env file
   - Restart the backend server after changing .env

3. **Dependencies not installing:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Permission errors on Mac/Linux:**
   ```bash
   sudo npm install -g npm@latest
   ```

---

## What Makes This Special?

VoiceForge is a complete voice communication platform that integrates powerful AI services to deliver:

- Convert text to human-like speech using ElevenLabs' cutting-edge AI
- Make automated phone calls with custom voice messages
- Provide multiple voice personalities for different use cases
- Scale effortlessly with professional-grade API integrations
- Production-ready with proper error handling and security

## Key Features

<table>
<tr>
<td width="50%">

### Advanced Text-to-Speech
- **20+ AI-generated voices** from ElevenLabs
- **High-fidelity audio** output (MP3, 44.1kHz)
- **Real-time generation** with streaming support
- **Voice cloning capabilities** (premium feature)
- **Emotion and style control**

</td>
<td width="50%">

### Smart Phone Integration  
- **Automated voice calls** via Exotel API
- **Call status tracking** and analytics
- **International number support**
- **Webhook integrations** for call events
- **Testing mode** for development

</td>
</tr>
<tr>
<td>

### Beautiful User Experience
- **Responsive design** that works everywhere
- **Real-time audio waveforms**
- **Drag-and-drop file uploads**
- **Dark/light theme support**
- **Progressive Web App** (PWA) ready

</td>
<td>

### Enterprise-Ready
- **Secure API key management**
- **Rate limiting** and usage tracking
- **Audio file optimization**
- **Error recovery mechanisms**
- **Comprehensive logging**

</td>
</tr>
</table>

## Tech Stack

<div align="center">

### Frontend Powerhouse
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=flat-square&logo=css3&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=flat-square&logo=axios&logoColor=white)

### Backend Excellence  
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4+-000000?style=flat-square&logo=express&logoColor=white)
![ElevenLabs](https://img.shields.io/badge/ElevenLabs-AI%20TTS-FF6B6B?style=flat-square)
![Exotel](https://img.shields.io/badge/Exotel-Telephony-0066CC?style=flat-square)

</div>

## Usage Guide

### Generate Natural Speech

1. **Enter your text** (supports up to 5,000 characters)
2. **Choose a voice personality** from our curated collection
3. **Adjust settings** (speed, pitch, emotion)
4. **Click "Generate"** and get studio-quality audio
5. **Preview and download** your speech file

### Make AI Phone Calls

1. **Generate your voice message** first
2. **Enter phone number** (international format: +1234567890)
3. **Schedule or call immediately**
4. **Track call status** in real-time
5. **Review call analytics** and recordings

### Pro Tips

For better results:
- Use natural punctuation and pauses
- Break long texts into shorter segments  
- Test different voices for your content type
- Use SSML tags for advanced speech control

## API Documentation

### Voice Generation

```http
POST /api/voice/generate
Content-Type: application/json

{
  "text": "Hello, this is your AI assistant speaking!",
  "voice_id": "pNInz6obpgDQGcFmaJgB",
  "model_id": "eleven_monolingual_v1",
  "voice_settings": {
    "stability": 0.75,
    "similarity_boost": 0.75,
    "style": 0.5,
    "use_speaker_boost": true
  }
}
```

<details>
<summary><strong>View Response Format</strong></summary>

```json
{
  "success": true,
  "data": {
    "audioUrl": "/api/audio/speech_1699123456789.mp3",
    "fileName": "speech_1699123456789.mp3",
    "duration": 3.45,
    "wordCount": 8,
    "voiceUsed": "Adam - Natural Male",
    "generatedAt": "2023-11-04T10:30:45.123Z"
  },
  "usage": {
    "charactersUsed": 43,
    "charactersRemaining": 9957
  }
}
```

</details>

### Phone Call Integration

```http
POST /api/call/make-call
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "audioUrl": "/api/audio/speech_1699123456789.mp3",
  "callerId": "VoiceAI",
  "webhook": "https://your-app.com/webhook/call-status"
}
```

### Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/voice/voices` | `GET` | List available voices |
| `/api/voice/generate` | `POST` | Generate speech from text |
| `/api/voice/stream` | `POST` | Stream speech generation |
| `/api/call/make-call` | `POST` | Initiate phone call |
| `/api/call/status/:id` | `GET` | Get call status |
| `/api/health` | `GET` | Health check |

## Project Architecture

```
voiceforge/
├── backend/                      # Node.js + Express API
│   ├── server.js                 # Application entry point
│   ├── routes/                   # API route handlers
│   │   ├── voice.js              # Text-to-speech endpoints
│   │   ├── call.js               # Phone call endpoints  
│   │   └── utils.js              # Utility functions
│   ├── middleware/               # Custom middleware
│   ├── services/                 # External API integrations
│   └── uploads/                  # Generated audio files
├── frontend/                     # React SPA
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Application pages
│   │   ├── hooks/                # Custom React hooks
│   │   ├── services/             # API client functions
│   │   └── utils/                # Helper functions
│   └── public/                   # Static assets
├── docs/                         # Documentation
└── tests/                        # Test suites
```

## Contributing

We love contributions! Here's how you can help make this project even better:

### Quick Contributing Guide

1. **Fork the repo** and clone your fork
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Run tests**: `npm run test`
5. **Commit**: `git commit -m "Add amazing feature"`
6. **Push**: `git push origin feature/amazing-feature`
7. **Create a Pull Request**

### Areas We'd Love Help With

- UI/UX improvements and design enhancements
- New voice providers and TTS service integrations  
- Analytics dashboard for usage insights and metrics
- Internationalization and multi-language support
- Testing coverage and comprehensive test suites
- Documentation improvements with better examples and tutorials

## Community & Support

### Need Help?

- **Check the Documentation** - Comprehensive guides and tutorials
- **Report Issues** - [Bug reports and feature requests](https://github.com/Rishabh1925/voiceforge/issues)
- **Join Discussions** - Community Q&A

## License & Legal

This project is licensed under the **MIT License** - see the LICENSE file for details.

### Privacy & Security

- We don't store your voice data permanently
- API keys are encrypted and securely managed
- All audio files are automatically cleaned up
- GDPR compliant data handling

## Acknowledgments

### Special Thanks

- **ElevenLabs** - Revolutionary AI voice technology
- **Exotel** - Reliable telephony infrastructure  
- **React Community** - Amazing frontend framework
- **Node.js Team** - Powerful backend runtime

### Inspiration & Resources

- Voice UI Design Patterns
- Speech Synthesis Markup Language (SSML)
- Web Audio API Documentation

---

<div align="center">

**Built by Rishabh Ranjan Singh**

*Making voice technology accessible to everyone*

[![GitHub](https://img.shields.io/badge/GitHub-Rishabh1925-181717?style=flat-square&logo=github)](https://github.com/Rishabh1925)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/rishabh-ranjan-singh)

</div>
