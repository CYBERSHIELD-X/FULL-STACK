const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Aryan" },
    { id: 2, name: "Rahul" }
  ]);
});

app.listen(5001, () => console.log("User Service running on 5001"));
