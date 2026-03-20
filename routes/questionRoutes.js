const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// GET all questions
router.get("/", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// ✅ ADD QUESTION (ADD HERE 👇)
router.post("/add", async (req, res) => {
  const { question, options, answer, subject, grade } = req.body;

  const newQ = new Question({ question, options, answer, subject, grade });
  await newQ.save();

  res.json({ message: "Question added ✅" });
});

router.get("/:grade/:subject", async (req, res) => {
  const { grade, subject } = req.params;

  const questions = await Question.find({ grade, subject });
  res.json(questions);
});

module.exports = router;


