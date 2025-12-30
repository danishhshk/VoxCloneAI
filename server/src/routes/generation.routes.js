import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getRecentGenerations } from "../controllers/generation.controller.js";

const router = express.Router();

router.get("/recent", auth, getRecentGenerations);

export default router;   // 👈 THIS IS THE FIX
