const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* Add product */
router.post("/add", async (req, res) => {

  try {

    const product = new Product(req.body);

    await product.calculateAvgRating();

    await product.save();

    res.json(product);

  } catch (err) {

    res.status(500).json(err);

  }

});

/* Get all products */
router.get("/", async (req, res) => {

  const products = await Product.find();

  res.json(products);

});

/* Aggregation example */
router.get("/stats", async (req, res) => {

  const stats = await Product.aggregate([
    { $unwind: "$reviews" },
    {
      $group: {
        _id: "$name",
        avgRating: { $avg: "$reviews.rating" },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  res.json(stats);

});

module.exports = router;