import "./src/config/env.js";   // 👈 MUST BE FIRST

import connectDB from "./src/config/db.js";
import app from "./src/app.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
