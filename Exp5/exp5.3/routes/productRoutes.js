const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add Product
router.post("/add", async (req, res) => {
  await Product.create(req.body);
  res.send("Product Added");
});

// Get All Products
router.get("/", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

// Aggregation (Average Rating)
router.get("/avg-rating", async (req, res) => {
  const result = await Product.aggregate([
    { $unwind: "$reviews" },
    {
      $group: {
        _id: "$name",
        avgRating: { $avg: "$reviews.rating" }
      }
    }
  ]);

  res.json(result);
});

// Update Stock
router.put("/update-stock/:sku", async (req, res) => {

  await Product.updateOne(
    { "variants.sku": req.params.sku },
    { $set: { "variants.$.stock": req.body.stock } }
  );

  res.send("Stock Updated");
});

module.exports = router;
