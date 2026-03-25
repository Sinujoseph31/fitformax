const express = require('express');
const { uploadPhoto, getUserPhotos } = require('../controllers/photoController');
const { protect } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');
const router = express.Router();

router.use(protect);

router.post('/', upload.single('image'), uploadPhoto);
router.get('/', getUserPhotos);

module.exports = router;
