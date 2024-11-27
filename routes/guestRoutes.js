// routes/guestRoutes.js
const express = require('express');
const { getAllProjects, getSingleProject } = require('../controllers/publicController');
const { submitMessage } = require('../controllers/messageController');
const router = express.Router();

// Publicly accessible routes
router.get('/projects', getAllProjects);            // Get all projects
router.get('/projects/:id', getSingleProject);      // Get single project by ID

// Submit a message
router.post('/message', submitMessage);

module.exports = router;
