const { getCoachResponse } = require('./services/aiService');
require('dotenv').config();

async function testOutput() {
    const context = {
        name: 'Sinu',
        goal: 'Muscle Gain',
        currentWeight: 75,
        weightChange: 2,
        daysCount: 30,
        recentWeights: [{ timestamp: new Date(), value: 75 }],
        dietPlan: { meals: [] },
        workoutPlan: { focus: 'Strength' }
    };

    try {
        console.log('--- TESTING DIRECT GEMINI OUTPUT ---');
        console.log('Key:', process.env.GEMINI_API_KEY ? 'Present' : 'MISSING');
        const reply = await getCoachResponse('Hello Coach', context);
        console.log('\nAI REPLY:\n');
        console.log(reply);
        console.log('\n--- TEST COMPLETE ---');
    } catch (err) {
        console.error('TEST FAILED:', err.message);
    }
}

testOutput();
