const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Client = require('../models/Client');
const Review = require('../models/Review');
const Project = require('../models/Project');

// Generate JWT
const generateToken = (id) => jwt.sign({ id, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Client Signup
exports.signupClient = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingClient = await Client.findOne({ email });
        if (existingClient) return res.status(400).json({ error: 'Client already exists' });

        const client = new Client({ name, email, password, phone });
        await client.save();

        res.status(201).json({ token: generateToken(client._id), client: { id: client._id, name } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Client Login
exports.loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await Client.findOne({ email });
        if (!client) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        res.json({ token: generateToken(client._id), client: { id: client._id, name: client.name, role: 'client' } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add Review
exports.addReview = async (req, res) => {
    const { projectId, rating, review } = req.body;
    const clientId = req.client.id;

    try {
        if (!rating || !review) return res.status(400).json({ message: 'Rating and review are required.' });

        const newReview = new Review({ projectId: projectId || null, clientId, rating, review });
        await newReview.save();

        res.status(201).json({ message: 'Review added successfully.', data: newReview });
    } catch (err) {
        res.status(500).json({ error: 'Error adding review.', details: err.message });
    }
};

// Update Review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, review } = req.body;
    const clientId = req.client.id;

    try {
        const existingReview = await Review.findOne({ _id: id, clientId });
        if (!existingReview) return res.status(404).json({ error: 'Review not found or not authorized' });

        existingReview.rating = rating || existingReview.rating;
        existingReview.review = review || existingReview.review;

        await existingReview.save();
        res.status(200).json({ message: 'Review updated successfully.', data: existingReview });
    } catch (err) {
        res.status(500).json({ error: 'Error updating review.', details: err.message });
    }
};

// Delete Review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    const clientId = req.client.id;

    try {
        const review = await Review.findOneAndDelete({ _id: id, clientId });
        if (!review) return res.status(404).json({ error: 'Review not found or not authorized' });

        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting review.', details: err.message });
    }
};
