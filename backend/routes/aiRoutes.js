const express = require('express');
const router = express.Router();
const { chatWithCoach, generateWorkout, generateDiet } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/chat', protect, chatWithCoach);
router.post('/generate-workout', generateWorkout); // Unprotected for easy access in our demo
router.post('/generate-diet', generateDiet); // Unprotected for easy access in our demo

module.exports = router;
