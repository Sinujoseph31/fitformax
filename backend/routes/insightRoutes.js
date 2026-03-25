const express = require('express');
const { getRecommendation, getDietPlan, getWorkoutPlan } = require('../controllers/insightController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/recommendations', getRecommendation);
router.get('/diet', getDietPlan);
router.get('/workout', getWorkoutPlan);

module.exports = router;
