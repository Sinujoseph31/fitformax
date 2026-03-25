const express = require('express');
const router = express.Router();
const { chatWithCoach } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/chat', protect, chatWithCoach);

module.exports = router;
