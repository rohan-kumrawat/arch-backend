const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'arch-images', // Cloudinary folder name
        allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
    },
});

const upload = multer({ storage });

module.exports = upload;
