// /routes/sliderRoutes.js
const express = require('express');
const router = express.Router();
const { uploadSliderImage } = require('../controllers/sliderController');
const upload = require('../config/multerConfig'); // Import multer config for file upload

// Slider image upload route
router.post('/upload', upload.single('image'), uploadSliderImage);

module.exports = router;
