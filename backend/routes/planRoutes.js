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

// Update Workout Plan
router.patch('/workout/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Always reset status to pending on update unless admin
    if (req.user.role !== 'admin') {
      updateData.status = 'pending';
    }

    const plan = await WorkoutPlan.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true }
    );
    
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Diet Plan
router.patch('/diet/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.user.role !== 'admin') {
      updateData.status = 'pending';
    }

    const plan = await DietPlan.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true }
    );

    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
