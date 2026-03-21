const mongoose = require("mongoose");
const User = require("./models/User");
const usersConfig = require("./data/users.json");

mongoose.connect("mongodb://127.0.0.1:27017/stem_quiz").then(async () => {
  await User.deleteMany({});
  await User.insertMany(usersConfig);
  console.log("Seeded users!");
  process.exit(0);
});
