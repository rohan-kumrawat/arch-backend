const express = require('express');
const { loginAdmin, addProject, deleteProject } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', loginAdmin);
router.post('/project', protect, addProject);
router.delete('/project/:id', protect, deleteProject);

module.exports = router;
