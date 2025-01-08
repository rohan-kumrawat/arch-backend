// /controllers/sliderController.js
const Slider = require('../models/Slider');

// Slider image upload API
const uploadSliderImage = async (req, res) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Save image details in DB
    const newSlider = new Slider({
      imageUrl: req.file.path, // Cloudinary URL
      caption: req.body.caption, // Caption provided in the request
    });

    await newSlider.save();

    res.status(201).json({
      message: 'Slider image uploaded successfully!',
      data: newSlider
    });
  } catch (error) {
    console.error('Error uploading slider image:', error);
    res.status(500).json({ error: 'Failed to upload slider image' });
  }
};

module.exports = { uploadSliderImage };
