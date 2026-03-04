const mongoose = require("mongoose");

/* Variant Schema */
const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  color: String,
  price: Number,
  stock: Number
});

/* Review Schema */
const reviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  rating: { type: Number, min: 1, max: 5 },
  comment: String
});

/* Product Schema */
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: { type: Number, default: 0 }
});

/* Indexes for performance */
productSchema.index({ category: 1 });
productSchema.index({ "variants.sku": 1 });

/* Method to update stock */
productSchema.methods.updateStock = function (sku, quantity) {

  const variant = this.variants.find(v => v.sku === sku);

  if (variant) {
    variant.stock += quantity;
  }

  return this.save();
};

/* Method to calculate average rating */
productSchema.methods.calculateAvgRating = function () {

  if (this.reviews.length === 0) {
    this.avgRating = 0;
  } else {

    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);

    this.avgRating = total / this.reviews.length;
  }

  return this.save();
};

module.exports = mongoose.model("Product", productSchema);