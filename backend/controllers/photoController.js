const Photo = require('../models/Photo');

// @desc    Upload new progress photo
// @route   POST /api/photos
const uploadPhoto = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const photo = await Photo.create({
            user: req.user._id,
            url: req.file.path,
            public_id: req.file.filename
        });

        res.status(201).json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user photo gallery
// @route   GET /api/photos
const getUserPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({ user: req.user._id }).sort({ timestamp: -1 });
        res.json(photos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadPhoto, getUserPhotos };
