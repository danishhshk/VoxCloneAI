// import razorpay from "../config/razorpay.js";
// import crypto from "crypto";
// import User from "../models/User.js";
// import Payment from "../models/Payment.js";

// export const createOrder = async (req, res) => {
//   const order = await razorpay.orders.create({
//     amount: req.body.amount,
//     currency: "INR"
//   });
//   res.json(order);
// };

// export const verifyPayment = async (req, res) => {
//   const body = req.body.orderId + "|" + req.body.paymentId;
//   const signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body)
//     .digest("hex");

//   if (signature !== req.body.signature)
//     return res.status(400).json({ message: "Invalid" });

//   await User.findByIdAndUpdate(req.userId, {
//     plan: req.body.plan,
//     "usage.limit": req.body.limit,
//     "usage.secondsGenerated": 0
//   });

//   await Payment.create({
//     userId: req.userId,
//     plan: req.body.plan,
//     amount: req.body.amount,
//     paymentId: req.body.paymentId
//   });

//   res.json({ success: true });
// };



import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import User from "../models/User.js";
import Payment from "../models/Payment.js";

/* CREATE ORDER */
export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;

    const pricing = {
      PRO: 49900 // ₹499 in paise
    };

    if (!pricing[plan]) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const order = await razorpay.orders.create({
      amount: pricing[plan],
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

/* VERIFY PAYMENT */
export const verifyPayment = async (req, res) => {
  try {
    const {
      orderId,
      paymentId,
      signature,
      plan
    } = req.body;

    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Upgrade user
    const limits = {
      PRO: 18000 // 300 minutes
    };

    await User.findByIdAndUpdate(req.userId, {
      plan,
      "usage.limit": limits[plan],
      "usage.secondsGenerated": 0
    });

    await Payment.create({
      userId: req.userId,
      plan,
      amount: plan === "PRO" ? 499 : 0,
      paymentId
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
