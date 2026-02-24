const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Product = require("./product");

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/productsDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// CREATE
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch (err) {
    res.send(err.message);
  }
});

// READ
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// UPDATE
app.put("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(product);
});

// DELETE
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted Successfully");
});

// Server Start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
