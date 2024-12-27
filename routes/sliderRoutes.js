const express = require('express');
const { uploadSliderImage, getAllSliderImages, deleteSliderImage } = require('../controllers/sliderController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');
const router = express.Router();

router.post('/', protect, upload.single('image'), uploadSliderImage); // Protected
router.get('/', getAllSliderImages);                                  // Public
router.delete('/:id', protect, deleteSliderImage);                    // Protected

module.exports = router;

