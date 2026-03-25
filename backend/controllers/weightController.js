const Weight = require('../models/Weight');

// @desc    Add new weight entry
// @route   POST /api/weight
const addWeight = async (req, res) => {
    const { value } = req.body;
    try {
        const weight = await Weight.create({
            user: req.user._id,
            value
        });
        res.status(201).json(weight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get weight history for user
// @route   GET /api/weight
const getWeightHistory = async (req, res) => {
    try {
        const weights = await Weight.find({ user: req.user._id }).sort({ timestamp: -1 });
        res.json(weights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addWeight, getWeightHistory };
