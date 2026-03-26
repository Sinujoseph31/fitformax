/**
 * AI Coaching Logic via OpenRouter (Mistral 7B)
 * This model is confirmed to be available and free for the user's current key.
 */
const getCoachResponse = async (message, context) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const baseURL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';
    
    if (!apiKey) throw new Error('OpenRouter (OPENAI_API_KEY) missing in .env');

    const { 
        name, goal, currentWeight, weightChange, daysCount, recentWeights, dietPlan, workoutPlan
    } = context;

    // OPTIMIZATION: Truncate history to avoid massive token payloads which slow down the AI
    const weightHistoryStr = (recentWeights || []).slice(-5).map(w => `${new Date(w.timestamp).toLocaleDateString()}: ${w.value}kg`).join(', ');
    
    // Simplifed diet summary instead of full JSON dump
    const dietSummary = dietPlan && dietPlan.meals ? `Logged ${dietPlan.meals.length} meals today` : 'No meals logged yet';

    const systemPrompt = `You are the FitformaX AI Coach. Tone: supportive, firm, professional.
User: ${name || 'Enthusiast'} | Goal: ${goal} | Weight: ${currentWeight}kg.
Recent Weights: ${weightHistoryStr}.
RESOURCES: Diet=${dietSummary}, Workout=${workoutPlan?.focus || 'General'}.
RULES: 
- 2 short paragraphs max. 
- Use Indian dietary references.
- End with a unique "Coach Tip".`;

    try {
        console.log('[AI Service] Thinking with Mistral (via OpenRouter)...');
        const response = await fetch(`${baseURL}/chat/completions`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://fitformax.app',
                'X-Title': 'FitformaX'
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct-v0.1',
                messages: [{ role: 'user', content: `${systemPrompt}\n\nUser Question: ${message}` }],
                max_tokens: 350 // OPTIMIZATION: Force a quick, concise response
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || `OpenRouter Error: ${response.status}`);
        }

        const data = await response.json();
        if (!data.choices || !data.choices[0]) throw new Error('No response from AI');
        return data.choices[0].message.content;
    } catch (error) {
        console.error('[AI Service] AI Failed:', error.message);
        throw new Error(`AI Coach Error: ${error.message}. Please verify your OpenRouter key in .env`);
    }
};

module.exports = { getCoachResponse };
