const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  sku: String,
  color: String,
  price: Number,
  stock: Number
});

const reviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: {
    type: Number,
    default: 0
  }
});

/* indexes for performance */

productSchema.index({ category: 1 });
productSchema.index({ "variants.sku": 1 });

module.exports = mongoose.model("Product", productSchema);