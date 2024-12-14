const express = require('express');
const { uploadSliderImage, getAllSliderImages, deleteSliderImage } = require('../controllers/sliderController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();

//multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/', protect, upload.single('image'), uploadSliderImage); // Protected
router.get('/', getAllSliderImages);          // Public
router.delete('/:id', protect, deleteSliderImage); // Protected

module.exports = router;
