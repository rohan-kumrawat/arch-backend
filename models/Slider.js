const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true, // Cloudinary public_id for deletion
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Slider', sliderSchema);


// ---Old Coding---
/* 
const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    cloudinaryId: { 
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Slider', sliderSchema);
*/