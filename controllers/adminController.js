const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Project = require('../models/Project');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

// Admin Login with structured error handling
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = generateToken(admin._id);
        res.json({
            message: 'Login successful.',
            token,
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.', details: err.message });
    }
};

// Add a New Project
exports.addProject = async (req, res) => {
    const { title, description, images } = req.body;

    // Validate input
    if (!title || !description || !images || images.length === 0) {
        return res.status(400).json({ error: 'All fields are required, including at least one image.' });
    }

    try {
        const project = new Project({ title, description, images });
        await project.save();
        res.status(201).json({ message: 'Project added successfully.', project });
    } catch (err) {
        res.status(500).json({ error: 'Error adding project.', details: err.message });
    }
};

// Update an Existing Project
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, images } = req.body;

    if (!title || !description || !images || images.length === 0) {
        return res.status(400).json({ error: 'All fields are required, including at least one image.' });
    }

    try {
        const project = await Project.findByIdAndUpdate(
            id,
            { title, description, images },
            { new: true } // Return updated project
        );

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        res.status(200).json({ message: 'Project updated successfully.', project });
    } catch (err) {
        res.status(500).json({ error: 'Error updating project.', details: err.message });
    }
};

// Delete a Project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        await project.remove();
        res.json({ message: 'Project deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting project.', details: err.message });
    }
};

// Fetch a Specific Project (Admin Only)
exports.getAdminProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        res.status(200).json({ project });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching project.', details: err.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json({ projects });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching projects.', details: err.message });
    }
};
