const Weight = require('../models/Weight');
const { getCoachResponse } = require('../services/aiService');
const recommendationService = require('../services/recommendationService');

// @desc    Chat with AI Coach
// @route   POST /api/ai/chat
// @access  Private
const chatWithCoach = async (req, res) => {
    try {
        const { message } = req.body;
        const user = req.user;

        console.log(`[AI Chat] Request from ${user.name}: "${message}"`);
        console.log(`[AI Chat] Context: Goal=${user.goal}, Weight=${user.weight}`);
        console.log(`[AI Chat] API Key Present: ${!!process.env.OPENAI_API_KEY}`);

        if (!message) {
            return res.status(400).json({ message: 'Please provide a message' });
        }

        // Fetch user context (recent weights)
        const weights = await Weight.find({ user: user._id })
            .sort({ timestamp: -1 })
            .limit(7);

        // Calculate weight change and period
        let weightChange = 0;
        let daysCount = 0;
        if (weights.length >= 2) {
            weightChange = parseFloat((weights[0].value - weights[weights.length - 1].value).toFixed(2));
            const diffTime = Math.abs(new Date(weights[0].timestamp) - new Date(weights[weights.length - 1].timestamp));
            daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        }

        const dietPlan = recommendationService.getDietPlan(user.goal, user.weight);
        const workoutPlan = recommendationService.getWorkoutPlan(user.goal);

        const context = {
            name: user.name,
            goal: user.goal,
            currentWeight: weights.length > 0 ? weights[0].value : user.weight,
            weightChange,
            daysCount,
            recentWeights: weights,
            dietPlan,
            workoutPlan
        };

        const responseText = await getCoachResponse(message, context);

        res.json({
            reply: responseText
        });

    } catch (error) {
        console.error('AI Controller Error:', error.stack);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { chatWithCoach };
