const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  displayName: { type: String, default: "" },
  avatar: { type: String, default: "🧑‍🚀" },
  profileImage: { type: String, default: "" },
  unlockedAvatars: { type: [String], default: ["🧑‍🚀"] },
  spentGems: { type: Number, default: 0 },
  earnedGems: { type: Number, default: 0 },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"]
  },
  grade: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model("User", userSchema);