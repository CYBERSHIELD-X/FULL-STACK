const express = require("express");
const axios = require("axios");
const app = express();

// Combine services
app.get("/api/data", async (req, res) => {
  try {
    const users = await axios.get("http://localhost:5001/users");
    const products = await axios.get("http://localhost:5002/products");

    res.json({
      users: users.data,
      products: products.data
    });
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(5000, () => console.log("Gateway running on 5000"));
