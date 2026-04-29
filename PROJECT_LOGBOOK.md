# VoxClone AI - Complete Project Logbook & Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Software Requirements](#software-requirements)
4. [Technologies & Dependencies](#technologies--dependencies)
5. [Project Structure](#project-structure)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Frontend Features & Pages](#frontend-features--pages)
9. [Backend Features & Controllers](#backend-features--controllers)
10. [Authentication & Security](#authentication--security)
11. [Configuration & Environment Variables](#configuration--environment-variables)
12. [Deployment](#deployment)
13. [User Workflows & Behavior](#user-workflows--behavior)
14. [Setup & Installation Guide](#setup--installation-guide)
15. [Development Notes](#development-notes)

---

## Project Overview

### What is VoxClone AI?

**VoxClone AI** is a **production-ready, open-source SaaS platform** for voice cloning using artificial intelligence. It enables users to:
- Create personalized voice profiles from audio samples
- Generate realistic speech from text using AI models
- Manage voice generations with history and downloads
- Subscribe to different pricing tiers (Free, Pro, Enterprise)
- Store and organize cloned voices securely in the cloud

### Key Features
✅ **AI Voice Cloning** - Uses Coqui XTTS v2 model for high-quality voice synthesis  
✅ **User Authentication** - JWT-based secure authentication with email verification  
✅ **Subscription Plans** - Tiered pricing (Free, Pro, Enterprise) with usage limits  
✅ **Cloud Storage** - Cloudinary integration for secure audio file storage  
✅ **Microservice Architecture** - Separate frontend, backend, and AI inference services  
✅ **Admin Dashboard** - Administrative tools for user management and monitoring  
✅ **Payment Integration** - Razorpay integration for subscription payments  
✅ **Email Notifications** - Automated email verification and account notifications  

### Live Demo
🌐 **Production URL:** https://vox-clone-ai.vercel.app/

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  VOXCLONE AI SYSTEM ARCHITECTURE              │
└─────────────────────────────────────────────────────────────┘

                         ┌─────────────┐
                         │  End Users  │
                         └──────┬──────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
              ┌─────▼─────┐          ┌─────▼──────┐
              │  Frontend  │          │  Dashboard │
              │ (React +   │          │  (Admin)   │
              │   Vite)    │          └─────┬──────┘
              └─────┬──────┘                │
                    │                       │
                    │    REST API (JWT)     │
                    │    HTTP/HTTPS         │
                    │                       │
            ┌───────┴───────────────────────┘
            │
      ┌─────▼──────────────────────────┐
      │   BACKEND (Node.js + Express)   │
      │                                 │
      │  ┌───────────────────────────┐ │
      │  │  Authentication Routes    │ │
      │  │  - Signup/Login           │ │
      │  │  - Email Verification     │ │
      │  │  - Password Reset         │ │
      │  └───────────────────────────┘ │
      │                                 │
      │  ┌───────────────────────────┐ │
      │  │  Voice Clone Routes       │ │
      │  │  - Create Voice Profile   │ │
      │  │  - Generate Speech        │ │
      │  │  - Delete Voice           │ │
      │  └───────────────────────────┘ │
      │                                 │
      │  ┌───────────────────────────┐ │
      │  │  User Management Routes   │ │
      │  │  - Profile Updates        │ │
      │  │  - Usage Tracking         │ │
      │  │  - Subscription Plans     │ │
      │  └───────────────────────────┘ │
      │                                 │
      │  ┌───────────────────────────┐ │
      │  │  Payment Routes           │ │
      │  │  - Create Orders          │ │
      │  │  - Verify Payments        │ │
      │  └───────────────────────────┘ │
      │                                 │
      │  ┌───────────────────────────┐ │
      │  │  Admin Routes             │ │
      │  │  - User Management        │ │
      │  │  - Analytics              │ │
      │  └───────────────────────────┘ │
      └──────┬──────────────────────────┘
             │
    ┌────────┼────────┬──────────┐
    │        │        │          │
    │   ┌────▼──┐ ┌──▼────┐ ┌───▼──────┐
    │   │MongoDB│ │Cloudinary│ │Razorpay  │
    │   │Database│ │Storage │ │Payments  │
    │   └────────┘ └────────┘ └──────────┘
    │
┌───▼────────────────────────────────────┐
│  AI INFERENCE SERVICE (FastAPI + XTTS)  │
│  - Voice Cloning Processing             │
│  - Text-to-Speech Conversion            │
│  - Audio Output Generation              │
└─────────────────────────────────────────┘

┌──────────────────────────┐
│  External Services       │
│  - Email (Gmail SMTP)    │
│  - Hugging Face Spaces   │
│  - Vercel (Frontend CDN) │
│  - Render (Backend)      │
└──────────────────────────┘
```

### Data Flow: Voice Cloning Process

```
1. User uploads voice sample (WAV file)
   ↓
2. Frontend sends to Backend (/api/person)
   ↓
3. Backend uploads to Cloudinary → receives URL
   ↓
4. URL stored in Person collection (MongoDB)
   ↓
5. User generates speech with text
   ↓
6. Backend fetches voice URL from MongoDB
   ↓
7. Backend downloads voice from Cloudinary
   ↓
8. Backend sends to AI Service (/clone endpoint)
   ↓
9. AI Service processes (XTTS model)
   ↓
10. Generated audio returned to Backend
   ↓
11. Backend uploads to Cloudinary
   ↓
12. URL saved in Generation collection (MongoDB)
   ↓
13. Frontend receives and plays audio
```

---

## Software Requirements

### Minimum System Requirements

**Operating System:**
- Windows 10 or later / macOS 10.15 or later / Ubuntu 18.04 or later
- RAM: Minimum 8GB (16GB recommended for AI model development)
- Disk Space: Minimum 5GB for node_modules and dependencies

---

### 1. Node.js & NPM

**Node.js:**
- Minimum Version: 14.x
- Recommended Version: 18.x or later (18.20.0+ or 20.x LTS)
- Download: https://nodejs.org/

**Package Manager:**
- NPM: Comes bundled with Node.js (Recommended: 8.x or later)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

**Installation:**
- Windows: Download installer from nodejs.org and run
- macOS: `brew install node` (requires Homebrew)
- Linux (Ubuntu): `sudo apt-get install nodejs npm`

---

### 2. Frontend Requirements (React + Vite)

**Dependencies Included in `client/package.json`:**
- React 19.2.3
- React Router DOM 7.11.0
- TypeScript 5.x
- Vite (Latest)
- TailwindCSS
- Axios
- Lucide React

**Installation:**
```bash
cd client
npm install
```

---

### 3. Backend Requirements (Node.js + Express)

**Dependencies Included in `server/package.json`:**
- Express.js (Latest stable)
- MongoDB driver / Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Multer (file uploads)
- Axios
- Morgan (logging)
- Nodemailer (email service)
- Dotenv (environment variables)
- CORS
- Cloudinary SDK
- Razorpay SDK

**Installation:**
```bash
cd server
npm install
```

---

### 4. Python Requirements (AI/ML Service)

**Python Version:**
- Minimum Version: 3.8
- Recommended Version: 3.10 or 3.11

**Dependencies in `requirements.txt`:**
- FastAPI
- Uvicorn (ASGI server)
- PyTorch
- TorchAudio
- Transformers
- Coqui XTTS v2
- FFmpeg
- Python-multipart
- Pydantic
- Requests

**Installation:**
```bash
pip install -r requirements.txt
```

**FFmpeg (Required for audio processing):**
- Windows: Download from https://ffmpeg.org/ or `choco install ffmpeg`
- macOS: `brew install ffmpeg`
- Linux (Ubuntu): `sudo apt-get install ffmpeg`

---

### 5. Version Control

**Git:**
- Minimum Version: 2.20
- Recommended Version: Latest stable
- Download: https://git-scm.com/
- Verify: `git --version`

---

### 6. Development Tools & IDE

**Text Editor/IDE (Recommended):**
- **Visual Studio Code (Recommended)**
  - Download: https://code.visualstudio.com/
  - Recommended Extensions:
    - ES7+ React/Redux/React-Native snippets
    - TypeScript Vue Plugin (Volar)
    - Prettier - Code formatter
    - ESLint
    - Thunder Client or REST Client (for API testing)
    - MongoDB for VS Code

**Alternative IDEs:**
- WebStorm
- IntelliJ IDEA
- Sublim Text 3+

---

### 7. Database Setup (Local Development)

**MongoDB:**
- Option 1: MongoDB Atlas (Cloud - Recommended)
  - Create account at https://www.mongodb.com/cloud/atlas
  - Create free tier cluster
  - No local installation needed
  
- Option 2: MongoDB Community (Local)
  - Download: https://www.mongodb.com/try/download/community
  - Minimum Version: 4.4
  - Recommended Version: 6.0 or later
  - Installation: Follow official guides for your OS
  - Verify: `mongod --version`

---

### 8. Third-Party Service Accounts

**Required Service Accounts:**

1. **Cloudinary (Cloud Storage)**
   - Free tier available at https://cloudinary.com/
   - Required for: Audio file upload and storage
   - Sign up and get: Cloud Name, API Key, API Secret

2. **Razorpay (Payment Processing)**
   - Account required at https://razorpay.com/
   - Required for: Subscription payments
   - Get: Key ID and Key Secret

3. **Gmail/SMTP (Email Service)**
   - Gmail account or SMTP service
   - Required for: Email verification and notifications
   - Get: Email and App Password (for Gmail)

4. **Hugging Face (AI Model Hosting)**
   - Account at https://huggingface.co/
   - Hosting for: AI inference service with XTTS v2 model
   - Recommended: Use Hugging Face Spaces for easy deployment

---

### 9. Deployment Platforms

**Frontend Deployment:**
- **Vercel (Recommended)**
  - Account: https://vercel.com/
  - Connected to GitHub for auto-deployment
  - Supports Next.js/React/Vite out of the box

**Backend Deployment:**
- **Render.com (Recommended)**
  - Account: https://render.com/
  - Supports Node.js applications
  - Free tier available
  - MongoDB Atlas integration available

**AI Service Deployment:**
- **Hugging Face Spaces (Recommended)**
  - Account: https://huggingface.co/
  - Creates public API endpoint
  - Supports FastAPI applications
  - Free tier available

---

### 10. Browser Requirements

**For Development:**
- Chrome 90+ / Firefox 88+ / Safari 14+ / Edge 90+

**For Production (User Access):**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers: iOS Safari 12+, Chrome Android 80+

**Browser Features Required:**
- JavaScript enabled
- LocalStorage support
- XMLHttpRequest/Fetch API
- WebAudio API (for voice playback)

---

### 11. Environment Variables Configuration

**Create `.env` files for each service:**

**Backend (.env in `server/src/`):**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
SMTP_EMAIL=your_gmail@gmail.com
SMTP_PASSWORD=your_app_password
AI_SERVICE_URL=your_huggingface_spaces_url
```

**Frontend (.env in `client/`):**
```
VITE_API_URL=http://localhost:5000 (or production backend URL)
VITE_APP_NAME=VoxClone AI
```

---

### 12. Optional Development Tools

- **Postman** or **Insomnia** - API testing (https://www.postman.com/)
- **Docker** - Containerization (https://www.docker.com/) - Recommended for deployment
- **Docker Compose** - Multi-container orchestration
- **Table Plus** or **MongoDB Compass** - Database GUI clients
- **Vercel CLI** - Local development with Vercel environment
- **Render CLI** - Local development with Render environment

---

### Quick Verification Checklist

Before starting development, verify all requirements:

```bash
# Check Node.js and npm
node --version    # Should be 14.x or later
npm --version     # Should be 8.x or later

# Check Git
git --version     # Should show version 2.20+

# Check Python (if developing AI service locally)
python --version  # Should be 3.8+

# Check FFmpeg (if developing AI service locally)
ffmpeg -version   # Should show FFmpeg version
```

---

## Technologies & Dependencies

### Frontend Stack
**Framework:** React 19.2.3 with TypeScript  
**Build Tool:** Vite  
**Routing:** React Router DOM v7.11.0  
**HTTP Client:** Axios v1.13.2  
**UI Icons:** Lucide React v0.562.0  
**Styling:** TailwindCSS  
**Deployment:** Vercel

### Backend Stack
**Runtime:** Node.js  
**Framework:** Express.js  
**Database:** MongoDB Atlas (Cloud)  
**Authentication:** JWT (jsonwebtoken)  
**Password Hashing:** bcryptjs  
**File Upload:** Multer  
**HTTP Client:** Axios  
**Logging:** Morgan  
**Email Service:** Nodemailer  
**Cloud Storage:** Cloudinary API  
**Payment Gateway:** Razorpay API  
**Deployment:** Render.com

### AI/ML Stack
**Framework:** FastAPI (Python)  
**TTS Model:** Coqui XTTS v2 (Multilingual)  
**Deep Learning:** PyTorch + TorchAudio  
**Audio Processing:** FFmpeg  
**Model Inference:** CPU-based  
**Deployment:** Hugging Face Spaces

### External Integrations
- **Cloudinary:** Cloud-based media storage and delivery
- **Razorpay:** Payment processing for subscriptions
- **Hugging Face:** ML model hosting and inference
- **Gmail SMTP:** Email notifications
- **MongoDB Atlas:** NoSQL database hosting
- **Vercel:** Frontend hosting and CDN
- **Render.com:** Backend API hosting

---

## Project Structure

```
VoxCloneAI/
│
├── 📄 app.py                          # FastAPI AI inference service
├── 📄 Dockerfile                      # Docker configuration for AI service
├── 📄 requirements.txt                # Python dependencies
├── 📄 README.md                       # Main project README
├── 📄 LICENSE                         # Project license
│
├── 📁 client/                         # FRONTEND (React + TypeScript)
│   ├── 📄 App.tsx                    # Main app component with routing
│   ├── 📄 index.html                 # HTML entry point
│   ├── 📄 index.tsx                  # React DOM render
│   ├── 📄 package.json               # NPM dependencies
│   ├── 📄 tsconfig.json              # TypeScript configuration
│   ├── 📄 vite.config.ts             # Vite bundler configuration
│   ├── 📄 vite-env.d.ts              # Vite environment types
│   ├── 📄 types.ts                   # TypeScript interfaces
│   ├── 📄 metadata.json              # App metadata
│   │
│   ├── 📁 components/
│   │   ├── 📄 Header.tsx             # Navigation header
│   │   └── 📄 Sidebar.tsx            # Navigation sidebar
│   │
│   ├── 📁 pages/                     # Page components
│   │   ├── 📄 LandingPage.tsx        # Home/marketing page
│   │   ├── 📄 LoginPage.tsx          # User login
│   │   ├── 📄 SignupPage.tsx         # User registration
│   │   ├── 📄 VerifyEmailPage.tsx    # Email verification
│   │   ├── 📄 ForgotPasswordPage.tsx # Password recovery
│   │   ├── 📄 ResetPasswordPage.tsx  # Password reset
│   │   ├── 📄 EmailVerifiedPage.tsx  # Confirmation page
│   │   ├── 📄 DashboardPage.tsx      # Main dashboard
│   │   ├── 📄 ProfilePage.tsx        # User profile settings
│   │   ├── 📄 VoicesPage.tsx         # Voice profile management
│   │   ├── 📄 GeneratePage.tsx       # Speech generation
│   │   ├── 📄 PricingPage.tsx        # Pricing information
│   │   ├── 📄 EnterprisePage.tsx     # Enterprise options
│   │   ├── 📄 AdminRoute.tsx         # Admin route protection
│   │   └── 📁 admin/
│   │       ├── 📄 AdminDashboard.tsx # Admin overview
│   │       └── 📄 AdminUsers.tsx     # User management
│   │
│   └── 📁 services/                  # API service functions
│       ├── 📄 api.ts                 # Axios instance & interceptors
│       ├── 📄 auth.ts                # Authentication API calls
│       ├── 📄 user.ts                # User profile API calls
│       ├── 📄 person.ts              # Voice profile API calls
│       ├── 📄 clone.ts               # Voice cloning API calls
│       ├── 📄 generation.ts          # Generation history API calls
│       └── 📄 mockData.ts            # Mock data for development
│
└── 📁 server/                         # BACKEND (Node.js + Express)
    ├── 📄 server.js                  # Server entry point
    ├── 📄 package.json               # NPM dependencies
    ├── 📄 Dockerfile                 # Docker configuration
    │
    └── 📁 src/
        ├── 📄 app.js                 # Express app configuration
        │
        ├── 📁 config/                # Configuration files
        │   ├── 📄 env.js             # Environment variable setup
        │   ├── 📄 db.js              # MongoDB connection
        │   ├── 📄 cloudinary.js      # Cloudinary API setup
        │   ├── 📄 multer.js          # File upload configuration
        │   └── 📄 razorpay.js        # Payment gateway setup
        │
        ├── 📁 models/                # MongoDB schemas
        │   ├── 📄 User.js            # User schema
        │   ├── 📄 Person.js          # Voice profile schema
        │   ├── 📄 Generation.js      # Generation history schema
        │   └── 📄 Payment.js         # Payment records schema
        │
        ├── 📁 controllers/           # Business logic
        │   ├── 📄 auth.controller.js       # Auth logic
        │   ├── 📄 person.controller.js     # Voice management logic
        │   ├── 📄 clone.controller.js      # Voice cloning logic
        │   ├── 📄 generation.controller.js # History management logic
        │   ├── 📄 payment.controller.js    # Payment processing logic
        │   └── 📄 admin.controller.js      # Admin operations logic
        │
        ├── 📁 routes/                # API endpoint definitions
        │   ├── 📄 auth.routes.js          # Authentication endpoints
        │   ├── 📄 person.routes.js        # Voice management endpoints
        │   ├── 📄 clone.routes.js         # Voice cloning endpoints
        │   ├── 📄 generation.routes.js    # History endpoints
        │   ├── 📄 payment.routes.js       # Payment endpoints
        │   └── 📄 admin.routes.js         # Admin endpoints
        │
        ├── 📁 middleware/            # Express middleware
        │   ├── 📄 auth.middleware.js      # JWT verification
        │   ├── 📄 admin.middleware.js     # Admin verification
        │   └── 📄 uploadVoice.js          # File upload handling
        │
        └── 📁 utils/                 # Utility functions
            ├── 📄 sendEmail.js            # Email sending utility
            ├── 📄 sendVerificationEmail.js # Verification email
            └── 📄 callAI.js               # AI service communication
```

---

## Database Schema

### MongoDB Collections

#### 1. **User Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  
  // Email Verification
  emailVerified: Boolean (default: false),
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Password Reset
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  // Authorization
  role: String (enum: ["USER", "ADMIN"], default: "USER"),
  
  // Subscription
  plan: String (enum: ["FREE", "PRO", "ENTERPRISE"], default: "FREE"),
  
  // Usage Tracking
  usage: {
    secondsGenerated: Number (default: 0),
    limit: Number (default: 300 for FREE plan),
    clonesCount: Number (default: 0)
  },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Usage Limits by Plan:**
- **FREE:** 300 seconds/month, 1 voice model
- **PRO:** 18,000 seconds/month, unlimited voice models
- **ENTERPRISE:** Unlimited

---

#### 2. **Person Collection** (Voice Profiles)
```javascript
{
  _id: ObjectId,
  name: String,
  voicePath: String (Cloudinary URL),
  userId: ObjectId (ref to User),
  createdAt: Date,
  updatedAt: Date
}
```

**voicePath Format:** `https://res.cloudinary.com/dclcbyzmc/video/upload/...`

---

#### 3. **Generation Collection** (Speech History)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref to User),
  voiceId: ObjectId (ref to Person),
  voiceName: String,
  text: String,
  audioUrl: String (Cloudinary URL),
  duration: Number (in seconds),
  createdAt: Date,
  updatedAt: Date
}
```

---

#### 4. **Payment Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref to User),
  razorpayOrderId: String,
  razorpayPaymentId: String,
  amount: Number,
  plan: String,
  status: String (enum: ["pending", "completed", "failed"]),
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Documentation

### Base URL
**Production:** `https://vox-clone-api.render.com`  
**Local Development:** `http://localhost:5000`

### Response Format
All API responses follow this structure:
```json
{
  "message": "Success message",
  "data": { /* Response data */ },
  "status": 200
}
```

---

### Authentication Routes (`/api/auth`)

#### 1. **Signup** (Public)
```
POST /api/auth/signup
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "message": "Verification email sent",
  "status": 201
}

Flow:
1. Check if email already exists
2. Hash password with bcrypt (10 rounds)
3. Generate email verification token (32 bytes)
4. Token valid for 24 hours
5. Send verification email with link
6. User must click link to activate account
```

---

#### 2. **Verify Email** (Public)
```
GET /api/auth/verify-email?token=<verification_token>

Response:
{
  "message": "Email verified successfully",
  "status": 200
}

Logic:
1. Find user with matching token
2. Check token expiration
3. Mark email as verified
4. Clear verification token
5. Redirect to login page
```

---

#### 3. **Login** (Public)
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "FREE",
    "usage": {
      "secondsGenerated": 150,
      "limit": 300,
      "clonesCount": 5
    }
  },
  "status": 200
}

JWT Structure:
- Header: { "alg": "HS256", "typ": "JWT" }
- Payload: { "userId": "...", "iat": ..., "exp": ... }
- Signature: HMAC-SHA256
- JWT_SECRET: 5f99ce13c9b701fed75d0bab3574b3a8
```

---

#### 4. **Get Current User** (Protected)
```
GET /api/auth/me
Authorization: Bearer <jwt_token>

Response:
{
  "message": "User retrieved",
  "user": { /* User object */ },
  "status": 200
}
```

---

#### 5. **Forgot Password** (Public)
```
POST /api/auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "john@example.com"
}

Response:
{
  "message": "Reset email sent",
  "status": 200
}

Flow:
1. Find user by email
2. Generate reset token
3. Set token expiration (30 minutes)
4. Send reset email with link
5. User clicks link to reset password
```

---

#### 6. **Reset Password** (Public)
```
POST /api/auth/reset-password
Content-Type: application/json

Request Body:
{
  "token": "reset_token_from_email",
  "newPassword": "NewPassword123"
}

Response:
{
  "message": "Password reset successful",
  "status": 200
}
```

---

### Voice Management Routes (`/api/person`)

#### 1. **Upload Voice Profile** (Protected)
```
POST /api/person
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

Request:
- File: voice_sample.wav (WAV format)
- Field: name = "My Voice"

Response:
{
  "message": "Voice profile created",
  "data": {
    "id": "person_123",
    "name": "My Voice",
    "voicePath": "https://res.cloudinary.com/.../voice.wav",
    "userId": "user_123",
    "createdAt": "2024-01-28T10:30:00Z"
  },
  "status": 201
}

Process:
1. Validate file (must be WAV)
2. Save file temporarily
3. Upload to Cloudinary
4. Get permanent URL
5. Save to MongoDB Person collection
6. Delete temporary file
7. Return URL to frontend
```

---

#### 2. **Get All Voices** (Protected)
```
GET /api/person
Authorization: Bearer <jwt_token>

Response:
{
  "message": "Voices retrieved",
  "data": [
    {
      "id": "person_123",
      "name": "My Voice",
      "voicePath": "https://res.cloudinary.com/.../voice.wav",
      "userId": "user_123"
    }
  ],
  "status": 200
}
```

---

#### 3. **Delete Voice Profile** (Protected)
```
DELETE /api/person/:voiceId
Authorization: Bearer <jwt_token>

Response:
{
  "message": "Voice profile deleted",
  "status": 200
}

Logic:
1. Verify voice belongs to user
2. Delete from Cloudinary (optional)
3. Remove from MongoDB
4. Delete associated generations
```

---

### Voice Cloning Routes (`/api/clone`)

#### 1. **Generate Speech** (Protected)
```
POST /api/clone
Authorization: Bearer <jwt_token>
Content-Type: application/json

Request Body:
{
  "text": "Hello, this is a cloned voice speaking.",
  "personId": "person_123"
}

Response:
{
  "message": "Voice cloned successfully",
  "data": {
    "id": "gen_456",
    "voiceId": "person_123",
    "voiceName": "My Voice",
    "text": "Hello, this is a cloned voice speaking.",
    "audioUrl": "https://res.cloudinary.com/.../audio.wav",
    "duration": 4,
    "createdAt": "2024-01-28T10:35:00Z"
  },
  "status": 200
}

Complete Flow:
1. Validate text & personId
2. Fetch voice profile from MongoDB
3. Download voice from Cloudinary to /tmp
4. Prepare FormData with text + voice file
5. Call AI service: POST https://danishhshk-voxcloneai.hf.space/clone
6. Receive generated audio from AI
7. Upload audio to Cloudinary
8. Save generation record to MongoDB
9. Update user usage stats
10. Delete temporary files
11. Return audio URL to frontend
12. Frontend plays audio via <audio> tag

Error Handling:
- Missing text or personId: 400
- Voice profile not found: 404
- AI service error: 503
- User limit exceeded: 429
```

---

### Generation History Routes (`/api/generation`)

#### 1. **Get Recent Generations** (Protected)
```
GET /api/generation
Authorization: Bearer <jwt_token>

Response:
{
  "message": "Generations retrieved",
  "data": [
    {
      "id": "gen_456",
      "voiceName": "My Voice",
      "text": "Hello...",
      "audioUrl": "https://...",
      "duration": 4,
      "createdAt": "2024-01-28T10:35:00Z"
    }
  ],
  "status": 200
}

Behavior:
- Returns last 10 generations
- Sorted by createdAt descending
- User sees only own generations
```

---

### Payment Routes (`/api/payment`)

#### 1. **Create Payment Order** (Protected)
```
POST /api/payment/create-order
Authorization: Bearer <jwt_token>
Content-Type: application/json

Request Body:
{
  "plan": "PRO"  // or "ENTERPRISE"
}

Response:
{
  "message": "Order created",
  "data": {
    "razorpayOrderId": "order_JBqfVlkKbqrLnP",
    "amount": 4900,  // In paise (₹49)
    "currency": "INR",
    "key": "rzp_test_RvOHCsJU3ogbmK"
  },
  "status": 201
}
```

---

#### 2. **Verify Payment** (Protected)
```
POST /api/payment/verify
Authorization: Bearer <jwt_token>
Content-Type: application/json

Request Body:
{
  "razorpayOrderId": "order_JBqfVlkKbqrLnP",
  "razorpayPaymentId": "pay_JBqf...",
  "razorpaySignature": "signature..."
}

Response:
{
  "message": "Payment verified successfully",
  "data": {
    "plan": "PRO",
    "expiresAt": "2025-02-28T00:00:00Z"
  },
  "status": 200
}

Verification:
1. Verify signature with Razorpay secret
2. Update user plan in MongoDB
3. Save payment record
4. Send confirmation email
```

---

### Admin Routes (`/api/admin`)

#### 1. **Get All Users** (Admin Only)
```
GET /api/admin/users
Authorization: Bearer <admin_jwt_token>

Response:
{
  "message": "Users retrieved",
  "data": [
    {
      "id": "user_123",
      "name": "John",
      "email": "john@example.com",
      "plan": "PRO",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "status": 200
}
```

---

#### 2. **Get User Analytics** (Admin Only)
```
GET /api/admin/analytics
Authorization: Bearer <admin_jwt_token>

Response:
{
  "message": "Analytics retrieved",
  "data": {
    "totalUsers": 150,
    "activeUsers": 45,
    "totalGenerations": 500,
    "byPlan": {
      "FREE": 100,
      "PRO": 45,
      "ENTERPRISE": 5
    }
  },
  "status": 200
}
```

---

## Frontend Features & Pages

### 1. **Landing Page** (`/`)
**Purpose:** Marketing and user acquisition  
**Access:** Public (not authenticated)

**Components:**
- Hero section with CTA buttons
- Feature showcase with icons
- Pricing table with 3 tiers
- Footer with links

**User Actions:**
- View features
- See pricing comparison
- Click "Get Started" → redirects to signup
- Click "Login" → redirects to login

---

### 2. **Signup Page** (`/signup`)
**Purpose:** New user registration

**Form Fields:**
- Name (text input)
- Email (email input with validation)
- Password (password input, min 8 chars)

**Flow:**
1. User fills form
2. Submits POST request to `/api/auth/signup`
3. Backend sends verification email
4. User sees success message
5. User navigates to verify email page

**Validation:**
- Email format validation (frontend + backend)
- Password strength (backend)
- Email uniqueness (backend)

---

### 3. **Login Page** (`/login`)
**Purpose:** User authentication

**Form Fields:**
- Email (email input)
- Password (password input)
- "Forgot Password?" link
- "Sign up" link

**Flow:**
1. User enters credentials
2. POST to `/api/auth/login`
3. Backend returns JWT token + user data
4. Frontend stores token in localStorage
5. Redirects to dashboard
6. API interceptor adds token to all future requests

**Token Storage:**
- Stored in `localStorage.token`
- Sent in Authorization header: `Bearer <token>`

---

### 4. **Verify Email Page** (`/verify-email`)
**Purpose:** Email address verification

**Query Parameters:**
- `token` - verification token from email link

**Flow:**
1. Page loads with token from URL
2. Auto-submits verification request
3. Backend validates token
4. Shows success/error message
5. Redirects to login after 3 seconds

---

### 5. **Forgot Password Page** (`/forgot-password`)
**Purpose:** Password recovery initiation

**Form Fields:**
- Email (email input)

**Flow:**
1. User enters email
2. POST to `/api/auth/forgot-password`
3. Backend sends reset link to email
4. User sees "Check your email" message
5. User clicks link in email
6. Redirects to reset password page

---

### 6. **Reset Password Page** (`/reset-password`)
**Purpose:** Completing password reset

**Query Parameters:**
- `token` - reset token from email

**Form Fields:**
- New Password
- Confirm Password

**Flow:**
1. User enters new password
2. POST to `/api/auth/reset-password` with token
3. Backend validates token (30-min expiry)
4. Updates password in MongoDB
5. Redirects to login
6. User can login with new password

---

### 7. **Dashboard Page** (`/dashboard`)
**Purpose:** Main user hub after authentication

**Requires:** Valid JWT token

**Sections:**
- **User Welcome:** "Hello, [Name]!"
- **Usage Stats:**
  - Seconds generated this month
  - Remaining limit
  - Voice profiles count
- **Plan Information:**
  - Current plan (FREE/PRO/ENTERPRISE)
  - Upgrade button
  - Features available
- **Quick Actions:**
  - Create new voice
  - Generate speech
  - View history
- **Recent Generations:** Last 5 audios

---

### 8. **Voices Page** (`/voices`)
**Purpose:** Voice profile management

**Features:**
- **List all voice profiles** (CRUD operations)
- **Upload new voice:**
  - File input for WAV files
  - Name input
  - Upload button
  - Progress indicator
- **View voices:**
  - Voice name
  - Preview audio player
  - Created date
  - Delete button
- **Delete voice:**
  - Confirmation dialog
  - Removes from database
  - Clears associated generations

**Validation:**
- File must be WAV format
- File size limit (cloudinary)
- Audio duration (for quality)

---

### 9. **Generate Page** (`/generate`)
**Purpose:** Create cloned speech

**Left Column (Input):**
- **Voice Selector:** Dropdown of user's voices
- **Text Input:** Large textarea for speech text
- **Character Count:** Shows current/max characters
- **Generate Button:** Triggers cloning process
- **Loading Indicator:** Shows during processing

**Right Column (Output):**
- **Audio Player:** Plays generated audio
- **Download Button:** Saves audio as WAV/MP3
- **Share Button:** Copy shareable link
- **Delete Button:** Removes from history
- **Generation History:** List of last 20 generations

**Generation Process:**
1. User selects voice from dropdown
2. Types text (max 200-500 chars depending on plan)
3. Clicks "Generate"
4. Frontend disables input, shows loader
5. POST to `/api/clone` with text + voiceId
6. Backend processes (15-60 seconds)
7. Returns audio URL
8. Frontend plays audio
9. Adds to history
10. Updates usage stats

---

### 10. **Profile Page** (`/profile`)
**Purpose:** User account settings

**Sections:**
- **Account Information:**
  - Name (editable)
  - Email (read-only)
  - Joined date
  - Save changes button
- **Security:**
  - Change password button
  - Login history (if implemented)
  - Active sessions (if implemented)
- **Subscription:**
  - Current plan
  - Renewal date
  - Upgrade/downgrade options
- **Usage:**
  - Monthly generation limit
  - Seconds used
  - Progress bar
- **Delete Account:**
  - Warning message
  - Confirmation button
  - Irreversible action

---

### 11. **Pricing Page** (`/pricing`)
**Purpose:** Plan comparison and upgrade

**Displays Three Tiers:**

**Free Plan ($0)**
- 1 voice model
- 10 minutes/month
- Standard quality
- Community support

**Pro Plan ($49/month)**
- Unlimited voices
- 300 minutes/month
- Ultra-HD quality
- Priority rendering
- Emotional controls

**Enterprise (Custom)**
- API access
- Custom voice ownership
- Unlimited minutes
- Dedicated manager
- SSO & security

**Actions:**
- FREE: "Current Plan" (disabled if on FREE)
- PRO: "Upgrade to Pro" (payment)
- ENTERPRISE: "Contact Sales" (email popup)

---

### 12. **Admin Dashboard** (`/admin`)
**Purpose:** System management and analytics

**Requires:** Admin role JWT token

**Sections:**
- **Key Metrics:**
  - Total users
  - Active users
  - Total generations
  - Revenue (if payments integrated)
- **User Management:**
  - User list table
  - Search/filter
  - Plan column
  - Delete user option
- **Chart/Analytics:**
  - Users by plan (pie chart)
  - Generations over time (line chart)
  - Popular voices

---

## Backend Features & Controllers

### 1. **Authentication Controller** (`auth.controller.js`)

#### signup(req, res)
```javascript
Flow:
1. Extract name, email, password from req.body
2. Check if email already exists in User collection
3. If exists → 409 Conflict
4. Hash password: bcrypt.hash(password, 10)
5. Generate verification token: crypto.randomBytes(32).toString("hex")
6. Create user document with:
   - Plain name and email
   - Hashed password
   - emailVerificationToken
   - emailVerificationExpires (24 hours from now)
   - role: "USER"
   - plan: "FREE"
   - usage: { secondsGenerated: 0, limit: 300, clonesCount: 0 }
7. Build verification link: `${FRONTEND_URL}/verify-email?token=${token}`
8. Send email with HTML template
9. Return 201 + message "Verification email sent"

Error Cases:
- 409: Email already exists
- 400: Missing fields
- 500: Email service failed
```

---

#### login(req, res)
```javascript
Flow:
1. Extract email and password
2. Find user by email
3. If not found → 401 Unauthorized
4. Compare password: bcrypt.compare(password, user.password)
5. If mismatch → 401
6. If emailVerified === false → 403 (account not verified)
7. Create JWT token:
   - Payload: { userId: user._id }
   - Sign with JWT_SECRET
   - Set expiry: 7 days
8. Return:
   {
     token: "...",
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
       plan: user.plan,
       usage: user.usage
     }
   }

Token Usage:
- Frontend stores in localStorage
- API interceptor adds: Authorization: Bearer <token>
- Backend middleware verifies before every protected endpoint
```

---

#### verifyEmail(req, res)
```javascript
Flow:
1. Extract token from query parameters
2. Find user with:
   - emailVerificationToken === token
   - emailVerificationExpires > Date.now()
3. If not found → 400 "Invalid or expired token"
4. Update user:
   - emailVerified = true
   - emailVerificationToken = null
   - emailVerificationExpires = null
5. Save to database
6. Return 200 "Email verified successfully"

Note:
- Token expires after 24 hours
- User cannot login until verified
- Can resend verification email
```

---

#### forgotPassword(req, res)
```javascript
Flow:
1. Extract email from body
2. Find user by email
3. If not found → 400 (don't reveal if email exists)
4. Generate reset token: crypto.randomBytes(32).toString("hex")
5. Update user:
   - resetPasswordToken = token
   - resetPasswordExpires = Date.now() + 30 * 60 * 1000 (30 mins)
6. Build reset link
7. Send email
8. Return 200 "Reset email sent"

Security:
- Token expires in 30 minutes
- Token is not reversible (hashed before sending)
- Frontend receives token from email URL
```

---

#### resetPassword(req, res)
```javascript
Flow:
1. Extract token and newPassword from body
2. Find user with:
   - resetPasswordToken === token
   - resetPasswordExpires > Date.now()
3. If not found → 400 "Invalid or expired token"
4. Hash new password
5. Update user:
   - password = hashed
   - resetPasswordToken = null
   - resetPasswordExpires = null
6. Save
7. Return 200 "Password reset successful"
```

---

#### getMe(req, res)
```javascript
Flow:
1. Extract userId from JWT (middleware sets req.userId)
2. Find user by _id
3. If not found → 401
4. Return user object (without password)

Middleware (auth.middleware.js):
- Extract token from Authorization header
- Verify JWT signature
- Decode token
- Set req.userId = decoded.userId
- If invalid/expired → 401
```

---

### 2. **Person (Voice) Controller** (`person.controller.js`)

#### createPerson(req, res)
```javascript
Flow:
1. Extract userId from JWT
2. Extract name from req.body
3. Get voice file from req.file (multipart/form-data)
4. Validate file:
   - Check if file exists
   - Check if WAV format (file.mimetype)
   - Check size < 10MB (if limit set)
5. Create temp path: /tmp/${unique_id}.wav
6. Save file to /tmp
7. Upload to Cloudinary:
   - Create FormData
   - Append file
   - POST to Cloudinary API
   - Get permanent URL
8. Create Person document:
   {
     name: name,
     voicePath: cloudinary_url,
     userId: userId
   }
9. Save to MongoDB
10. Delete /tmp file
11. Return 201 + person data with URL

Error Handling:
- 400: Invalid file format
- 413: File too large
- 500: Cloudinary upload failed
```

---

#### getPersons(req, res)
```javascript
Flow:
1. Extract userId from JWT
2. Query MongoDB: Person.find({ userId })
3. Return array of voices
4. Frontend receives and renders dropdown

Optimization:
- Returns only this user's voices
- Used for dropdown in generate page
- Could be cached on frontend
```

---

#### deletePerson(req, res)
```javascript
Flow:
1. Extract userId and personId from request
2. Find person document
3. Verify person.userId === req.userId (ownership check)
4. If not owner → 403 Forbidden
5. Delete person from MongoDB
6. (Optional) Delete file from Cloudinary
7. Delete related generations from Generation collection
8. Return 200 "Voice deleted"

Cascading:
- When voice deleted, all generations using that voice are also deleted
- Prevents orphaned records
```

---

### 3. **Clone Voice Controller** (`clone.controller.js`)

This is the most complex controller. Here's the full flow:

```javascript
cloneVoice(req, res):

1️⃣ VALIDATION
   - Extract: text, personId from req.body
   - Extract: userId from JWT
   - If missing → 400

2️⃣ FETCH VOICE PROFILE
   - Query MongoDB: Person.findById(personId)
   - If not found → 404 "Voice not found"
   - Extract: voicePath (Cloudinary URL)
   - Verify URL valid

3️⃣ CHECK USER LIMIT
   - Get user from User collection
   - If plan === "FREE" and usage.secondsGenerated >= 300 → 429 "Limit exceeded"
   - If plan === "PRO" and usage.secondsGenerated >= 18000 → 429

4️⃣ DOWNLOAD VOICE FROM CLOUDINARY
   - Create temp path: /tmp/${uuid}.wav
   - Axios GET request to Cloudinary URL
   - Write response data to temp file
   - File now available locally

5️⃣ PREPARE AI REQUEST
   - Create FormData object
   - Append text field
   - Append voice file (binary)
   - Target: https://danishhshk-voxcloneai.hf.space/clone (FastAPI service)

6️⃣ CALL AI SERVICE
   - POST to AI endpoint
   - Wait for response (could take 15-60 seconds)
   - Receive binary audio data
   - AI model (XTTS v2) processes:
     * Analyzes speaker voice characteristics
     * Extracts prosody, pitch, tone
     * Generates new speech with same characteristics
     * Returns WAV file

7️⃣ UPLOAD GENERATED AUDIO
   - Save generated audio to temp file
   - Create FormData for Cloudinary
   - Upload binary audio
   - Get permanent Cloudinary URL

8️⃣ SAVE TO DATABASE
   - Create Generation document:
     {
       userId: userId,
       voiceId: personId,
       voiceName: person.name,
       text: text,
       audioUrl: cloudinary_url,
       duration: calculateDuration(text)
     }
   - Save to MongoDB

9️⃣ UPDATE USAGE STATS
   - Find user
   - Increment usage.secondsGenerated by duration
   - Increment usage.clonesCount by 1
   - Save user

🔟 CLEANUP
   - Delete temporary voice file from /tmp
   - Delete temporary audio file from /tmp

1️⃣1️⃣ RESPONSE
   - Return 200 + Generation object with audioUrl
   - Frontend receives URL
   - Frontend renders <audio src={url} />
   - User can play/download

ERROR HANDLING:
- 400: Missing text/personId, invalid text length
- 404: Voice not found
- 429: User limit exceeded
- 503: AI service unavailable
- 500: Cloudinary upload failed
```

---

### 4. **Generation Controller** (`generation.controller.js`)

#### getRecentGenerations(req, res)
```javascript
Flow:
1. Extract userId from JWT
2. Query Generation collection:
   - Filter: { userId: userId }
   - Sort: { createdAt: -1 } (newest first)
   - Limit: 10 (or configurable)
3. Return array with:
   - id, voiceName, text, audioUrl, duration, createdAt
4. Frontend renders in history list

Usage:
- Display on dashboard
- Display on generate page
- User can play/download previous generations
```

---

### 5. **Payment Controller** (`payment.controller.js`)

#### createOrder(req, res)
```javascript
Flow:
1. Extract userId and plan from request
2. Get plan pricing:
   - PRO: 4900 paise (₹49)
   - ENTERPRISE: custom
3. Create Razorpay order:
   - Amount in paise
   - Currency: "INR"
   - Receipt: unique_id
4. Return:
   {
     razorpayOrderId,
     amount,
     key: "rzp_test_RvOHCsJU3ogbmK"
   }
5. Frontend uses this to open Razorpay payment modal

Razorpay Integration:
- KEY_ID: rzp_test_RvOHCsJU3ogbmK
- KEY_SECRET: UIJ47ZeVEs1H1w2Ih2Ulnq2r
- Mode: Test mode (sandbox)
```

---

#### verifyPayment(req, res)
```javascript
Flow:
1. Extract from request:
   - razorpayOrderId
   - razorpayPaymentId
   - razorpaySignature
2. Verify signature:
   - Create HMAC: crypto.createHmac('sha256', KEY_SECRET)
   - Data: `${orderId}|${paymentId}`
   - Generated signature must match provided signature
3. If signature invalid → 400 "Invalid signature"
4. Create Payment record:
   {
     userId,
     razorpayOrderId,
     razorpayPaymentId,
     amount,
     plan,
     status: "completed"
   }
5. Update user:
   - plan = selected plan
   - usage.limit = new limit
6. Send confirmation email
7. Return 200 "Payment verified"

Security:
- Only backend verifies signature (uses SECRET)
- Frontend cannot fake payment
```

---

### 6. **Admin Controller** (`admin.controller.js`)

#### getAllUsers(req, res)
```javascript
Flow:
1. Verify req.userId has role === "ADMIN" (middleware)
2. Query all users:
   User.find().select("-password")
3. Return array with all user details
4. Admin page displays in table

Protection:
- Requires admin.middleware to verify role
- Regular users cannot access this endpoint
```

---

#### getAnalytics(req, res)
```javascript
Flow:
1. Verify admin role
2. Count total users: User.countDocuments()
3. Count active users (logged in recently): User.find({ lastLogin > 30 days ago })
4. Count total generations: Generation.countDocuments()
5. Group users by plan:
   - Aggregation pipeline
   - Group by plan field
   - Count each group
6. Return object:
   {
     totalUsers,
     activeUsers,
     totalGenerations,
     byPlan: { FREE: X, PRO: Y, ENTERPRISE: Z }
   }
7. Admin dashboard renders charts
```

---

## Authentication & Security

### JWT Authentication Flow

```
1. User Signup/Login
   ↓
2. Backend creates JWT:
   {
     header: { alg: "HS256", typ: "JWT" },
     payload: { userId: "...", iat: now, exp: now + 7days },
     signature: HMAC-SHA256(header + payload, JWT_SECRET)
   }
   ↓
3. Frontend stores in localStorage: localStorage.setItem("token", jwt)
   ↓
4. API Interceptor:
   - Before each request, extracts token
   - Adds to header: Authorization: Bearer <jwt>
   ↓
5. Backend auth.middleware:
   - Extracts token from header
   - Verifies signature
   - Decodes payload
   - Sets req.userId = payload.userId
   ↓
6. Controller uses req.userId to:
   - Filter user-specific data
   - Update user records
   - Track usage
   ↓
7. Error scenarios:
   - Missing token → 401
   - Invalid signature → 401
   - Expired token → 401
   - API interceptor redirects to /login
```

### Password Security

```
Signup:
1. User enters plain password
2. Hash: bcrypt.hash(password, 10)
3. 10 salt rounds (slow hash)
4. Store only hash in MongoDB
5. Password never stored in plaintext

Login:
1. User enters plain password
2. Compare: bcrypt.compare(plaintext, storedHash)
3. Returns boolean
4. If false → 401

Forgot Password:
1. User clicks forgot
2. Generate token: crypto.randomBytes(32).toString("hex")
3. Token stored in resetPasswordToken field
4. Token sent via email (not hashed in this case)
5. User clicks link with token
6. User enters new password
7. Hash new password
8. Clear token field
```

### Ownership Verification

```
Pattern Used Throughout:
1. Extract userId from JWT
2. Query document by ID
3. Verify document.userId === req.userId
4. If not equal → 403 Forbidden
5. Proceed only if owned

Example - Delete Voice:
- User tries to delete person_123
- Extract req.userId from JWT
- Query: Person.findById("person_123")
- Check: if (person.userId !== req.userId) → 403
- Only user's own voices can be deleted
```

### Admin Protection

```
Flow:
1. Middleware checks req.userId role
2. Find user in database
3. If user.role !== "ADMIN" → 403 Forbidden
4. Only admin routes protected
5. Regular users get 403 if they try to access
```

---

## Configuration & Environment Variables

### Server .env File
```env
# Server Port
PORT=5000

# Database
MONGO_URI=mongodb+srv://shaikhdanishpc:xJHmLjrLsX9tqnl1@cluster0.pwup88w.mongodb.net/voice_clone?retryWrites=true&w=majority

# Authentication
JWT_SECRET=5f99ce13c9b701fed75d0bab3574b3a8

# AI Service
AI_URL=https://danishhshk-voxcloneai.hf.space

# Cloud Storage
CLOUDINARY_CLOUD_NAME=dclcbyzmc
CLOUDINARY_API_KEY=653734835715297
CLOUDINARY_API_SECRET=XMTBmFwkKue2A4VPu6k-ms_V9q4

# Payment Gateway
RAZORPAY_KEY_ID=rzp_test_RvOHCsJU3ogbmK
RAZORPAY_KEY_SECRET=UIJ47ZeVEs1H1w2Ih2Ulnq2r

# Email Service
EMAIL_USER=shaikhdanishpc@gmail.com
EMAIL_PASS=oljsjmcrkorucxaw

# Frontend
FRONTEND_URL=https://vox-clone-ai.vercel.app/
```

### Configuration Files

#### server/src/config/env.js
```javascript
- Loads .env file using dotenv
- Validates required variables
- Throws error if missing critical variables
- Called first in server.js
```

#### server/src/config/db.js
```javascript
- Connects to MongoDB using MONGO_URI
- Sets mongoose options (useNewUrlParser, etc.)
- Handles connection errors
- Called in server.js before starting server
```

#### server/src/config/cloudinary.js
```javascript
- Initializes Cloudinary with API credentials
- Used for uploading voice files and audio
```

#### server/src/config/razorpay.js
```javascript
- Initializes Razorpay with KEY_ID and KEY_SECRET
- Used for payment processing
```

#### server/src/config/multer.js
```javascript
- Configures multer for file uploads
- Sets storage destination to /tmp
- Sets file size limits
- Validates file types (WAV only)
```

---

## Deployment

### Frontend Deployment (Vercel)

```
Repository: GitHub repo
Branch: main (auto-deploy)

Build Command: npm run build
Output Directory: dist/

Environment Variables:
- VITE_API_URL = https://vox-clone-api.render.com

Post-Deploy:
- Automatic DNS update
- CDN cache invalidation
- SSL certificate auto-renewal

Live URL: https://vox-clone-ai.vercel.app
```

### Backend Deployment (Render.com)

```
Repository: GitHub repo
Branch: main

Build Command: npm install
Start Command: node server.js

Environment Variables:
- All values from .env file
- Secrets stored in Render dashboard

Runtime: Node.js
Region: Default (US)

Live URL: https://vox-clone-api.render.com

Networking:
- Frontend → Backend: HTTPS
- Backend → MongoDB: MongoDB Atlas connection string
- Backend → Cloudinary: HTTPS
- Backend → AI Service: HTTPS
```

### AI Service Deployment (Hugging Face Spaces)

```
Repository: HuggingFace Space
Docker Image: python:3.10-slim

Dockerfile:
- Install dependencies: apt-get install ffmpeg
- Copy app.py
- Install pip packages from requirements.txt
- Run: uvicorn app:app --host 0.0.0.0 --port 7860

Space URL: https://danishhshk-voxcloneai.hf.space

Inference:
- Accepts POST /clone requests
- Returns generated audio WAV file
- CPU-based inference (free tier)
- Response time: 15-60 seconds depending on text length
```

### Database Deployment (MongoDB Atlas)

```
Cluster: cluster0
Database: voice_clone
Collections: User, Person, Generation, Payment

Connection String: mongodb+srv://shaikhdanishpc:...
Network Access: IP whitelist (Render IPs)
Backup: Daily automatic backups

Indexes:
- User: email (unique)
- Person: userId
- Generation: userId, createdAt
- Payment: userId, razorpayOrderId (unique)
```

---

## User Workflows & Behavior

### Workflow 1: New User Registration

```
1. User visits https://vox-clone-ai.vercel.app
2. Clicks "Get Started" → /signup page
3. Fills form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "SecurePass123"
4. Clicks "Sign Up"
5. Frontend sends POST /api/auth/signup
6. Backend:
   - Checks email uniqueness
   - Hashes password
   - Generates verification token
   - Sends email with 24-hour link
7. User sees: "Check your email to verify"
8. User opens email
9. Clicks verification link
10. Frontend calls /api/auth/verify-email?token=...
11. Backend marks emailVerified = true
12. User sees "Email verified!"
13. Redirects to login
14. User logs in with email/password
15. Gets JWT token
16. Sees empty dashboard (no voices yet)

Duration: 2-5 minutes
```

### Workflow 2: Creating Voice Profile

```
1. User logged in, on dashboard
2. Clicks "Create Voice" or goes to /voices
3. Records or downloads voice sample (WAV)
   - Min duration: 5 seconds
   - Max: 60 seconds (recommended)
   - Format: WAV only
4. Clicks "Choose File" → selects WAV
5. Enters voice name: "My Professional Voice"
6. Clicks "Upload Voice"
7. Frontend:
   - Shows upload progress
   - Displays "Uploading to cloud..."
8. Backend:
   - Receives multipart form
   - Saves to /tmp
   - Uploads to Cloudinary
   - Gets permanent URL
   - Saves to Person collection
   - Deletes /tmp file
9. Frontend receives URL
10. Displays success message
11. Adds voice to list
12. User can now generate with this voice

Duration: 10-30 seconds
```

### Workflow 3: Generating Speech

```
1. User on /generate page
2. Voice dropdown populated with their voices
3. User types text: "Hello, my name is John"
4. Can see character count
5. Selects voice from dropdown
6. Clicks "Generate Speech"
7. Button shows loading spinner
8. Frontend POST to /api/clone:
   {
     text: "Hello, my name is John",
     personId: "voice_id_123"
   }
9. Backend:
   - Validates text and voice
   - Checks usage limit
   - Downloads voice from Cloudinary
   - Sends to AI service
   - Waits 15-60 seconds for response
   - Uploads generated audio
   - Saves to Generation collection
   - Updates user usage stats
10. Returns audio URL
11. Frontend receives URL
12. Audio player shows
13. User can:
    - Play audio
    - Download as file
    - Share link
    - Delete from history
14. Generation added to history list

Duration: 20-70 seconds (waiting on AI)
User Experience: Loader visible, cannot interact
```

### Workflow 4: Upgrading Plan

```
1. User on /pricing page
2. Currently on FREE plan
3. Clicks "Upgrade to Pro"
4. Shown 2 options:
   - ₹49 month subscription
   - Select payment method
5. Clicks "Pay with Razorpay"
6. Razorpay modal opens (embedded)
7. User enters:
   - Card number
   - CVV
   - Expiry
   (in test mode: pre-filled)
8. Confirms payment
9. Razorpay processes (2-5 seconds)
10. Returns success confirmation
11. Frontend calls /api/payment/verify with:
    - razorpayOrderId
    - razorpayPaymentId
    - razorpaySignature
12. Backend:
    - Verifies signature
    - Updates user.plan = "PRO"
    - Updates user.usage.limit = 18000 (300 mins)
    - Creates Payment record
    - Sends confirmation email
13. Frontend shows "Upgrade successful!"
14. User redirected to dashboard
15. Dashboard shows:
    - "Plan: Pro"
    - Usage limit increased
16. Can now generate more content

Duration: 5-10 seconds
```

### Workflow 5: Admin Operations

```
1. Admin (role: "ADMIN") logs in
2. JWT has admin role
3. Visits /admin route
4. AdminRoute middleware checks role
5. If admin → renders AdminDashboard
6. If not admin → redirects to dashboard
7. Dashboard shows:
   - Total users: 500
   - Active users: 150
   - Total generations: 2000
   - Chart: users by plan
8. Admin can:
   - View all users list
   - See user plans and usage
   - Delete user (with confirmation)
   - View analytics
9. Actions logged for audit trail

Duration: Varies by operation
```

---

## Setup & Installation Guide

### Prerequisites
- Node.js v16+ (for backend and frontend)
- Python 3.10+ (for AI service)
- Git
- MongoDB account (Atlas)
- Cloudinary account
- Razorpay account
- Gmail account (for email service)

### Backend Setup

```bash
# 1. Navigate to server directory
cd server

# 2. Install dependencies
npm install

# 3. Create .env file in server/
touch .env

# 4. Add all environment variables (see .env section above)
# Copy from provided .env file

# 5. Test database connection
node -e "require('./src/config/env.js'); require('./src/config/db.js');"

# 6. Start backend
npm start
# or with auto-reload:
npm run dev

# Backend runs on http://localhost:5000
# Health check: http://localhost:5000/health
```

### Frontend Setup

```bash
# 1. Navigate to client directory
cd client

# 2. Install dependencies
npm install

# 3. Create .env.local file
touch .env.local

# 4. Add:
VITE_API_URL=http://localhost:5000

# 5. Start development server
npm run dev

# Frontend runs on http://localhost:5173
# Auto-opens in browser
```

### AI Service Setup (Local)

```bash
# 1. Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Download XTTS model (first run only)
# Model auto-downloads on first /clone request
# Size: ~2GB

# 4. Run FastAPI server
uvicorn app:app --reload --host 0.0.0.0 --port 7860

# Service runs on http://localhost:7860
# Health check: http://localhost:7860/health
```

### Environment Files

**server/.env:**
```env
PORT=5000
MONGO_URI=...
JWT_SECRET=...
AI_URL=http://localhost:7860  # Local for development
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
EMAIL_USER=...
EMAIL_PASS=...
FRONTEND_URL=http://localhost:5173
```

**client/.env.local:**
```env
VITE_API_URL=http://localhost:5000
```

### Testing the Full Flow

```bash
# 1. Create account
POST http://localhost:5000/api/auth/signup
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPass123"
}

# 2. Verify email
GET http://localhost:5000/api/auth/verify-email?token=<token_from_email>

# 3. Login
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "TestPass123"
}
# Response contains JWT token

# 4. Upload voice (multipart form)
POST http://localhost:5000/api/person
Headers: Authorization: Bearer <token>
Body: file (WAV) + name

# 5. Generate speech
POST http://localhost:5000/api/clone
Headers: Authorization: Bearer <token>
{
  "text": "Hello world",
  "personId": "<voice_id>"
}

# 6. Listen to response audio in frontend
```

---

## Development Notes

### Common Issues & Solutions

#### 1. **Cloudinary Upload Fails**
```
Issue: 413 Payload Too Large
Solution:
- Check file size < 100MB
- Verify API credentials
- Check Cloudinary account limits

Issue: Invalid authentication
Solution:
- Verify CLOUD_NAME, API_KEY, API_SECRET
- Check these in Cloudinary dashboard
- Regenerate keys if needed
```

#### 2. **AI Service Timeout**
```
Issue: Request hangs for > 60 seconds
Solution:
- AI service might be processing
- Check HuggingFace Space status
- Text too long for CPU (max 200 chars)
- Check internet connection

Issue: AI returns 500 error
Solution:
- Check XTTS model loaded correctly
- Check disk space for model (2GB)
- Check GPU availability
- Restart service
```

#### 3. **JWT Token Issues**
```
Issue: 401 on protected routes
Solution:
- Token missing from localStorage
- Token expired (7 days)
- Token invalid signature
- Check JWT_SECRET matches

Issue: Auto-logout happening
Solution:
- Check token expiration (7 days)
- Verify localStorage not cleared
- Check API interceptor working
```

#### 4. **Email Service Failures**
```
Issue: Emails not sending
Solution:
- Check Gmail "Less secure" setting enabled
- Verify EMAIL_USER and EMAIL_PASS correct
- Check SMTP connection
- Try app password instead of Gmail password
- Allow "Insecure apps" in Gmail

Issue: Verification link broken
Solution:
- Check FRONTEND_URL correct
- Verify token passed correctly
- Token might be expired (24 hours)
```

#### 5. **MongoDB Connection Issues**
```
Issue: Connection timeout
Solution:
- Check MONGO_URI correct
- Verify MongoDB Atlas cluster online
- Check IP whitelist (add backend IP)
- Check internet connection

Issue: Authentication failed
Solution:
- Check username/password in URI
- Special characters need URL encoding
- Verify database exists
```

### Performance Optimization

```
Frontend:
- Code splitting with React.lazy()
- Lazy load pages
- Memoize expensive computations
- Cache API responses
- Optimize images

Backend:
- Index frequently queried fields
- Limit returned data (pagination)
- Cache generation requests (Redis)
- Rate limit per user
- Compress responses

AI Service:
- GPU acceleration when available
- Cache model in memory
- Batch process if queue grows
- Limit concurrent requests
```

### Monitoring & Debugging

```
Frontend Console:
- Check API request/response in Network tab
- Console errors for JS problems
- Check localStorage for token

Backend Logs:
- Morgan middleware logs all requests
- Check for 500 errors
- Monitor database queries
- Track AI service calls

Production:
- Use monitoring service (Sentry)
- Set up alerting for errors
- Track API response times
- Monitor database performance
```

---

## Summary

VoxClone AI is a complete, production-ready voice cloning SaaS platform built with modern technologies:

**Core Functionality:**
- User authentication (email verified)
- Voice profile management (cloud storage)
- AI-powered speech generation
- Subscription plans with usage limits
- Payment integration
- Admin dashboard

**Tech Stack:**
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + MongoDB
- AI: FastAPI + Coqui XTTS v2
- Cloud: Cloudinary + Razorpay + MongoDB Atlas
- Deployment: Vercel + Render + HuggingFace

**Key Features:**
- Microservice architecture
- Secure JWT authentication
- Cloud-based file storage
- Payment processing
- Admin analytics
- Email notifications

This project is suitable for:
- Full-stack development learning
- AI/ML deployment practice
- SaaS architecture study
- Production deployment experience
- Portfolio project showcase

---

*Last Updated: January 28, 2026*
*VoxClone AI v3.0*
