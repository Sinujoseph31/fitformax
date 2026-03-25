/**
 * AI Coaching Logic - Phase 5: Stability & Gemini Fallback
 * Primary: OpenRouter (GPT-3.5-turbo)
 * Fallback: Google Gemini (Direct API)
 */

/**
 * Call OpenRouter with GPT-3.5
 */
const callOpenRouter = async (prompt, message) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const baseURL = process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1";

    if (!apiKey) throw new Error('OpenRouter API Key missing');

    const response = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5000',
            'X-Title': 'FitformaX AI Coach'
        },
        body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 500
        })
    });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(`OpenRouter Error: ${errData.error?.message || response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
};

/**
 * Call Google Gemini Direct
 */
const callGemini = async (prompt, message) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('Gemini API Key missing');

    const baseURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `${prompt}\n\nUser Message: ${message}` }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500
            }
        })
    });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(`Gemini Error: ${errData.error?.message || response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
};

/**
 * Main Coach Entrance with Fallback Logic
 */
const getCoachResponse = async (message, context) => {
    const { 
        name, 
        goal, 
        currentWeight, 
        weightChange, 
        daysCount, 
        recentWeights,
        dietPlan,
        workoutPlan
    } = context;

    const weightHistoryStr = recentWeights.map(w => `${new Date(w.timestamp).toLocaleDateString()}: ${w.value}kg`).join(', ');

    const systemPrompt = `You are the FitformaX AI Coach. Your tone is supportive, firm, and professional. 
    
User: ${name || 'User'} | Goal: ${goal}
Current Weight: ${currentWeight} kg (${weightChange} kg change over ${daysCount} days)
Weight History: ${weightHistoryStr}

RESOURCES:
- Diet: ${JSON.stringify(dietPlan)}
- Workout: ${workoutPlan.focus}

RULES:
1. Provide short, actionable coaching (2-3 paragraphs).
2. Use Indian dietary context.
3. End with a "Coach Tip" unique to their progress.
4. If weight change is positive for Muscle Gain, celebrate. If negative for Fat Loss, praise consistency.`;

    try {
        console.log('[AI Service] Attempting OpenRouter (GPT-3.5)...');
        return await callOpenRouter(systemPrompt, message);
    } catch (orError) {
        console.error('[AI Service] OpenRouter Failed:', orError.message);
        
        try {
            if (process.env.GEMINI_API_KEY) {
                console.log('[AI Service] Attempting Gemini Fallback...');
                return await callGemini(systemPrompt, message);
            } else {
                throw new Error('Gemini API Key not configured for fallback.');
            }
        } catch (gemError) {
            console.error('[AI Service] Gemini Fallback Failed:', gemError.message);
            throw new Error("I'm having trouble connecting to my coaching brain. Please check your API keys or try again later!");
        }
    }
};

module.exports = { getCoachResponse };
