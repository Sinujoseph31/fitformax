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

// @desc    Generate Workout with AI Engine
// @route   POST /api/ai/generate-workout
// @access  Public
const generateWorkout = async (req, res) => {
    try {
        const { getGeneratedWorkoutPlan } = require('../services/aiService');
        const { level, days, goal, equipment, focusAreas, customPrompt } = req.body;
        
        console.log(`[AI Generator] Building ${days}-day ${level} ${goal} protocol.`);
        
        const generatedPlanJSONStr = await getGeneratedWorkoutPlan({
            level, days, goal, equipment, focusAreas, customPrompt
        });
        
        // Parse the generated text as JSON
        let plan;
        try {
           const cleanedJSON = generatedPlanJSONStr.replace(/```json/gi, '').replace(/```/g, '').trim();
           plan = JSON.parse(cleanedJSON);
        } catch (parseError) {
           console.error('[AI Generator] JSON Parse Error. Raw string:', generatedPlanJSONStr);
           return res.status(500).json({ message: 'AI returned invalid workout formatting.' });
        }

        res.json(plan);

    } catch (error) {
        console.error('AI Generator Error:', error.stack);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Generate Diet with AI Engine
// @route   POST /api/ai/generate-diet
// @access  Public
const generateDiet = async (req, res) => {
    try {
        const { getGeneratedDietPlan } = require('../services/aiService');
        const { calories, goal, category, intensity, workoutTime, supplements, customPrompt } = req.body;
        
        console.log(`[AI Generator] Building ${calories}kcal ${category} ${goal} diet plan.`);
        
        const generatedPlanJSONStr = await getGeneratedDietPlan({
            calories, goal, category, intensity, workoutTime, supplements, customPrompt
        });
        
        // Parse the generated text as JSON
        let plan;
        try {
           const cleanedJSON = generatedPlanJSONStr.replace(/```json/gi, '').replace(/```/g, '').trim();
           plan = JSON.parse(cleanedJSON);
        } catch (parseError) {
           console.error('[AI Generator] JSON Parse Error. Raw string:', generatedPlanJSONStr);
           return res.status(500).json({ message: 'AI returned invalid diet formatting.' });
        }

        res.json(plan);

    } catch (error) {
        console.error('AI Diet Generator Error:', error.stack);
        res.status(500).json({ message: error.message });
    }
};

const lookupFood = async (req, res) => {
    try {
        const { getFoodNutrition } = require('../services/aiService');
        const { query } = req.body;
        
        console.log(`[AI Food Lookup] Request for: "${query}" from User: ${req.user?._id || 'Unknown'}`);

        if (!query) return res.status(400).json({ message: 'No search term provided' });

        const jsonStr = await getFoodNutrition(query);
        
        let data;
        try {
            const cleaned = jsonStr.replace(/```json/gi, '').replace(/```/g, '').trim();
            data = JSON.parse(cleaned);
        } catch (e) {
            console.error('[Food Lookup] JSON parse error:', e.message, '| Raw:', jsonStr?.slice(0, 200));
            return res.status(500).json({ message: 'Internal AI parsing error' });
        }

        // Normalize: handle both single object and array
        const normalize = (item) => ({
            name: item.name || query,
            // Handle all common AI field name variations
            calories: Number(item.calories ?? item.energy ?? item.kcal ?? item.cal ?? item.energy_kcal ?? 0),
            protein:  Number(item.protein ?? item.proteins ?? item.protein_g ?? 0),
            carbs:    Number(item.carbs ?? item.carbohydrates ?? item.carbohydrate ?? item.cho ?? item.carb ?? 0),
            fat:      Number(item.fat ?? item.fats ?? item.lipids ?? item.total_fat ?? item.fat_g ?? 0),
        });

        const result = Array.isArray(data) ? data.map(normalize) : normalize(data);

        console.log(`[AI Food Lookup] Result:`, JSON.stringify(result).slice(0, 150));
        res.json(result);
    } catch (error) {
        console.error('[Food Lookup] Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { chatWithCoach, generateWorkout, generateDiet, lookupFood };
