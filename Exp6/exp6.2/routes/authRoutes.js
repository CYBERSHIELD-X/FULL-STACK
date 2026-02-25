const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

/* Register */
router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash
  });

  res.send("User Registered ✅");
});

/* Login */
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("User Not Found ❌");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.send("Wrong Password ❌");

  const token = jwt.sign(
    { id: user._id },
    "mysecretkey",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

/* Protected Route */
router.get("/balance", require("../middleware/auth"),
  async (req, res) => {

    const user = await User.findById(req.user.id);

    res.json({
      name: user.name,
      balance: user.balance
    });
  }
);

module.exports = router;
