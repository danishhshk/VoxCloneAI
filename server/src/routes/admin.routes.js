import express from "express";
import auth from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import {
  getAllUsers,
  updateUserPlan,
  getAdminStats
} from "../controllers/admin.controller.js";

const router = express.Router();

/* =========================
   ADMIN DASHBOARD
========================= */
router.get("/stats", auth, admin, getAdminStats);

/* =========================
   ADMIN USERS
========================= */
router.get("/users", auth, admin, getAllUsers);

/* =========================
   ADMIN UPDATE USER PLAN
========================= */
router.post("/update-plan", auth, admin, updateUserPlan);

export default router;
