const fetch = require('node-fetch');
require('dotenv').config();

async function findWorkingModel() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.log('Key missing');
        return;
    }

    try {
        console.log('--- Fetching Model List ---');
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const listData = await listRes.json();
        
        if (!listData.models) {
            console.log('No models found in list:', listData);
            return;
        }

        const models = listData.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
        console.log(`Found ${models.length} models supporting generateContent.`);

        for (const m of models) {
            console.log(`\nTesting ${m.name}...`);
            const url = `https://generativelanguage.googleapis.com/v1beta/${m.name}:generateContent?key=${apiKey}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: 'say hi' }] }] })
            });

            if (res.ok) {
                const data = await res.json();
                console.log(`✅ SUCCESS: ${m.name} works!`);
                console.log('AI Response:', data.candidates[0].content.parts[0].text);
                return;
            } else {
                const err = await res.json();
                console.log(`❌ FAILED: ${m.name} - ${err.error?.message || res.statusText}`);
            }
        }
    } catch (e) {
        console.error('Diagnostic error:', e);
    }
}

findWorkingModel();
