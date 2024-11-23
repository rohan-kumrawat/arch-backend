const Project = require('../models/Project'); // Project model import

// Fetch all projects (limited data)
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({}, 'title description images')
            .lean(); // Sirf title, description aur ek image chahiye

        // Send basic info with one image for each project
        const result = projects.map(project => ({
            _id: project._id,
            title: project.title,
            description: project.description,
            image: project.images[0], // First image only
        }));

        res.status(200).json({ success: true, projects: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching projects', error });
    }
};

// Fetch single project details
const getSingleProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id).lean();
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        res.status(200).json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching project details', error });
    }
};

module.exports = {
    getAllProjects,
    getSingleProject,
};
