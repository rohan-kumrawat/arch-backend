const cloudinary = require('../config/cloudinaryConfig');
const Slider = require('../models/Slider');

// Upload a new slider image
exports.uploadSliderImage = async (req, res) => {
    try {
        // Image details after uploading to Cloudinary
        const { path, filename } = req.file;

        // Save image URL and public_id in MongoDB
        const newSlider = new Slider({
            imageUrl: path, // Cloudinary URL
            publicId: filename, // Cloudinary public_id
        });

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

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(slider.publicId);

        // Remove from database
        await Slider.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Slider image deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting slider image.', details: err.message });
    }
};

