const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, grade } = req.body;

    const user = new User({ name, email, password, role, grade });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN DATA:", email, password);

  const user = await User.findOne({ email, password });

  console.log("USER FOUND:", user);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    role: user.role,
    grade: user.grade
  });
});

// ✅ GET ALL USERS(ADMIN)
router.get("/users", async (req, res) => {
  const users = await User.find();
  // Map to safely ensure fields exist
  const mapped = users.map(user => ({
    _id: user._id,
    email: user.email,
    displayName: user.displayName || user.name || (user.email ? user.email.split('@')[0] : ""),
    avatar: user.avatar || "🧑‍🚀",
    role: user.role || "student",
    grade: user.grade
  }));
  res.json(mapped);
});

// GET PROFILE
router.get("/profile/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({
    displayName: user.displayName || user.name || user.email.split('@')[0],
    avatar: user.avatar || "🧑‍🚀",
    unlockedAvatars: user.unlockedAvatars || ["🧑‍🚀"],
    spentGems: user.spentGems || 0,
    grade: user.grade || 5
  });
});

// UPDATE PROFILE
router.post("/profile/update", async (req, res) => {
  const { email, displayName, avatar } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (displayName) user.displayName = displayName;
  if (avatar) user.avatar = avatar;
  await user.save();
  res.json({ message: "Profile updated" });
});

// BUY AVATAR
router.post("/profile/buy", async (req, res) => {
  const { email, avatar, cost } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  
  if (!user.unlockedAvatars.includes(avatar)) {
    user.unlockedAvatars.push(avatar);
    user.spentGems += cost;
    user.avatar = avatar; // auto equip on purchase
    await user.save();
    res.json({ success: true, message: "Avatar bought!" });
  } else {
    res.json({ success: false, message: "Already owned!" });
  }
});

// ✅ DELETE USER (ADMIN)
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//EXPORT
module.exports = router;