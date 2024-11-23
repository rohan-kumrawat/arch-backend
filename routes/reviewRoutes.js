const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

// POST: Add review
router.post('/', protect, async (req, res) => {
    try {
        const { projectId, rating, review } = req.body;

        if (!rating || !review) {
            return res.status(400).json({ message: 'Rating and review are required.' });
        }

        // If projectId is provided, check if it exists, else set to null
        let project;
        if (projectId) {
            project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ message: 'Project not found.' });
            }
        }

        const newReview = new Review({
            projectId: project ? project._id : null, // If no projectId, set to null
            clientId: req.client._id,
            rating,
            review,
        });

        await newReview.save();

        res.status(201).json({ message: 'Review added successfully.', data: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review.', error: error.message });
    }
});

module.exports = router;
