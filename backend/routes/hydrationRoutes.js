const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Hydration = require('../models/Hydration');

// @desc    Get today's hydration
// @route   GET /api/hydration/today
// @access  Private
router.get('/today', protect, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    let log = await Hydration.findOne({ user: req.user._id, date: today });
    if (!log) {
      log = await Hydration.create({ user: req.user._id, date: today, amount: 0 });
    }
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Update hydration (Upsert)
// @route   POST /api/hydration
// @access  Private
router.post('/', protect, async (req, res) => {
  const { amount } = req.body;
  const today = new Date().toISOString().slice(0, 10);
  
  try {
    const log = await Hydration.findOneAndUpdate(
      { user: req.user._id, date: today },
      { $inc: { amount: amount } },
      { new: true, upsert: true }
    );
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get hydration history
// @route   GET /api/hydration/history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const logs = await Hydration.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30); // Last 30 days
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
