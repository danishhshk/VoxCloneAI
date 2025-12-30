import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import personRoutes from "./routes/person.routes.js";
import cloneRoutes from "./routes/clone.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import generationRoutes from "./routes/generation.routes.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// Temporary
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/person", personRoutes);
app.use("/api/clone", cloneRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/generation", generationRoutes);



// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

export default app;
