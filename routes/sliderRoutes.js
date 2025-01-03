const express = require('express');
const { uploadSliderImage, getAllSliderImages, deleteSliderImage } = require('../controllers/sliderController');
const upload = require('../config/multerConfig');
const router = express.Router();

router.post('/', upload.single('image'), uploadSliderImage); // Image upload
router.get('/', getAllSliderImages);                         // Get all slider images
router.delete('/:id', deleteSliderImage);                    // Delete slider image

module.exports = router;
