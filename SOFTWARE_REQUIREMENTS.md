# VoxClone AI - Software Requirements & Setup Guide

## Quick Start Checklist

Before you begin development, ensure you have the following installed:

- [ ] Node.js 18.x or later
- [ ] NPM 8.x or later
- [ ] Git 2.20 or later
- [ ] Python 3.10+ (only if developing AI service locally)
- [ ] FFmpeg (only if developing AI service locally)
- [ ] Text Editor/IDE (VS Code recommended)
- [ ] MongoDB Atlas account (or local MongoDB)
- [ ] Cloudinary account
- [ ] Razorpay account
- [ ] Hugging Face account

---

## 1. Node.js & NPM (Required for Frontend & Backend)

### Minimum Requirements
- **Node.js:** 14.x or later
- **Recommended:** 18.20.0 LTS or 20.x LTS
- **NPM:** 8.x or later (bundled with Node.js)

### Installation

**Windows:**
1. Download from https://nodejs.org/
2. Run the installer and follow the wizard
3. Restart your terminal/command prompt

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

### Verify Installation
```bash
node --version     # Should show v18.x or later
npm --version      # Should show 8.x or later
```

---

## 2. Git Version Control

### Minimum Requirements
- **Git:** 2.20 or later

### Installation

**Windows:**
- Download from https://git-scm.com/
- Or use: `choco install git`

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt install git
```

### Verify Installation
```bash
git --version      # Should show version 2.20+
```

---

## 3. Development Tools & IDE

### Recommended: Visual Studio Code
- **Download:** https://code.visualstudio.com/
- **Free and lightweight**
- **Excellent extensions available**

### Recommended VS Code Extensions

Install these extensions for better development experience:
1. **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
2. **Prettier - Code formatter** - esbenp.prettier-vscode
3. **ESLint** - dbaeumer.vscode-eslint
4. **Thunder Client** - rangav.vscode-thunder-client (or REST Client)
5. **MongoDB for VS Code** - mongodb.mongodb-vscode
6. **Postman** - postman.postman-for-vscode
7. **Git Graph** - mhutchie.git-graph

### Alternative IDEs
- WebStorm (JetBrains)
- IntelliJ IDEA Community Edition
- Sublime Text 3+
- Atom

---

## 4. Frontend-Specific Requirements

### Framework & Build Tools
- **React:** 19.2.3
- **TypeScript:** 5.x
- **Vite:** Latest stable
- **Node.js:** 18.x or later

### Installation
```bash
# Navigate to frontend directory
cd client

# Install all dependencies
npm install

# Verify installation
npm list react vite typescript
```

### Required npm Packages (already in package.json)
- react-router-dom
- axios
- lucide-react
- tailwindcss
- typescript

---

## 5. Backend-Specific Requirements

### Framework & Runtime
- **Node.js:** 18.x or later
- **Express.js:** Latest stable
- **MongoDB:** 4.4 or later (via MongoDB Atlas)

### Installation
```bash
# Navigate to backend directory
cd server

# Install all dependencies
npm install

# Verify installation
npm list express mongoose
```

### Required npm Packages (already in package.json)
- express
- mongoose
- jsonwebtoken
- bcryptjs
- multer
- axios
- morgan
- nodemailer
- dotenv
- cors
- cloudinary
- razorpay

### MongoDB Setup

**Option 1: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free tier cluster
4. Get your connection string
5. Add connection string to `.env` file as `MONGODB_URI`

**Option 2: Local MongoDB Installation**
```bash
# macOS
brew install mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community

# Linux
sudo apt-get install -y mongodb

# Verify installation
mongo --version
```

---

## 6. Python & AI Service Requirements (Optional - for AI development)

### Minimum Requirements
- **Python:** 3.8 or later
- **Recommended:** 3.10 or 3.11
- **FFmpeg:** Latest stable

### Python Installation

**Windows:**
1. Download from https://www.python.org/
2. Run installer (check "Add Python to PATH")
3. Restart terminal

**macOS:**
```bash
brew install python3
```

**Linux:**
```bash
sudo apt install python3 python3-pip
```

### Verify Installation
```bash
python --version   # Should show 3.8+
pip --version      # Should show pip 20+
```

### FFmpeg Installation

**Windows:**
```bash
# Using Chocolatey
choco install ffmpeg

# Or download from https://ffmpeg.org/download.html
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

### Python Dependencies Installation
```bash
# From project root
pip install -r requirements.txt
```

### Required Python Packages (from requirements.txt)
- fastapi
- uvicorn
- torch
- torchaudio
- transformers
- coqui-tts
- ffmpeg-python
- pydantic
- requests

---

## 7. Third-Party Service Accounts

### 1. Cloudinary (Cloud Storage)
- **Purpose:** Store and deliver voice/audio files
- **Sign up:** https://cloudinary.com/
- **Free tier:** 25GB/month
- **Required credentials:**
  - Cloud Name
  - API Key
  - API Secret

### 2. Razorpay (Payment Gateway)
- **Purpose:** Process subscription payments
- **Sign up:** https://razorpay.com/
- **Required credentials:**
  - Key ID
  - Key Secret
  - (Test mode for development)

### 3. Gmail/SMTP (Email Service)
- **Purpose:** Send email verifications and notifications
- **Recommended:** Use Gmail with App Password
- **Setup:**
  1. Enable 2-Factor Authentication on Gmail
  2. Generate App Password
  3. Use email and app password in `.env`

### 4. MongoDB Atlas (Database)
- **Purpose:** Cloud NoSQL database
- **Sign up:** https://www.mongodb.com/cloud/atlas
- **Free tier:** 512MB storage
- **Required:** Connection string

### 5. Hugging Face (AI Model Hosting)
- **Purpose:** Host and run AI inference service
- **Sign up:** https://huggingface.co/
- **Recommended:** Use Hugging Face Spaces for FastAPI
- **Model:** Coqui XTTS v2

---

## 8. Deployment Platforms

### Frontend: Vercel
- **Deployment URL:** https://vox-clone-ai.vercel.app/
- **Account:** https://vercel.com/
- **Features:**
  - Auto-deploy from GitHub
  - CDN included
  - Serverless functions
- **Setup:**
  1. Connect GitHub repository
  2. Set environment variables
  3. Deploy from main branch

### Backend: Render.com
- **Account:** https://render.com/
- **Features:**
  - Node.js support
  - Environment variables
  - Auto-deploy from GitHub
  - MongoDB Atlas integration
- **Setup:**
  1. Connect GitHub repository
  2. Configure environment variables
  3. Deploy Node.js service

### AI Service: Hugging Face Spaces
- **URL:** Depends on your Hugging Face Space
- **Account:** https://huggingface.co/
- **Setup:**
  1. Create new Space
  2. Select FastAPI Docker
  3. Upload your repository
  4. Get API endpoint URL

---

## 9. Environment Variables Setup

### Backend (.env in `server/` directory)
```env
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/voxclone

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email (Gmail)
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password

# AI Service
AI_SERVICE_URL=https://your-huggingface-space-url/

# Server
NODE_ENV=development
PORT=5000
```

### Frontend (.env in `client/` directory)
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=VoxClone AI
```

### AI Service (.env if running locally)
```env
HF_TOKEN=your_huggingface_token
```

---

## 10. Browser Requirements

### Minimum Supported Versions
- **Chrome:** 80+
- **Firefox:** 75+
- **Safari:** 13+
- **Edge:** 80+
- **Mobile:** iOS Safari 12+, Chrome Android 80+

### Required Browser Features
- JavaScript (ES6+)
- LocalStorage API
- Fetch API / XMLHttpRequest
- Audio/Media APIs
- WebAudio API

---

## 11. System Resource Requirements

### Minimum System Specs
- **RAM:** 8GB (minimum), 16GB recommended
- **Disk Space:** 10GB free
- **Processor:** Dual-core 2.0 GHz minimum
- **Network:** Stable internet connection

### For AI Service Development (Local)
- **RAM:** 16GB (GPU VRAM for faster inference)
- **GPU:** NVIDIA GPU recommended (CUDA support)
- **Disk Space:** 20GB+ (for models)

---

## 12. Installation Quick Reference

### Complete Setup (First Time)

```bash
# 1. Clone repository
git clone https://github.com/yourusername/VoxCloneAI.git
cd VoxCloneAI

# 2. Setup Frontend
cd client
npm install
cd ..

# 3. Setup Backend
cd server
npm install
cd ..

# 4. Setup Environment Variables
# Create .env files as shown above

# 5. Start Development Servers

# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev

# Terminal 3 (Optional) - AI Service
python app.py
```

### Verification Script
```bash
# Run this to verify all requirements are met
node --version
npm --version
git --version
python --version
ffmpeg -version
```

---

## 13. Troubleshooting Common Issues

### Issue: "npm command not found"
**Solution:** Node.js/npm not in PATH
- Reinstall Node.js
- Restart terminal/command prompt
- Check PATH environment variable

### Issue: "Port 5000 already in use"
**Solution:** Change port in `server/server.js` or kill process using port 5000
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: "MongoDB connection failed"
**Solution:** Check MongoDB Atlas
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure `.env` file exists

### Issue: "Cloudinary upload fails"
**Solution:** Verify Cloudinary credentials
- Check `CLOUDINARY_CLOUD_NAME`
- Verify `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`
- Check account is active

### Issue: "Email verification not sending"
**Solution:** Check Gmail setup
- Enable 2-Factor Authentication
- Generate App-specific password
- Use correct `SMTP_EMAIL` and password in `.env`

---

## 14. Additional Resources

- **Node.js Documentation:** https://nodejs.org/docs/
- **React Documentation:** https://react.dev/
- **Express.js Documentation:** https://expressjs.com/
- **MongoDB Documentation:** https://docs.mongodb.com/
- **FastAPI Documentation:** https://fastapi.tiangolo.com/
- **Vercel Documentation:** https://vercel.com/docs
- **Render Documentation:** https://render.com/docs
- **Hugging Face Documentation:** https://huggingface.co/docs

---

## Support & Help

If you encounter issues:
1. Check this document first
2. Review the main README.md
3. Check PROJECT_LOGBOOK.md for detailed information
4. Look for similar issues on GitHub
5. Create an issue with:
   - Error message
   - Steps to reproduce
   - System information (OS, Node version, etc.)

---

**Last Updated:** April 2026  
**VoxClone AI Version:** 1.0.0
