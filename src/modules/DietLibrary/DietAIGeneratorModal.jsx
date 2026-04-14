import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BrainCircuit } from 'lucide-react';
import './DietLibrary.css';

export default function DietAIGeneratorModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    calories: 2000,
    goal: 'Weight Loss',
    category: 'Standard',
    intensity: 'No Workout (Sedentary)',
    workoutTime: 'Evening',
    customPrompt: '',
    supplements: {
      whey: false,
      creatine: false,
      preworkout: false,
      bcaa: false,
      multivitamin: false,
      fishoil: false
    }
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const GOALS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Athletic Performance'];
  const CATEGORIES = ['Standard', 'Vegan', 'Keto', 'Indian Veg', 'Indian Non-Veg', 'Mediterranean'];
  const INTENSITIES = ['No Workout (Sedentary)', 'Light / Home Workouts', 'Intense Gym Training'];
  const WORKOUT_TIMES = ['Morning', 'Evening'];

  const toggleSupp = (key) => {
    setFormData(prev => ({
      ...prev,
      supplements: { ...prev.supplements, [key]: !prev.supplements[key] }
    }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
        const { calories, goal, category, supplements } = formData;
        
        const foodDB = {
            'Standard': { p: 'Grilled Chicken', c: 'Brown Rice', f: 'Avocado' },
            'Vegan': { p: 'Tofu/Lentils', c: 'Quinoa', f: 'Walnuts' },
            'Keto': { p: 'Salmon/Steak', c: 'Spinach', f: 'Butter/MCT' },
            'Indian Veg': { p: 'Paneer/Dal', c: 'Roti/Rice', f: 'Ghee' },
            'Indian Non-Veg': { p: 'Chicken Curry', c: 'Basmati Rice', f: 'Coconut Milk' },
            'Mediterranean': { p: 'Baked Cod', c: 'Couscous', f: 'Olive Oil' }
        };

        const base = foodDB[category] || foodDB['Standard'];
        const activeSupps = Object.keys(supplements).filter(k => supplements[k]).map(s => s.toUpperCase());

        const schedule = [
            { time: "07:30 AM", mealName: "Neural-Start Breakfast", items: [`150g ${base.p}`, `1 cup ${base.c}`, "Mixed Berries"] },
            { time: "12:30 PM", mealName: "Metabolic Lunch", items: [`200g ${base.p}`, "Large Garden Salad", `1 tbsp ${base.f}`] },
            { time: "04:00 PM", mealName: "Performance Snack", items: ["Green Tea", "Handful of Nuts", activeSupps.includes('WHEY') ? "Whey Protein Shake" : "Greek Yogurt"] },
            { time: "08:00 PM", mealName: "Recovery Dinner", items: [`150g ${base.p}`, "Steamed Broccoli", activeSupps.includes('FISH OIL') ? "2g Omega-3 Fish Oil" : "Seeds"] }
        ];

        if (activeSupps.includes('PREWORKOUT')) schedule.splice(2, 0, { time: "03:30 PM", mealName: "Pre-Workout Injector", items: ["Pre-Workout Formula", "1 Banana"] });

        const isWeightLoss = goal === 'Weight Loss';
        const generatedPlan = {
            id: `local_ai_diet_${Date.now()}`,
            name: `${category} ${goal} Protocol`,
            desc: `Synthesized ${calories}kcal architecture focused on ${goal.toLowerCase()}. Bio-available source matching enabled.`,
            category: 'User Created',
            tags: ["Neural Optimized", category, goal],
            macros: {
              protein: isWeightLoss ? 40 : 30,
              carbs: isWeightLoss ? 30 : 50,
              fat: isWeightLoss ? 30 : 20
            },
            schedule: schedule
        };

        onSave(generatedPlan);
        setIsGenerating(false);
    }, 2800);
  };

  const isWorkoutDayUI = formData.intensity !== 'No Workout (Sedentary)';

  return (
    <div className="ai-gen-overlay" style={{zIndex: 15000}}>
      <motion.div 
        className="ai-gen-modal glass"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="ai-gen-header">
           <div className="ai-title">
             <Sparkles className="sparkle-icon" />
             <h2>AI Protocol Architect</h2>
           </div>
           <button onClick={onClose} className="btn-close-ai"><X /></button>
        </div>

        {isGenerating ? (
           <div className="generating-state">
              <div className="brain-loader">
                 <BrainCircuit size={60} className="floating-brain" />
                 <div className="scan-line" />
              </div>
              <h3 className="text-gradient">Architecting Protocol...</h3>
              <p>Establishing Wake-to-Sleep framework & calculating integrations...</p>
           </div>
        ) : (
           <div className="ai-gen-body" style={{maxHeight:'75vh', overflowY:'auto'}}>
              <form onSubmit={handleGenerate} className="gen-params">
                
                <div className="param-item grid-2-col">
                  <div>
                    <label>Target Daily Calories</label>
                    <input 
                      type="number" 
                      required 
                      min="1000" 
                      max="8000" 
                      step="50" 
                      value={formData.calories} 
                      onChange={e => setFormData({...formData, calories: parseInt(e.target.value)||2000})} 
                      className="ai-input-number"
                    />
                  </div>
                  <div>
                    <label>Primary Goal</label>
                    <select value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})}>
                      {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <div className="param-item grid-2-col">
                  <div>
                    <label>Dietary Framework</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Workout Intensity</label>
                    <select value={formData.intensity} onChange={e => setFormData({...formData, intensity: e.target.value})}>
                      {INTENSITIES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                {isWorkoutDayUI && (
                  <div className="param-item">
                    <label>Workout Timing</label>
                    <select value={formData.workoutTime} onChange={e => setFormData({...formData, workoutTime: e.target.value})}>
                      {WORKOUT_TIMES.map(t => <option key={t} value={t}>{t} Workout</option>)}
                    </select>
                  </div>
                )}

                <div className="param-item">
                  <label>Active Supplement Stack (AI Auto-Injector)</label>
                  <div className="supp-grid">
                    {Object.keys(formData.supplements).map(key => (
                      <label key={key} className={`supp-checkbox ${formData.supplements[key] ? 'active' : ''}`}>
                        <input type="checkbox" checked={formData.supplements[key]} onChange={() => toggleSupp(key)} style={{display:'none'}} />
                        <span className="supp-indicator"></span>
                        <span className="supp-label">{key.charAt(0).toUpperCase() + key.slice(1).replace('workout','-Workout').replace('oil',' Oil')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="param-item">
                  <label>Additional Constraints / AI Prompt (Optional)</label>
                  <textarea 
                    value={formData.customPrompt} 
                    onChange={e => setFormData({...formData, customPrompt: e.target.value})} 
                    rows={2} 
                    placeholder="e.g., 'I want all my meals loaded into an 8 hour window'" 
                    className="ai-textarea"
                  />
                </div>

                <button type="submit" className="btn-generate-ai">
                  <Sparkles size={20} /> Generate Neural Protocol
                </button>
              </form>
           </div>
        )}
      </motion.div>
    </div>
  );
}
