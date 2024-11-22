const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Project = require('../models/Project');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        res.json({
            token: generateToken(admin._id),
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add Project
exports.addProject = async (req, res) => {
    const { title, description, images } = req.body;

    try {
        const project = new Project({ title, description, images });
        await project.save();
        res.status(201).json({ message: 'Project added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete Project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        await project.remove();
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
