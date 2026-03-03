const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create Product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add Review
router.post('/:id/review', async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.reviews.push(req.body);
  product.calculateAvgRating();
  await product.save();
  res.json(product);
});

// Update Stock
router.put('/:id/stock', async (req, res) => {
  const { sku, quantity } = req.body;
  const product = await Product.findById(req.params.id);
  await product.updateStock(sku, quantity);
  res.json({ message: "Stock Updated Successfully" });
});

// Aggregation - Category Wise Avg Rating
router.get('/analytics/category-rating', async (req, res) => {
  const data = await Product.aggregate([
    { $unwind: "$reviews" },
    {
      $group: {
        _id: "$category",
        avgRating: { $avg: "$reviews.rating" }
      }
    }
  ]);
  res.json(data);
});

module.exports = router;
