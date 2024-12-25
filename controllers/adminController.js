const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const cloudinary = require('../config/cloudinaryConfig');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid Username.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Password.' });
        }

        const token = generateToken(admin._id);
        res.json({
            message: 'Login successful.',
            token,
            role: 'admin',
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.', details: err.message });
    }
};

// Add a New Project
exports.addProject = async (req, res) => {
 try {   
    const { title, description, clientName, location, date, features, tags } = req.body;

    if (!title || !description /*|| !req.files || req.files.length === 0*/ || !clientName || !location || !date || !features || !tags) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Upload images to Cloudinary
    const uploadedImages = [];
    for (const file of req.files) {
        const { path, filename } = file;
        uploadedImages.push({ imageUrl: path, publicId: filename });
    }

    // save project details to database
    const newProject = new Project({
        title,
        description,
        images: uploadedImages,
        clientName,
        location,
        date,
        features,
        tags,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully.', project: newProject });
} catch (err) {
    res.status(500).json({ error: 'Error adding project.', details: err.message });
}
};



// Update an Existing Project
exports.updateProject = async (req, res) => {
    try {
        const { title, description, clientName, location, date, features, tags } = req.body;
        const projectId = req.params.id;

        // Find the project to update
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        // Update title and description if provided
        if (title) project.title = title;
        if (description) project.description = description;
        if (clientName) project.clientName = clientName;
        if (location) project.location = location;
        if (date) project.date = date;
        if (features) project.features = features;
        if (tags) project.tags = tags;

        // If new images are uploaded, replace the old ones
        if (req.files && req.files.length > 0) {
            // Delete existing images from Cloudinary
            for (const image of project.images) {
                await cloudinary.uploader.destroy(image.publicId);
            }

            // Upload new images to Cloudinary
            const uploadedImages = [];
            for (const file of req.files) {
                const { path, filename } = file;
                uploadedImages.push({ imageUrl: path, publicId: filename });
            }

            project.images = uploadedImages; // Replace images in the project
        }

        // Save the updated project to the database
        await project.save();
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

        // Delete images from Cloudinary
        for (const image of project.images) {
            await cloudinary.uploader.destroy(image.publicId);
        }

        // Remove project from database
        await Project.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Project deleted successfully.' });
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

// Fetch All Projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ projects });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching projects.', details: err.message });
    }
};
