const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');

// Test upload
router.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(200).json({
            message: 'Image uploaded successfully.',
            imageUrl: req.file.path,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload image.' });
    }
});

module.exports = router;
