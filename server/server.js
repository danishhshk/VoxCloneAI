import "./src/config/env.js";   // 👈 MUST BE FIRST

import connectDB from "./src/config/db.js";
import app from "./src/app.js";

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
