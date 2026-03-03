const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Custom instance method
productSchema.methods.applyDiscount = function(percent) {
  this.price = this.price - (this.price * percent / 100);
  return this.price;
};

module.exports = mongoose.model('Product', productSchema);
