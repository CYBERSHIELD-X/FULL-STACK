const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// Public Route
router.get("/public", (req, res) => {
  res.send("This is Public API ✅");
});

// Protected Route
router.get("/private", auth, (req, res) => {
  res.send("This is Protected API 🔒");
});

module.exports = router;
