// controllers/publicController.js
const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ data: projects });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching projects.', details: error.message });
    }
};

// Get single project
exports.getSingleProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }
        res.status(200).json({ data: project });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching project.', details: error.message });
    }
};
