const Slider = require('../models/Slider');

// Upload a new slider image
exports.uploadSliderImage = async (req, res) => {
    const { imageUrl } = req.body;

    // Validate input
    if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required.' });
    }

    try {
        const newSlider = new Slider({ imageUrl });
        await newSlider.save();
        res.status(201).json({ message: 'Slider image uploaded successfully.', slider: newSlider });
    } catch (err) {
        res.status(500).json({ error: 'Error uploading slider image.', details: err.message });
    }
};

// Fetch all slider images
exports.getAllSliderImages = async (req, res) => {
    try {
        const sliders = await Slider.find().sort({ uploadedAt: -1 });
        res.status(200).json({ sliders });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching slider images.', details: err.message });
    }
};

// Delete a slider image
exports.deleteSliderImage = async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({ error: 'Slider image not found.' });
        }

        await slider.remove();
        res.status(200).json({ message: 'Slider image deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting slider image.', details: err.message });
    }
};
