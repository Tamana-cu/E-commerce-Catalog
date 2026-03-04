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

/* Updated MongoDB connection */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected");

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port " + (process.env.PORT || 5000));
  });

})
.catch(err => {
  console.log("Database connection error:", err);
});