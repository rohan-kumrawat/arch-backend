const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');

// POST: Upload new slider image
router.post('/', async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: 'Image URL is required.' });
        }

        const newSliderImage = new Slider({ imageUrl });
        await newSliderImage.save();

        res.status(201).json({ message: 'Slider image uploaded successfully.', data: newSliderImage });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading slider image.', error: error.message });
    }
});

// GET: Fetch all slider images
router.get('/', async (req, res) => {
    try {
        const sliderImages = await Slider.find().sort({ uploadedAt: -1 });
        res.status(200).json({ data: sliderImages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching slider images.', error: error.message });
    }
});

// DELETE: Remove a slider image
router.delete('/:id', async (req, res) => {
    try {
        const sliderImage = await Slider.findById(req.params.id);

        if (!sliderImage) {
            return res.status(404).json({ message: 'Slider image not found.' });
        }

        await sliderImage.remove();
        res.status(200).json({ message: 'Slider image deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting slider image.', error: error.message });
    }
});

module.exports = router;
