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
