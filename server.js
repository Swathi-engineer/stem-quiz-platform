
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const scoreRoutes = require("./routes/scoreRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());



// ✅ ADD HERE

  app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.use(express.static("public"));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/scores", scoreRoutes);
// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/stem_quiz")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Server
app.listen(PORT, '0.0.0.0', () => {

  const os = require('os');
  const interfaces = os.networkInterfaces();
  let localIP = 'Unknown IP';
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIP = iface.address;
      }
    }
  }
  

  console.log(`🔥 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Network Access: Tell students to join at -> http://${localIP}:${PORT}`);
});