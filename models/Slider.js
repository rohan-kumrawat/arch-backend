// /models/sliderModel.js
const mongoose = require('mongoose');

// Slider schema
const sliderSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
