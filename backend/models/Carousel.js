// CarouselModel.js

const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: Number,
  description: String,
  image: String,
  stocks: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Carousel = mongoose.model("Carousel", CarouselSchema);

module.exports = Carousel;
