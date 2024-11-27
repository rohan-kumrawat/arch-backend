const express = require('express');
const { loginAdmin, addProject, getAllProjects, deleteProject, getAdminProject, updateProject } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', loginAdmin);
router.post('/project', protect, addProject);   // Protected
router.put('/project/:id', protect, updateProject); // Protected
router.delete('/project/:id', protect, deleteProject); // Protected
router.get('/project/:id', protect, getAdminProject); // Protected
router.get('/all-projects', protect, getAllProjects);

module.exports = router;
