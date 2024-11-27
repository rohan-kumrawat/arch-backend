const express = require('express');
const { uploadSliderImage, getAllSliderImages, deleteSliderImage } = require('../controllers/sliderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, uploadSliderImage); // Protected
router.get('/', getAllSliderImages);          // Public
router.delete('/:id', protect, deleteSliderImage); // Protected

module.exports = router;
