const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', workoutController.createWorkout);
router.get('/', workoutController.getUserWorkouts);
router.get('/:id', workoutController.getWorkoutById);

module.exports = router;
