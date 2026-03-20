const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  subject: String,   // STEM SUBJECTS
  grade: Number      // 1 to 12
});

module.exports = mongoose.model("Question", questionSchema);