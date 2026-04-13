import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BrainCircuit } from 'lucide-react';

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
      const { calories, goal, category, intensity, workoutTime, supplements, customPrompt } = formData;
      const cals = parseInt(calories);

      let macros = { protein: 30, carbs: 40, fat: 30 };
      if (goal === 'Weight Loss') macros = { protein: 40, carbs: 30, fat: 30 };
      if (goal === 'Muscle Gain' || goal === 'Athletic Performance' || intensity === 'Intense Gym Training') {
         macros = { protein: 35, carbs: 45, fat: 20 };
      }
      if (category === 'Keto') macros = { protein: 25, carbs: 5, fat: 70 };

      const foodDB = {
        'Standard': { 
            proteins: ['150g Grilled Chicken Breast', '200g Tilapia', '4 Scrambled Eggs', '150g Lean Ground Beef', '1 cup Cottage Cheese'],
            carbs: ['1 cup White Rice', '1 Large Sweet Potato', '1/2 cup Oatmeal', '2 slices Whole Wheat Bread', '1 cup Quinoa'],
            fats: ['1/2 Avocado', 'Handful of Almonds', '1 tbsp Peanut Butter', '1 tbsp Olive Oil dressing']
        },
        'Vegan': { 
            proteins: ['200g Tofu Scramble', '1.5 cups Lentil Soup', '150g Tempeh Stir-fry', '1 cup Edamame', 'Seitan Strips'],
            carbs: ['1 cup Brown Rice', 'Large serving Roasted Vegetables', '1 cup Quinoa', '1 Sweet Potato'],
            fats: ['1/2 Avocado', 'Handful of Walnuts', '2 tbsp Chia Seeds', '1 tbsp Tahini']
        },
        'Keto': { 
            proteins: ['250g Fatty Ribeye Steak', '4 Fried Eggs', '150g Salmon', 'Chicken Thighs (with skin)', '3 slices Bacon'],
            carbs: ['1 cup Spinach', '1/2 cup Asparagus', 'Steamed Broccoli', 'Cauliflower Mash'],
            fats: ['2 tbsp Grass-fed Butter', '1 tbsp MCT Oil', '1/2 Avocado', 'Handful of Macadamia Nuts']
        },
        'Indian Veg': { 
            proteins: ['150g Paneer Bhurji', '1 large bowl Toor Dal', '1 bowl Sprouts Salad', '1.5 cups Chana Masala', '1 bowl Rajma'],
            carbs: ['2 Whole Wheat Rotis', '1 cup Jeera Rice', '2 Dosa/Idli', 'Mixed Veg Sabzi (Bhindi)', 'Upma'],
            fats: ['1 tsp Ghee', 'Tadka in Mustard Oil', 'Roasted Peanuts', 'Plain Curd']
        },
        'Indian Non-Veg': { 
            proteins: ['250g Chicken Curry', '200g Fish Fry', 'Mutton Kheema', '4 Boiled Eggs', 'Chicken Tikka Dry'],
            carbs: ['2 Rotis', '1.5 cups Basmati Rice', 'Cucumber Salad', 'Palak Sabzi', '1 Paratha'],
            fats: ['Cooked in Ghee', 'Handful of Almonds', 'Coconut base in curry', '1 tsp Butter']
        },
        'Mediterranean': { 
            proteins: ['200g Baked Cod', 'Grilled Lemon Chicken', 'Greek Yogurt', '150g Shrimp', '2 Eggs with Feta'],
            carbs: ['1 cup Couscous', 'Tomato and Cucumber Salad', '1/2 cup Chickpeas', 'Whole Grain Pita', 'Roasted Eggplant'],
            fats: ['2 tbsp Extra Virgin Olive Oil', 'Handful of Kalamata Olives', '1/2 Avocado', 'Handful of Walnuts']
        }
      };

      const foods = foodDB[category] || foodDB['Standard'];
      const isHighCal = cals >= 2800;

      const generateMealItems = (index, isPre, isPost) => {
        const p1 = foods.proteins[index % foods.proteins.length];
        const p2 = isHighCal ? foods.proteins[(index+1) % foods.proteins.length] : null;
        const c1 = foods.carbs[index % foods.carbs.length];
        const c2 = isHighCal ? foods.carbs[(index+1) % foods.carbs.length] : null;
        const f1 = foods.fats[index % foods.fats.length];

        const mealItems = [];

        if (index === 0 && supplements.multivitamin) mealItems.push(`[Supplement] 1 serving Daily Multivitamin`);
        if (index === 0 && supplements.fishoil) mealItems.push(`[Supplement] 2g Omega-3 Fish Oil`);

        // PRE-WORKOUT OVERRIDE (Skip Heavy Foods)
        if (isPre) {
            if (supplements.preworkout) mealItems.push(`[Supplement] 1 scoop Pre-Workout Formula`);
            if (supplements.bcaa) mealItems.push(`[Supplement] 1 serving BCAA (sip during training)`);
            mealItems.push(`[Fast Carb] 1 Large Banana or Apple`);
            mealItems.push(`[Hydration] 1 Cup Black Coffee or Green Tea`);
            // Only add a tiny amount of protein if overall macros are high. Zero fats.
            if (macros.protein > 30) mealItems.push(`[Light Protein] 1/2 Scoop Whey or 2 Boiled Egg Whites`);
            return mealItems; 
        }

        if (isPost && supplements.whey && intensity !== 'No Workout (Sedentary)') {
           mealItems.push(`[Supplement] 1-2 scoops Whey Protein Shake`);
        } else {
           mealItems.push(`[Protein] ${p1}`);
           if (p2 && goal !== 'Weight Loss') mealItems.push(`[Protein+] ${p2}`);
        }

        if (isPost && supplements.creatine && intensity !== 'No Workout (Sedentary)') mealItems.push(`[Supplement] 5g Creatine Monohydrate`);
        
        if (macros.carbs > 15) {
           mealItems.push(`[Carb] ${c1}`);
           // Avoid massive carb loads immediately post workout unless bulking
           if (c2 && isHighCal && !isPost) mealItems.push(`[Carb+] ${c2}`);
        } else {
           mealItems.push(`[Fiber] ${c1}`); 
        }
        
        // POST-WORKOUT OVERRIDE (Zero Fats to speed up digestion)
        if (!isPost) {
           mealItems.push(`[Fat] ${f1}`);
        }
        
        return mealItems;
      };

      const newSchedule = [];
      
      newSchedule.push({
        time: '06:00 AM',
        mealName: 'Wake Up Routine',
        notes: 'Hydrate immediately on waking.',
        items: ['16oz Water with Lemon', 'Stretching Module']
      });

      const isWorkoutDay = intensity !== 'No Workout (Sedentary)';

      if (isWorkoutDay) {
         if (workoutTime === 'Morning') {
            newSchedule.push({ time: '06:30 AM', mealName: 'Pre-Workout Spike', notes: 'Prime CNS for training.', items: generateMealItems(4, true, false) });
            newSchedule.push({ time: '08:30 AM', mealName: 'Post-Workout Recovery', notes: 'Immediate liquid anabolism phase.', items: generateMealItems(5, false, true) });
            newSchedule.push({ time: '09:30 AM', mealName: 'Breakfast', notes: 'Solid food anabolism phase.', items: generateMealItems(0, false, false) });
            newSchedule.push({ time: '01:30 PM', mealName: 'Lunch', notes: '', items: generateMealItems(1, false, false) });
            if (isHighCal) newSchedule.push({ time: '04:30 PM', mealName: 'Snack', notes: '', items: generateMealItems(2, false, false) });
            newSchedule.push({ time: '07:30 PM', mealName: 'Dinner', notes: '', items: generateMealItems(3, false, false) });
         } else {
            newSchedule.push({ time: '08:00 AM', mealName: 'Breakfast', notes: '', items: generateMealItems(0, false, false) });
            newSchedule.push({ time: '01:00 PM', mealName: 'Lunch', notes: '', items: generateMealItems(1, false, false) });
            newSchedule.push({ time: '05:00 PM', mealName: 'Pre-Workout Spike', notes: 'Prime CNS for training.', items: generateMealItems(4, true, false) });
            newSchedule.push({ time: '07:30 PM', mealName: 'Post-Workout Recovery', notes: 'Immediate anabolism phase.', items: generateMealItems(5, false, true) });
            newSchedule.push({ time: '09:00 PM', mealName: 'Dinner', notes: 'Final solid meal.', items: generateMealItems(3, false, false) });
         }
      } else {
         const mealCount = isHighCal ? 5 : 4;
         newSchedule.push({ time: '08:30 AM', mealName: 'Breakfast', notes: '', items: generateMealItems(0, false, false) });
         newSchedule.push({ time: '01:00 PM', mealName: 'Lunch', notes: '', items: generateMealItems(1, false, false) });
         if (mealCount > 3) newSchedule.push({ time: '04:00 PM', mealName: 'Afternoon Snack', notes: '', items: generateMealItems(2, false, false) });
         newSchedule.push({ time: '07:00 PM', mealName: 'Dinner', notes: '', items: generateMealItems(3, false, false) });
         if (mealCount === 5) newSchedule.push({ time: '08:30 PM', mealName: 'Late Snack', notes: '', items: generateMealItems(4, false, false) });
      }

      newSchedule.push({
        time: '10:00 PM',
        mealName: 'Bedtime',
        notes: 'Prepare the body for recovery sleep.',
        items: ['Sleep Aid if necessary', 'Limit blue light exposure']
      });

      const generatedProtocol = {
        id: `ai_${Date.now()}`,
        name: `AI Generated: ${cals} kcal ${category} ${goal} Protocol`,
        category: 'AI Generated',
        type: 'custom',
        desc: `Neuro-calculated protocol for hitting exactly ${cals} calories prioritized for ${goal} acting under a ${intensity} lifestyle. Wake-to-Sleep architecture enabled.`,
        macros: macros,
        rules: [
          `AI Directive: Adhere strictly to the ${cals} kcal limit.`,
          `AI Directive: Source ingredients aligning with ${category}.`,
          `Drink a minimum of 3 Liters of water daily.`
        ],
        schedule: newSchedule
      };

      if (customPrompt) generatedProtocol.rules.push(`Constraint Override: ${customPrompt}`);

      setIsGenerating(false);
      onSave(generatedProtocol);
    }, 2800);
  };

  const isWorkoutDayUI = formData.intensity !== 'No Workout (Sedentary)';

  return (
    <div className="modal-overlay fade-in" style={{zIndex: 3000}}>
      <motion.div 
        className="modal-content ai-generator-modal"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="modal-header" style={{borderBottomColor: 'rgba(139, 92, 246, 0.3)'}}>
          <h2 style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <Sparkles size={24} color="#8b5cf6" /> 
            <span className="text-gradient" style={{background: 'linear-gradient(90deg, #8b5cf6, #d946ef)', WebkitBackgroundClip: 'text'}}>AI Protocol Generator</span>
          </h2>
          <button className="btn-close" type="button" onClick={!isGenerating ? onClose : undefined} disabled={isGenerating}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body relative">
          <AnimatePresence>
            {isGenerating && (
              <motion.div className="ai-loading-overlay glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <BrainCircuit size={64} className="spin-slow" color="#8b5cf6" style={{marginBottom:'1rem'}} />
                <h3 className="text-gradient">Architecting Protocol...</h3>
                <p>Establishing Wake-to-Sleep framework & calculating integrations...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleGenerate}>
            <div className="form-group grid-2-col">
              <div>
                <label>Target Daily Calories</label>
                <input type="number" required min="1000" max="8000" step="50" value={formData.calories} onChange={e => setFormData({...formData, calories: parseInt(e.target.value)||2000})} style={{width:'100%', fontSize:'1.2rem', fontWeight:800, color:'#00f5a0'}} />
              </div>
              <div>
                <label>Primary Goal</label>
                <select value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} style={{width:'100%'}}>
                  {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group grid-2-col">
              <div>
                <label>Dietary Framework</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{width:'100%'}}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label>Workout Intensity</label>
                <select value={formData.intensity} onChange={e => setFormData({...formData, intensity: e.target.value})} style={{width:'100%'}}>
                  {INTENSITIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>

            {isWorkoutDayUI && (
              <div className="form-group slide-down">
                <label>Workout Timing</label>
                <select value={formData.workoutTime} onChange={e => setFormData({...formData, workoutTime: e.target.value})} style={{width:'100%', border: '1px solid rgba(139, 92, 246, 0.4)'}}>
                  {WORKOUT_TIMES.map(t => <option key={t} value={t}>{t} Workout</option>)}
                </select>
              </div>
            )}

            <div className="form-group supplement-stack-box">
              <label style={{color: '#c4b5fd', borderBottom:'1px solid rgba(139, 92, 246, 0.3)', paddingBottom:'8px', marginBottom:'12px'}}>
                Active Supplement Stack (AI Auto-Injector)
              </label>
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

            <div className="form-group">
              <label>Additional Constraints / AI Prompt (Optional)</label>
              <textarea value={formData.customPrompt} onChange={e => setFormData({...formData, customPrompt: e.target.value})} rows={2} placeholder="e.g., 'I want all my meals loaded into an 8 hour window'" style={{width:'100%'}}/>
            </div>

            <button type="submit" className="btn-ai-generate" disabled={isGenerating}>
              <Sparkles size={20} /> Generate Deep AI Protocol
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
