// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, roles } = req.body;
  const user = new User({ email, password, roles });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id, roles: user.roles }, "secret_key", { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Logged in successfully" });
});

module.exports = router;
