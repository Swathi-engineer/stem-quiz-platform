const mongoose = require("mongoose");
const Question = require("./models/Question");

mongoose.connect("mongodb://127.0.0.1:27017/stem_quiz").then(async () => {
  const questions = await Question.find();
  let updatedCount = 0;
  for (let q of questions) {
    if (q.question.includes(" difficulty)")) {
      q.question = q.question.replace(" difficulty)", ")");
      await q.save();
      updatedCount++;
    }
  }
  console.log(`Updated ${updatedCount} questions!`);
  process.exit(0);
});
