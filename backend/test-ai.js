require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAI() {
    console.log('Testing AI Configuration...\n');
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
        console.log('\n--- Listing Gemini Models ---');
        try {
            const genAI = new GoogleGenerativeAI(geminiKey);
            // The SDK doesn't have a direct listModels, but we can try to get a model and see the error or use the discovery API
            // Actually, let's just try 'gemini-pro' (the older name) just in case.
            const modelNames = ['gemini-1.5-flash', 'gemini-1.0-pro', 'gemini-pro'];
            
            for (const name of modelNames) {
                try {
                    console.log(`Trying ${name}...`);
                    const model = genAI.getGenerativeModel({ model: name });
                    const result = await model.generateContent('Hi');
                    console.log(`${name} Success:`, result.response.text());
                    break;
                } catch (e) {
                    console.log(`${name} Failed:`, e.message);
                }
            }
        } catch (err) {
            console.error('List Failed:', err.message);
        }
    }
}

testAI();
