const mongoose = require("mongoose");

// Review Schema
const reviewSchema = new mongoose.Schema({
  userId: String,
  rating: Number,
  comment: String
});

// Variant Schema
const variantSchema = new mongoose.Schema({
  sku: String,
  color: String,
  price: Number,
  stock: Number
});

// Main Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  category: String,

  variants: [variantSchema],   // Nested
  reviews: [reviewSchema],     // Nested

  avgRating: Number
});

// Index for performance
productSchema.index({ name: 1, category: 1 });

module.exports = mongoose.model("Product", productSchema);
