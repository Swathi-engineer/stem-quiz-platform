const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  email: String,
  score: Number,
  total: Number,
  subject: String,
  grade: Number,
  level: Number,
  lesson: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Score", scoreSchema);