const fs = require('fs');
const path = require('path');

const logPath = path.join(process.cwd(), 'ai-debug.log');
const logData = (data) => {
    try {
        fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${data}\n`);
    } catch (e) {
        console.error('Logging failed:', e.message);
    }
};

// STATIC FALLBACK DATABASE (VITAL FOR COMMON ITEMS)
const STATIC_FOODS = {
    "pazham pori": { name: "Pazham Pori (Banana Fritter)", calories: 242, protein: 3, carbs: 32, fat: 12 },
    "gulab jam": { name: "Gulab Jamun", calories: 300, protein: 4, carbs: 45, fat: 12 },
    "idli": { name: "Idli", calories: 39, protein: 2, carbs: 8, fat: 0 },
    "dosa": { name: "Dosa", calories: 133, protein: 3, carbs: 25, fat: 2 },
    "vada": { name: "Medu Vada", calories: 97, protein: 2, carbs: 9, fat: 6 },
    "samosa": { name: "Samosa", calories: 262, protein: 4, carbs: 24, fat: 17 },
    "paratha": { name: "Aloo Paratha", calories: 290, protein: 6, carbs: 42, fat: 11 },
    "biryani": { name: "Chicken Biryani", calories: 290, protein: 12, carbs: 36, fat: 11 },
    "mutton curry": { name: "Mutton Curry", calories: 220, protein: 14, carbs: 4, fat: 16 }
};

const getFoodNutrition = async (query) => {
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENAI_API_KEY;
    const q = query.toLowerCase().trim();

    logData(`[FoodLookup] SEARCH: "${q}"`);

    // --- PHASE 1: STATIC MATCH ---
    const staticMatch = Object.keys(STATIC_FOODS).find(k => q.includes(k) || k.includes(q));
    if (staticMatch) {
        logData(`[FoodLookup] SUCCESS (Static Match: ${staticMatch})`);
        return JSON.stringify(STATIC_FOODS[staticMatch]);
    }

    const systemPrompt = `You are a nutrition database. Provide nutritional data for 100g of: "${query}".
Return ONLY a raw JSON object:
{
  "name": "${query}",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number
}
Output ONLY JSON. No explanation.`;

    // --- PHASE 2: GEMINI ---
    if (geminiKey) {
        logData('[FoodLookup] Trying Gemini 1.5-Flash (v1)...');
        try {
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }],
                    generationConfig: { temperature: 0.1 }
                })
            });
            const data = await response.json();
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (response.ok && rawText) {
                logData('[FoodLookup] SUCCESS (Gemini)');
                return rawText;
            } else {
                logData(`[FoodLookup] Gemini Error Code: ${response.status} - ${JSON.stringify(data.error || data)}`);
            }
        } catch (err) {
            logData(`[FoodLookup] Gemini Network Error: ${err.message}`);
        }
    }

    // --- PHASE 3: OPENROUTER ---
    if (openRouterKey) {
        const model = "google/gemma-2-9b-it:free";
        logData(`[FoodLookup] Trying OpenRouter (${model})...`);
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${openRouterKey}`,
                    'Content-Type': 'application/json',
                    'X-Title': 'FitformaX'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: 'user', content: systemPrompt }],
                    temperature: 0.1
                })
            });
            const data = await response.json();
            const rawText = data.choices?.[0]?.message?.content;
            if (response.ok && rawText) {
                logData('[FoodLookup] SUCCESS (OpenRouter)');
                return rawText;
            } else {
                logData(`[FoodLookup] OpenRouter Error: ${JSON.stringify(data.error || data)}`);
            }
        } catch (err) {
            logData(`[FoodLookup] OpenRouter Network Error: ${err.message}`);
        }
    }

    logData('[FoodLookup] ALL ATTEMPTS FAILED.');
    return JSON.stringify({ name: query, calories: 0, protein: 0, carbs: 0, fat: 0 });
};

const getCoachResponse = async (chatMessages, userContext) => {
    const geminiKey = process.env.GEMINI_API_KEY;
    const prompt = `You are FitformaX AI Coach. Context: ${JSON.stringify(userContext)}. Current conversation: ${JSON.stringify(chatMessages)}`;
    if (geminiKey) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "Coach unavailable.";
        } catch (err) { return "Coach connection error."; }
    }
    return "AI unavailable.";
};

const getGeneratedWorkoutPlan = async (userProfile) => { return null; };
const getGeneratedDietPlan = async (userProfile) => { return null; };

module.exports = { getCoachResponse, getGeneratedWorkoutPlan, getGeneratedDietPlan, getFoodNutrition };
