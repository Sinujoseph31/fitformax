const express = require('express');
const router = express.Router();
const { registerToken } = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

router.post('/register', protect, registerToken);

module.exports = router;
