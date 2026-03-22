const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });
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
    role: user.role
  });
});

// ✅ GET ALL USERS(ADMIN)
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
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