// import express from "express";
// import auth from "../middleware/auth.middleware.js";
// import { createOrder, verifyPayment , upgradePlan} from "../controllers/payment.controller.js";

// const router = express.Router();

// router.post("/create-order", auth, createOrder);
// router.post("/verify", auth, verifyPayment);
// router.post("/upgrade", auth, upgradePlan);

// export default router;


import express from "express";
import auth from "../middleware/auth.middleware.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", auth, createOrder);
router.post("/verify", auth, verifyPayment);

export default router;
