const express = require("express");
const router = express.Router();
const Score = require("../models/Score");

// ✅ GET ALL SCORES (Teacher Performance)
router.get("/", async (req, res) => {
  const scores = await Score.find();
  res.json(scores);
});


// SAVE SCORE
router.post("/submit", async (req, res) => {
  const { email, score, total, subject, grade, level, lesson } = req.body;

  const newScore = new Score({ email, score, total, subject, grade, level, lesson });
  await newScore.save();

  res.json({ message: "Score saved" });
});

// GET PERFORMANCE
router.get("/performance/:email", async (req, res) => {
  const scores = await Score.find({ email: req.params.email });

  let totalScore = 0;
  let totalQuestions = 0;

  scores.forEach(s => {
    totalScore += s.score;
    totalQuestions += s.total;
  });

  const percentage = totalQuestions
    ? ((totalScore / totalQuestions) * 100).toFixed(2)
    : 0;

  // Badge logic
  let badge = "🥉 Beginner";
  if (percentage >= 90) badge = "🏆 Master";
  else if (percentage >= 70) badge = "🥇 Gold";
  else if (percentage >= 50) badge = "🥈 Silver";

  res.json({
    totalQuizzes: scores.length,
    percentage,
    badge
  });
});

module.exports = router;