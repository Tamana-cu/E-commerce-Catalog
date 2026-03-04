const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* add product */

router.post("/add", async (req, res) => {

  try {

    const product = new Product(req.body);

    await product.save();

    res.json(product);

  } catch (err) {

    res.status(500).json(err);

  }

});

/* get all products */

router.get("/", async (req, res) => {

  const products = await Product.find();

  res.json(products);

});

module.exports = router;