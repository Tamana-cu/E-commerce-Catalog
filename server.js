const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce Catalog API Running");
});

app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {

  console.log("MongoDB Connected");

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });

})
.catch(err => {
  console.error("Database connection error:", err);
});