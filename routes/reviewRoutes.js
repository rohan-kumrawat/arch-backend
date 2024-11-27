const express = require('express');
const { getAllReviews, getReviewsByProject, deleteReview, getReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin Routes
router.get('/', protect, getAllReviews); // Get all reviews (admin only)
router.get('/project/:projectId', protect, getReviewsByProject); // Get reviews by project (admin only)
router.delete('/:id', protect, deleteReview); // Delete a review (admin only)
router.get('/', getReviews);

module.exports = router;
