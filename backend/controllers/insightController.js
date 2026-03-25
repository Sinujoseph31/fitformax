const Weight = require('../models/Weight');
const recommendationService = require('../services/recommendationService');

// @desc    Get AI recommendation
// @route   GET /api/insights/recommendation
const getRecommendation = async (req, res) => {
    try {
        const goal = req.user.goal;
        const weights = await Weight.find({ user: req.user._id }).sort({ timestamp: -1 }).limit(7);
        
        if (weights.length < 3) {
            return res.json({ 
                status: 'Getting Started',
                message: "You're just getting started. Add at least 3 weight entries to unlock insights.",
                trend: 'stable',
                diff: 0,
                action: 'Log your weight daily',
                timeframe: 'today',
                currentCount: weights.length,
                isStarted: true
            });
        }

        const trendData = recommendationService.calculateTrend(weights, goal);
        
        if (trendData.timeframe.includes('day') && parseInt(trendData.timeframe) < 3) {
            const isMilestone = weights.length === 3;
            return res.json({ 
                status: 'Getting Started',
                message: isMilestone ? "Nice work — you've unlocked your first insights." : "You're just getting started. AI insights unlock after 3 days of tracking.",
                trend: 'stable',
                diff: 0,
                action: 'Log your weight daily',
                timeframe: 'today',
                currentCount: weights.length,
                isStarted: true,
                isMilestone
            });
        }

        res.json({
            ...trendData,
            current: weights[0].value,
            oldest: weights[weights.length - 1].value,
            entriesAnalyzed: weights.length,
            isStarted: false
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Diet Plan (Indian context, personalized)
// @route   GET /api/insights/diet
const getDietPlan = (req, res) => {
    const { goal, weight } = req.user;
    const plan = recommendationService.getDietPlan(goal, weight);
    res.json(plan);
};

// @desc    Get Workout Plan (Randomized variation)
// @route   GET /api/insights/workout
const getWorkoutPlan = (req, res) => {
    const goal = req.user.goal;
    const plan = recommendationService.getWorkoutPlan(goal);
    res.json(plan);
};

module.exports = { getRecommendation, getDietPlan, getWorkoutPlan };
