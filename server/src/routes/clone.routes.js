import express from "express";
import auth from "../middleware/auth.middleware.js";
import { cloneVoice } from "../controllers/clone.controller.js";

const router = express.Router();

router.post("/", auth, cloneVoice);

export default router;
