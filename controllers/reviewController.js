const Review = require('../models/Review');

// Fetch all reviews with pagination
exports.getAllReviews = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 reviews per page
        const reviews = await Review.find()
            .populate('projectId', 'title') // Include project title
            .populate('clientId', 'name')   // Include client name
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalReviews = await Review.countDocuments();

        res.status(200).json({
            success: true,
            reviews,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalReviews / limit),
                totalReviews,
            },
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching reviews.', details: err.message });
    }
};

// Fetch reviews by project with pagination
exports.getReviewsByProject = async (req, res) => {
    const { projectId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        const reviews = await Review.find({ projectId })
            .populate('clientId', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalReviews = await Review.countDocuments({ projectId });

        res.status(200).json({
            success: true,
            reviews,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalReviews / limit),
                totalReviews,
            },
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching reviews for the project.', details: err.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ error: 'Review not found.' });
        }

        await review.remove();
        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting review.', details: err.message });
    }
};

// Fetch all reviews (with optional project filter and pagination)
exports.getReviews = async (req, res) => {
    const { projectId } = req.query;
    const { page = 1, limit = 10 } = req.query;

    try {
        const filter = projectId ? { projectId } : {}; // Apply project filter if provided

        const reviews = await Review.find(filter)
            .populate('clientId', 'name')
            .populate('projectId', 'title')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalReviews = await Review.countDocuments(filter);

        res.status(200).json({
            success: true,
            reviews,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalReviews / limit),
                totalReviews,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error.message,
        });
    }
};
