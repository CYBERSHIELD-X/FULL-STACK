const mongoose = require('mongoose');

// Variant Schema
const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  color: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String
});

// Main Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, index: true },
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: { type: Number, default: 0 }
}, { timestamps: true });

// Calculate Average Rating
productSchema.methods.calculateAvgRating = function () {
  if (this.reviews.length === 0) {
    this.avgRating = 0;
  } else {
    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
    this.avgRating = total / this.reviews.length;
  }
  return this.avgRating;
};

// Update Stock (Atomic Operation)
productSchema.methods.updateStock = async function (sku, quantity) {
  const variant = this.variants.find(v => v.sku === sku);
  if (!variant) throw new Error("Variant not found");
  if (variant.stock < quantity) throw new Error("Insufficient stock");

  variant.stock -= quantity;
  await this.save();
};

module.exports = mongoose.model('Product', productSchema);
