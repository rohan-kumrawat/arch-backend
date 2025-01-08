// /config/multerConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'slider_images',        // Folder name in Cloudinary where images will be stored
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],  // Allowed formats
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
