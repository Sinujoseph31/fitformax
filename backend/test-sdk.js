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
        console.log('--- TESTING GEMINI SDK OUTPUT ---');
        const reply = await getCoachResponse('Give me a 1-sentence fitness tip', context);
        console.log('\nAI REPLY:\n');
        console.log(reply);
        console.log('\n--- TEST COMPLETE ---');
    } catch (err) {
        console.error('TEST FAILED:', err.message);
    }
}

testOutput();
