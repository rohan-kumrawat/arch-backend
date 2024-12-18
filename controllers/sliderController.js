const cloudinary = require('../utils/cloudinary');
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





//----Old Code----

/*const Slider = require('../models/Slider');
const cloudinary = require('cloudinary').v2;

//Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Upload a new slider image
exports.uploadSliderImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'sliders'
        });

        // Save the image details in the database
        const newSlider = new Slider({ imageUrl: result.secure_url, cloudinaryId: result.public_id });
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

        // Extract public_id from the stored image URL
        const publicId = slider.imageUrl.split('/').pop().split('.')[0]; // Adjust to extract Cloudinary public_id

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Remove from database
        await Slider.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Slider image deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting slider image.', details: err.message });
    }
};

*/