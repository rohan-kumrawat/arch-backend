const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// POST: Add new project
router.post('/', async (req, res) => {
    try {
        const { title, description, images } = req.body;

        if (!title || !description || !images || images.length === 0) {
            return res.status(400).json({ message: 'All fields are required, including at least one image.' });
        }

        const newProject = new Project({ title, description, images });
        await newProject.save();

        res.status(201).json({ message: 'Project added successfully.', data: newProject });
    } catch (error) {
        res.status(500).json({ message: 'Error adding project.', error: error.message });
    }
});

// GET: Fetch all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ data: projects });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects.', error: error.message });
    }
});

// DELETE: Remove a project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        await project.remove();
        res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project.', error: error.message });
    }
});

module.exports = router;
