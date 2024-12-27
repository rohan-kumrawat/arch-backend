const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            imageUrl: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true, // Cloudinary public_id for deletion
            },
        }
    ],
    clientName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date, // Use 'Date' for better date handling
        required: true,
    },
    features: {
        type: [String], // Corrected array of strings
        required: true,
    },
    tags: {
        type: [String], // Corrected array of strings
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', projectSchema);
