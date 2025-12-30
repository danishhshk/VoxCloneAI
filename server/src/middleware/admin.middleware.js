import User from "../models/User.js";

export default async function admin(req, res, next) {
  const user = await User.findById(req.userId);

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
}
