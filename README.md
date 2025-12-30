# 🎙️ VoxClone AI – Voice Cloning Platform

VoxClone AI is a **full-stack AI-powered voice cloning platform** that enables users to create realistic speech from text using custom voice samples.
The system is built using a **secure microservice architecture**, separating frontend, backend, and AI inference for scalability and safety.

This project is suitable for **final-year projects, hackathons, demos, and research purposes**.

---

## 🚀 Features

* 🔐 JWT-based Authentication (Signup / Login)
* 👤 User Profiles & Usage Tracking
* 🎧 Voice Profile Creation (Upload WAV samples)
* 🧠 AI Voice Cloning using **XTTS (Coqui TTS)**
* ☁️ Generated Audio Storage (Cloudinary)
* 📊 Dashboard with usage statistics
* 💳 Payment Integration (Razorpay – demo/partial)
* 🌐 AI Microservice deployed on HuggingFace Spaces
* 🧩 Scalable CPU → GPU architecture

---

## 🏗️ Architecture

```
React Frontend
     ↓ (REST APIs)
Node.js + Express Backend
     ↓ (Secure HTTP)
FastAPI AI Service (XTTS on HuggingFace Spaces)
```

### Key Design Decisions

* Frontend never directly accesses AI
* Backend acts as security & control layer
* AI runs as an isolated microservice
* Same AI code works on CPU or GPU

---

## 🧠 AI Service (XTTS)

* **Model:** tts_models/multilingual/multi-dataset/xtts_v2
* **Framework:** FastAPI
* **Deployment:** HuggingFace Spaces (Docker, CPU Basic)
* **License:** CPML (Non-Commercial)

### API Endpoints

| Method | Endpoint  | Description                        |
| ------ | --------- | ---------------------------------- |
| GET    | `/health` | Check AI service status            |
| POST   | `/clone`  | Generate cloned voice (text + WAV) |

---

## 🖥️ Backend

### Responsibilities

* User authentication & authorization
* Voice profile management
* Calling AI microservice
* Storing audio metadata
* Usage tracking
* Payment order creation

### Tech Stack

* Node.js (ES Modules)
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* Cloudinary
* Razorpay

---

## 📂 Backend Folder Structure

```
server/
│
├── server.js
├── package.json
├── .env
│
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── razorpay.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Person.js
│   │   └── Generation.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── person.controller.js
│   │   ├── clone.controller.js
│   │   └── payment.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── person.routes.js
│   │   ├── clone.routes.js
│   │   └── payment.routes.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   └── utils/
│       └── callAI.js
│
└── uploads/
```

---

## 🎨 Frontend

### Features

* Login / Signup
* Dashboard with usage stats
* Voice Library
* Text-to-Speech generation
* Audio playback & download
* Profile & plan display

### Tech Stack

* React + TypeScript
* Tailwind CSS
* Axios
* React Router
* Context API

---

## 🔐 Authentication Flow

1. User logs in or signs up
2. Backend returns JWT token
3. Token stored in localStorage
4. Axios interceptor attaches token
5. Protected routes enforced via middleware

---

## ☁️ Audio Storage

* Voice samples & generated audio stored on **Cloudinary**
* Each user has isolated folders
* MongoDB stores metadata and URLs only

---

## 💳 Payments (Demo Scope)

* Razorpay order creation implemented
* Payment verification optional / future scope
* Plan upgrades simulated for demo
* Not production-ready billing

---

## 🌍 Deployment

### AI Service

* HuggingFace Spaces
* Docker SDK
* CPU Basic (free tier)
* GPU upgrade supported without code changes

### Backend

* Localhost / Render / Railway / VPS

### Frontend

* Vercel / Netlify

---

## ⚠️ Limitations

* CPU-based inference is slow
* Payment verification incomplete
* No admin dashboard
* No strict quota enforcement
* CPML (non-commercial) AI license

---

## 🧑‍🏫 Academic Summary

> VoxClone AI is a secure, microservice-based voice cloning platform where a Node.js backend mediates between a React frontend and an AI inference service deployed on HuggingFace Spaces.

---

## 📜 License

* **Project Code:** MIT (recommended)
* **AI Model:** CPML (Coqui – Non-Commercial)

---

## 👤 Author

**Danish Shaikh**
Project: **VoxClone AI**
Purpose: Academic / Demo / Research
