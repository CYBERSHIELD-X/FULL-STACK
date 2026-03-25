const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { verifyToken, checkRole } = require("./middleware");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

// LOGIN API (with roles)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    const token = jwt.sign({ email, role: "admin" }, SECRET);
    return res.json({ token });
  }

  if (email === "user@gmail.com" && password === "1234") {
    const token = jwt.sign({ email, role: "user" }, SECRET);
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// USER ROUTE
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "User Dashboard: " + req.user.email });
});

// ADMIN ROUTE
app.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Admin Panel Access Granted" });
});

app.listen(5000, () => console.log("Server running on 5000"));
