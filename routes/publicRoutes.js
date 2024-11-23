const express = require('express');
const router = express.Router();
const { getAllProjects, getSingleProject } = require('../controllers/publicController');

// Route for fetching all projects
router.get('/all-projects', getAllProjects);

// Route for fetching single project details
router.get('/project/:id', getSingleProject);

module.exports = router;
