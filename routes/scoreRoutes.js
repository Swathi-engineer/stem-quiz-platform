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

  // Calculate past attempts
  const pastAttempts = await Score.countDocuments({ email, subject, grade, level, lesson });
  const attemptNum = pastAttempts + 1; // 1 means first attempt

  const newScore = new Score({ email, score, total, subject, grade, level, lesson });
  await newScore.save();

  // Gem points logic based on attempts and performance
  let maxGemsForAttempt = 100;
  if (attemptNum === 2) maxGemsForAttempt = 75;
  else if (attemptNum === 3) maxGemsForAttempt = 50;
  else if (attemptNum >= 4) maxGemsForAttempt = 25;

  let gemsEarned = 0;
  if (total > 0) {
    gemsEarned = Math.round(maxGemsForAttempt * (score / total));
  }

  const User = require("../models/User");
  const user = await User.findOne({ email });
  if (user) {
    user.earnedGems = (user.earnedGems || 0) + gemsEarned;
    await user.save();
  }

  res.json({ message: "Score saved", gemsEarned, attemptNum });
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