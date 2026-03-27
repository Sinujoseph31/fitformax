const fs = require('fs');
const path = require('path');

/**
 * FitformaX AI Coaching Logic
 * Simplified & Robust: Direct fetch-based Gemini integration (bypassing SDK quirks)
 * Fallback: OpenRouter (Mistral 7B)
 */
const getCoachResponse = async (message, context) => {
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENAI_API_KEY;
    const openRouterBaseURL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';
    
    // Create a diagnostic log path (accessible to the agent)
    const logPath = path.join(process.cwd(), 'ai-debug.log');
    const logData = (data) => fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${data}\n`);

    const { 
        name, goal, currentWeight, weightChange, daysCount, recentWeights, dietPlan, workoutPlan
    } = context;

    logData(`Starting AI request for: ${name}. GeminiKey: ${!!geminiKey}, ORKey: ${!!openRouterKey}`);

    // OPTIMIZATION: Context Truncation
    const weightHistoryStr = (recentWeights || []).slice(-5).map(w => `${new Date(w.timestamp).toLocaleDateString()}: ${w.value}kg`).join(', ');
    const dietSummary = dietPlan && dietPlan.meals ? `Logged ${dietPlan.meals.length} meals today` : 'No meals logged yet';

    const systemPrompt = `You are the FitformaX AI Coach. Tone: supportive, firm, professional.
User: ${name || 'Enthusiast'} | Goal: ${goal} | Weight: ${currentWeight}kg.
Recent Weights: ${weightHistoryStr}.
RESOURCES: Diet=${dietSummary}, Workout=${workoutPlan?.focus || 'General'}.
RULES: 
- 2 short paragraphs max. 
- Use Indian dietary references.
- End with a unique "Coach Tip".`;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${message}`;

    // --- STEP 1: Attempt Gemini (Direct API Fetch - Most Robust) ---
    if (geminiKey) {
        logData('Attempting Gemini 1.5 Flash...');
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }],
                    generationConfig: {
                        maxOutputTokens: 350,
                        temperature: 0.7
                    }
                })
            });

            const data = await response.json();
            if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                logData('Gemini Success!');
                return data.candidates[0].content.parts[0].text;
            } else {
                logData(`Gemini API Error: ${JSON.stringify(data)}`);
            }
        } catch (err) {
            logData(`Gemini Network Failure: ${err.message}`);
        }
    }

    // --- STEP 2: Final Fallback to OpenRouter ---
    if (openRouterKey) {
        logData('Attempting OpenRouter Fallback...');
        try {
            const response = await fetch(`${openRouterBaseURL}/chat/completions`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${openRouterKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://fitformax.app',
                    'X-Title': 'FitformaX'
                },
                body: JSON.stringify({
                    model: 'mistralai/mistral-7b-instruct-v0.1',
                    messages: [{ role: 'user', content: fullPrompt }],
                    max_tokens: 350
                })
            });

            const data = await response.json();
            if (response.ok && data.choices && data.choices[0]) {
                logData('OpenRouter Success!');
                return data.choices[0].message.content;
            } else {
                logData(`OpenRouter API Error: ${JSON.stringify(data)}`);
            }
        } catch (err) {
            logData(`OpenRouter Network Failure: ${err.message}`);
        }
    }

    // --- STEP 3: Fallback Mock response (to prevent white error screens for user) ---
    logData('FATAL: Both providers failed.');
    return `${name || 'Friend'}, I'm currently having a small technical glitch with my satellite connection. Keep crushing your ${goal} goals and check back in a few minutes! Coach Tip: Consistency is better than intensity.`;
};

module.exports = { getCoachResponse };
