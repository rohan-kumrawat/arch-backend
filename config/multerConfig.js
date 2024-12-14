const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'arch-images', // Change this to a folder name in your Cloudinary account
        allowed_formats: ['jpg', 'png', 'jpeg'], // Specify allowed image formats
    },
});

const upload = multer({ storage });

module.exports = upload;
