const express = require('express');
const router = express.Router();
const { chatWithCoach, generateWorkout, generateDiet, lookupFood } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/chat', protect, chatWithCoach);
router.post('/generate-workout', generateWorkout);
router.post('/generate-diet', generateDiet);
router.post('/food-lookup', protect, lookupFood);

module.exports = router;
