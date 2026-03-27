const Composition = require('../models/Composition');
const User = require('../models/User');

// @desc    Add a new Body Composition Log
// @route   POST /api/composition
const addCompositionLog = async (req, res) => {
    try {
        const {
            entryMethod, imageUrl, weight, skeletalMuscle, bodyFatMass, 
            bodyFatPercent, bmi, waistHipRatio, waterRate, protein, 
            inorganicSalt, basalMetabolicRate, healthScore
        } = req.body;

        const newLog = await Composition.create({
            user: req.user._id,
            entryMethod: entryMethod || 'manual',
            imageUrl,
            weight, skeletalMuscle, bodyFatMass, bodyFatPercent, 
            bmi, waistHipRatio, waterRate, protein, inorganicSalt, 
            basalMetabolicRate, healthScore
        });

        // Optionally update the user's current weight and BMI if it's a manual/bca entry with those fields
        if (weight || bmi) {
            const user = await User.findById(req.user._id);
            if (weight) user.weight = weight;
            if (bmi) {
                user.bmi = bmi;
                if (bmi < 18.5) user.bmiCategory = 'Thin';
                else if (bmi >= 18.5 && bmi <= 25) user.bmiCategory = 'Normal';
                else if (bmi > 25 && bmi <= 30) user.bmiCategory = 'Overweight';
                else user.bmiCategory = 'Obese';
            }
            await user.save();
        }

        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all Composition Logs for a user
// @route   GET /api/composition
const getCompositionLogs = async (req, res) => {
    try {
        const logs = await Composition.find({ user: req.user._id }).sort({ date: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a Composition Log
// @route   DELETE /api/composition/:id
const deleteCompositionLog = async (req, res) => {
    try {
        const log = await Composition.findById(req.params.id);
        
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }

        // Check ownership
        if (log.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await log.deleteOne();
        res.json({ message: 'Log removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addCompositionLog, getCompositionLogs, deleteCompositionLog };
