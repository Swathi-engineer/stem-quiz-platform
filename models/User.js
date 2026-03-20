const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "teacher", "admin"] // ✅ restrict roles
  }
});

module.exports = mongoose.model("User", userSchema);