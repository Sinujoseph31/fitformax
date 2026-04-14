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
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
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

const getGeneratedWorkoutPlan = async ({ level, days, goal, equipment, focusAreas, customPrompt }) => {
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENAI_API_KEY;
    const openRouterBaseURL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';

    const activeFocuses = Object.keys(focusAreas || {}).filter(k => focusAreas[k]).join(', ');
    
    const systemPrompt = `You are FitformaX's Master Architect AI. 
Generate a complete, valid JSON workout plan. NO MARKDOWN TEXT EXCEPT THE JSON.

PARAMETERS:
- Level: ${level}
- Days Per Week: ${days}
- Primary Goal: ${goal}
- Equipment: ${equipment}
- Over-Indexing Muscle Groups: ${activeFocuses ? activeFocuses : 'None'}
- Custom Directives: ${customPrompt ? customPrompt : 'None'}

EXACT JSON SCHEMA REQUIRED:
{
  "id": "ai_gen_[random_numbers]",
  "name": "[Creative Title, e.g., 'Spartan Mass Protocol']",
  "category": "AI Generated",
  "desc": "[Short 2-sentence description summarizing the protocol]",
  "difficulty": "${level}",
  "duration": "45-60 min",
  "tags": ["AI Generated", "${goal}"],
  "schedule": [
    {
      "day": "Monday",
      "focus": "[e.g., Heavy Chest & Tris]",
      "exercises": [
        { "id": "[use exact valid IDs from standard list, e.g., 'chest_press_bb_flat', 'squat_bb_back', 'pull_up']", "sets": 4, "reps": "8-12" }
      ]
    }
  ]
}

Ensure "schedule" array length matches "${days}" days exactly, plus optional Rest days if you wish, but the total active days must be ${days}. Do NOT include Markdown formatting like \`\`\`json. Only output raw JSON object.`;

    if (geminiKey) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 2000
                    }
                })
            });

            const data = await response.json();
            if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (err) {
            console.error('Gemini Workout Gen Failure:', err);
        }
    }

    if (openRouterKey) {
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
                    messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: 'Generate JSON workout plan' }],
                    temperature: 0.8,
                    max_tokens: 2000
                })
            });

            const data = await response.json();
            if (response.ok && data.choices && data.choices[0]) {
                return data.choices[0].message.content;
            }
        } catch (err) {
            console.error('OpenRouter Workout Gen Failure:', err);
        }
    }

    throw new Error("All AI Providers failed to generate a workout plan.");
}

const getGeneratedDietPlan = async ({ calories, goal, category, intensity, workoutTime, supplements, customPrompt }) => {
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENAI_API_KEY;
    const openRouterBaseURL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';

    const activeSupps = Object.keys(supplements || {}).filter(k => supplements[k]).join(', ');
    
    const systemPrompt = `You are FitformaX's Master Nutritionist AI. 
Generate a complete, valid JSON meal plan. NO MARKDOWN TEXT EXCEPT THE JSON.

PARAMETERS:
- Target Calories: ${calories} kcal
- Primary Goal: ${goal}
- Diet Category: ${category}
- Activity Intensity: ${intensity}
- Workout Timing: ${workoutTime}
- Supplements to Include: ${activeSupps ? activeSupps : 'None'}
- Custom Directives: ${customPrompt ? customPrompt : 'None'}

EXACT JSON SCHEMA REQUIRED:
{
  "id": "ai_diet_[random_numbers]",
  "name": "[Creative Title, e.g., 'Aesthetic Shred Protocol']",
  "category": "${category}",
  "desc": "[Short description of the diet strategy]",
  "goal": "${goal}",
  "difficulty": "Intermediate",
  "duration": "12 Weeks",
  "tags": ["AI Generated", "${category}"],
  "schedule": [
    {
      "time": "08:00 AM",
      "mealName": "Breakfast",
      "notes": "[Brief tip about this meal]",
      "items": ["[Item 1 with quantity]", "[Item 2]"]
    }
  ]
}

Ensure the schedule covers a full day with at least 4-5 meal/snack entries. Total calories must be approximately ${calories}. Do NOT include Markdown formatting. Only output raw JSON object.`;

    if (geminiKey) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 2048
                    }
                })
            });

            const data = await response.json();
            if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (err) {
            console.error('Gemini Diet Gen Failure:', err);
        }
    }

    if (openRouterKey) {
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
                    messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: 'Generate JSON diet plan' }],
                    temperature: 0.8,
                    max_tokens: 2048
                })
            });

            const data = await response.json();
            if (response.ok && data.choices && data.choices[0]) {
                return data.choices[0].message.content;
            }
        } catch (err) {
            console.error('OpenRouter Diet Gen Failure:', err);
        }
    }

    throw new Error("All AI Providers failed to generate a diet plan.");
}

module.exports = { getCoachResponse, getGeneratedWorkoutPlan, getGeneratedDietPlan };
