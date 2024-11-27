// routes/clientRoutes.js
const express = require('express');
const { signupClient, loginClient, addReview, updateReview, deleteReview } = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signupClient); // Client signup
router.post('/login', loginClient);   // Client login

// Review routes (protected)
router.post('/review', protect, addReview);
router.put('/review/:id', protect, updateReview);
router.delete('/review/:id', protect, deleteReview);

module.exports = router;
