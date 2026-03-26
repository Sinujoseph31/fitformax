const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.log('Key missing');
        return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        // Note: listModels is not on genAI directly in some versions, it's on a client.
        // But we can try the REST approach with the key again, more carefully.
        const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}

listModels();
