const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// PROTECTED ROUTE
app.get("/dashboard", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: "Welcome " + decoded.email });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));
