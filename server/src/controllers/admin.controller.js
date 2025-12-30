// // import User from "../models/User.js";

// // /* =========================
// //    GET ALL USERS (ADMIN)
// // ========================= */
// // export const getAllUsers = async (req, res) => {
// //   try {
// //     const users = await User.find().select("-password");
// //     res.json(users);
// //   } catch (err) {
// //     res.status(500).json({ message: "Failed to fetch users" });
// //   }
// // };

// // /* =========================
// //    UPDATE USER PLAN (ADMIN)
// // ========================= */
// // export const updateUserPlan = async (req, res) => {
// //   try {
// //     const { userId, plan } = req.body;

// //     const limits = {
// //       FREE: 300,
// //       PRO: 18000,
// //       ENTERPRISE: Infinity
// //     };

// //     if (!limits[plan]) {
// //       return res.status(400).json({ message: "Invalid plan" });
// //     }

// //     await User.findByIdAndUpdate(userId, {
// //       plan,
// //       "usage.limit": limits[plan]
// //     });

// //     res.json({ message: "User plan updated successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Failed to update plan" });
// //   }
// // };

// import User from "../models/User.js";
// import Payment from "../models/Payment.js";

// /* =========================
//    ADMIN DASHBOARD STATS
// ========================= */
// export const getAdminStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const proUsers = await User.countDocuments({ plan: "PRO" });

//     const revenueAgg = await Payment.aggregate([
//       { $group: { _id: null, total: { $sum: "$amount" } } }
//     ]);

//     const revenue = revenueAgg[0]?.total || 0;

//     res.json({
//       totalUsers,
//       proUsers,
//       revenue
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch admin stats" });
//   }
// };

import User from "../models/User.js";
import Payment from "../models/Payment.js";

/* =========================
   ADMIN STATS
========================= */
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const proUsers = await User.countDocuments({ plan: "PRO" });

    const revenueAgg = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const revenue = revenueAgg[0]?.total || 0;

    res.json({
      totalUsers,
      proUsers,
      revenue
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* =========================
   UPDATE USER PLAN
========================= */
export const updateUserPlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;

    const limits = {
      FREE: 300,
      PRO: 18000,
      ENTERPRISE: Infinity
    };

    if (!limits[plan]) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    await User.findByIdAndUpdate(userId, {
      plan,
      "usage.limit": limits[plan]
    });

    res.json({ message: "User plan updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user plan" });
  }
};