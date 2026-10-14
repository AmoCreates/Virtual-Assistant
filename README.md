# 🎙️ Virtual Assistant — Frontend Client

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Web Speech API](https://img.shields.io/badge/Web_Speech-API-FF6F00?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

A voice-interactive, customizable AI assistant web application built with **React 19**, **Vite**, and **Tailwind CSS v4**. Featuring bidirectional voice communication (speech-to-text recognition and text-to-speech synthesis), persona and voice tone personalization, responsive glassmorphic UI, and automated action execution.

---

## 🌟 Key Features

- **🗣️ Hands-Free Voice Interaction**:
  - **Speech Recognition (STT)**: Continuous listening via the Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) with automatic pause during speech synthesis and resume on completion.
  - **Speech Synthesis (TTS)**: Natural voice playback (`window.speechSynthesis`) with intelligent voice selection filtering for female and male vocal personas.
- **🎨 Custom Assistant Studio**:
  - **Avatar Customization**: Choose from curated preset avatars or upload custom avatar graphics directly to Cloudinary.
  - **Personalized Identity**: Assign a custom name to your assistant (e.g. *Sia*, *Nova*, *Jarvis*, *Aria*).
  - **Voice Tone Selection**: Toggle between female (*girl*) and male (*boy*) vocal delivery profiles.
- **⚡ Automated Action Execution**:
  - 🔍 **Google Search**: Performs web searches automatically based on queries.
  - ▶️ **YouTube Integration**: Search videos, launch YouTube, or directly start music playback.
  - 📖 **Wikipedia Lookup**: Jumps straight to relevant Wikipedia knowledge entries.
  - 📰 **News & Weather**: Instant Google News and weather forecast searches.
  - 📱 **Social Media Launchers**: Instant shortcuts for Instagram, Twitter/X, and Facebook.
  - ⏰ **Clock & Calendar**: Speaks out current time and date in natural spoken format.
  - 🧠 **Conversational Intelligence**: Answers questions, tells jokes, provides advice, and converses naturally via Google Gemini AI.
- **🔐 Session & Route Protection**:
  - Protected routes redirect unauthenticated users to `/signin` or `/signup`.
  - Automatic onboarding redirection to `/customize` if assistant avatar or name has not been set yet.
- **💎 Futuristic Cyberpunk & Glassmorphic UI**:
  - Dark mode aesthetic with deep gradient backdrops (`#030250` into `#0a0a2e`).
  - Animated glowing waveforms during user listening and AI speaking states.
  - Responsive layouts optimized for desktop, tablet, and mobile browsers.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **[React 19](https://react.dev/)** | Modern frontend framework with Concurrent Mode & updated hooks |
| **[Vite 7](https://vitejs.dev/)** | Ultra-fast build tool and development server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Next-generation utility-first styling with `@tailwindcss/vite` |
| **[React Router DOM v7](https://reactrouter.com/)** | Client-side routing and protected navigation flow |
| **[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)** | Native in-browser speech recognition and text-to-speech synthesis |
| **[Axios](https://axios-http.com/)** | HTTP client configured with cookie credentials (`withCredentials: true`) |
| **[React Icons](https://react-icons.github.io/react-icons/)** | Iconography throughout authentication and customization pages |

---

## 📁 Repository Structure

```
Virtual-Assistant/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── axios.js            # Axios instance configured with baseURL and withCredentials
│   ├── assets/                 # Avatars (elli, jarvis, lisa, etc.) and speech waveforms (aiVoice, userVoice)
│   ├── Context/
│   │   └── UserContext.jsx     # Global user authentication & assistant state provider
│   ├── pages/
│   │   ├── AuthPage.jsx        # Registration / Sign Up view
│   │   ├── Signin.jsx          # Login view
│   │   ├── Customize.jsx       # Avatar selection & custom image file upload
│   │   ├── Customize2.jsx      # Assistant naming & voice tone selection
│   │   ├── Card.jsx            # Avatar selection card component
│   │   └── Home.jsx            # Main interactive voice assistant interface
│   ├── App.jsx                 # Route definitions and authentication gatekeeper
│   ├── main.jsx                # Application root mounting & Context wrapper
│   └── index.css               # Tailwind CSS theme and global styling
├── vercel.json                 # Vercel deployment configuration with SPA URL rewrites
├── vite.config.js              # Vite configuration with React and Tailwind plugins
├── package.json
└── .env.example
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the frontend directory:

| Variable | Description | Example Value |
|---|---|---|
| `VITE_API_URL` | Root URL of the running backend API service | `http://localhost:5000` *(Local)* <br> `https://your-backend.onrender.com` *(Production)* |

---

## 🚀 Setup & Installation

### Prerequisites
Make sure you have:
- [Node.js](https://nodejs.org/) (v18.x, v20.x, or v22.x)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
- A running instance of the [Virtual Assistant Backend](https://github.com/AmoCreates/Virtual-Assistant-Backend)

### Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AmoCreates/Virtual-Assistant.git
   cd Virtual-Assistant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and set `VITE_API_URL` to point to your backend:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at:
   ```
   http://localhost:5173
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled assets will be generated in the `dist/` directory.

6. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🎙️ Browser Permissions & Compatibility

For the best voice experience:
- **Recommended Browsers**: **Google Chrome**, **Microsoft Edge**, or any **Chromium-based browser** (these provide full native support for both `SpeechRecognition` and `SpeechSynthesis`).
- **Microphone Access**: When prompted by your browser on first launch, click **Allow** to enable microphone access.
- **Speech Synthesis Voices**: Voice availability depends on operating system speech packs (Windows, macOS, Android, Linux). The app automatically detects available voices and falls back to system English voices if custom gendered voices aren't available.

---

## 🧭 Application Workflow

1. **Sign Up / Sign In**: Register a new user or log in at `/signin`. Credentials and cookies are stored securely.
2. **Onboarding / Customization**:
   - Step 1 (`/customize`): Pick one of the animated AI avatars or upload a photo of your choice.
   - Step 2 (`/customize2`): Give your assistant a unique name (e.g. *Sia*, *Jarvis*) and choose a voice tone (*girl* / *boy*).
3. **Main Assistant Dashboard (`/`)**:
   - Click the microphone icon to activate voice listening.
   - Speak any command or question.
   - Watch the audio waveform pulse as your voice is recognized, translated, and answered by the AI assistant!

---

## 🌐 Deployment (Vercel)

This project includes a ready-to-use [`vercel.json`](file:///C:/Users/Anmol/.gemini/antigravity/scratch/Virtual-Assistant/vercel.json) to handle Single Page Application (SPA) client-side routing rewrites:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploying to Vercel:
1. Import the repository into your [Vercel Dashboard](https://vercel.com/).
2. In **Environment Variables**, add:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://your-backend.onrender.com` without trailing slash).
3. Deploy!

---

## 📄 License

This project is licensed under the ISC License.
