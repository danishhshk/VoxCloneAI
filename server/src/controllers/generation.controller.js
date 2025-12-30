import Generation from "../models/Generation.js";

export const getRecentGenerations = async (req, res) => {
  try {
    const items = await Generation.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
