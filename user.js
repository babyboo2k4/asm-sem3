
const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Role = require("../models/Role");

const router = express.Router();

router.post("/add", authMiddleware(["admin"]), async (req, res) => {
  const { email, password, roles } = req.body;
  const user = new User({ email, password, roles });
  await user.save();
  res.json({ message: "User created successfully" });
});

router.put("/:id", authMiddleware(["admin"]), async (req, res) => {
  const { roles } = req.body;
  await User.findByIdAndUpdate(req.params.id, { roles });
  res.json({ message: "User updated successfully" });
});

module.exports = router;
