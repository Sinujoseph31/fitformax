const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WorkoutPlan = require('../models/WorkoutPlan');
const DietPlan = require('../models/DietPlan');
const { protect } = require('../middleware/auth');

router.use(protect);

// Get my plans
router.get('/', async (req, res) => {
  try {
    const workouts = await WorkoutPlan.find({ user: req.user._id }).populate('user', 'name');
    const diets = await DietPlan.find({ user: req.user._id }).populate('user', 'name');
    res.json({ workouts, diets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Workout Plan
router.post('/workout', async (req, res) => {
  try {
    const plan = new WorkoutPlan({
      ...req.body,
      user: req.user._id,
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    });
    const saved = await plan.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create Diet Plan
router.post('/diet', async (req, res) => {
  try {
    const plan = new DietPlan({
      ...req.body,
      user: req.user._id,
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    });
    const saved = await plan.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Workout Plan
router.delete('/workout/:id', async (req, res) => {
  try {
    const plan = await WorkoutPlan.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Workout plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Diet Plan
router.delete('/diet/:id', async (req, res) => {
  try {
    const plan = await DietPlan.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Diet plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
