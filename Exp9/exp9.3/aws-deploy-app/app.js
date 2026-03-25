const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("AWS Deployment Working 🚀");
});

app.listen(3000, () => console.log("Server running"));
