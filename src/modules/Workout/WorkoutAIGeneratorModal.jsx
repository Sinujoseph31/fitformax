import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Brain, Zap, Dumbbell, Target } from 'lucide-react';
import { EXERCISES } from '../../data/exercises';
import './WorkoutAIGeneratorModal.css';

export default function WorkoutAIGeneratorModal({ onSave, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [level, setLevel] = useState('Intermediate');
  const [days, setDays] = useState(3);
  const [goal, setGoal] = useState('Mass Building');
  const [equipment, setEquipment] = useState('Full Gym');
  const [focusAreas, setFocusAreas] = useState({
    chest: false, back: false, legs: false, 
    shoulders: false, arms: false, core: false
  });
  const [customPrompt, setCustomPrompt] = useState('');

  const generateLocalSchedule = (numDays, userGoal, userEquip, priorityAreas, prompt) => {
    const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const schedule = [];
    const lowerPrompt = prompt.toLowerCase();

    // Map focusAreas state to array
    const activePriorities = Object.keys(priorityAreas).filter(k => priorityAreas[k]);

    for (let i = 0; i < numDays; i++) {
        let dailyFocus = ['Push', 'Pull', 'Legs', 'Upper', 'Lower', 'Core'][i % 6];
        
        // Over-index priorities if selected
        if (activePriorities.length > 0 && Math.random() > 0.4) {
           dailyFocus = activePriorities[Math.floor(Math.random() * activePriorities.length)];
           dailyFocus = dailyFocus.charAt(0).toUpperCase() + dailyFocus.slice(1);
        }

        const exercises = EXERCISES.filter(ex => {
            // Equipment check
            if (userEquip === 'Dumbbells Only' && ex.equipment !== 'Dumbbell') return false;
            if (userEquip === 'Home / No Equipment' && !['Bodyweight', 'Band'].includes(ex.equipment)) return false;
            
            // Custom Prompt keyword filtering (negative)
            if (lowerPrompt.includes('no ') || lowerPrompt.includes('avoid ')) {
               const badWord = lowerPrompt.split('no ')[1]?.split(' ')[0] || lowerPrompt.split('avoid ')[1]?.split(' ')[0];
               if (badWord && ex.name.toLowerCase().includes(badWord)) return false;
            }

            // Category match
            const cat = ex.category.toLowerCase();
            const focus = dailyFocus.toLowerCase();
            if (focus === 'push') return ['chest', 'shoulders', 'triceps'].includes(cat);
            if (focus === 'pull') return ['back', 'biceps'].includes(cat);
            if (focus === 'legs') return cat === 'legs';
            if (focus === 'core') return cat === 'abs';
            return cat.includes(focus) || focus.includes(cat);
        }).sort(() => 0.5 - Math.random()).slice(0, 5);

        schedule.push({
            day: daysArr[i],
            focus: dailyFocus,
            exercises: (exercises.length > 0 ? exercises : EXERCISES.slice(0, 5)).map(ex => ({
               id: ex.id,
               sets: userGoal === 'Pure Strength' ? 5 : 3,
               reps: userGoal === 'Pure Strength' ? '3-5' : '8-12'
            }))
        });
    }
    return schedule;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulated Neural Processing (Instant Feedback loop)
    setTimeout(() => {
      const schedule = generateLocalSchedule(days, goal, equipment, focusAreas, customPrompt);
      
      const generatedPlan = {
        id: `local_ai_${Date.now()}`,
        name: `${goal} Protocol: ${level}`,
        category: 'User Created',
        desc: `High-precision ${level.toLowerCase()} routine optimized for ${goal.toLowerCase()}. ${customPrompt ? 'Directives analyzed & applied.' : ''}`,
        difficulty: level,
        duration: '12 Weeks',
        tags: ['Neural Optimized', level, goal],
        schedule
      };
      
      onSave(generatedPlan);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="ai-gen-overlay">
      <motion.div 
        className="ai-gen-modal glass"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="ai-gen-header">
           <div className="ai-title">
             <Sparkles className="sparkle-icon" />
             <h2>AI Training Architect</h2>
           </div>
           <button onClick={onClose} className="btn-close-ai"><X /></button>
        </div>

        {isGenerating ? (
           <div className="generating-state">
              <div className="brain-loader">
                 <Brain size={60} className="floating-brain" />
                 <div className="scan-line" />
              </div>
              <h3>Synthesizing Training Biomarkers...</h3>
              <p>Analyzing muscle fiber recruitment patterns and recovery windows.</p>
              {Object.values(focusAreas).some(v=>v) && <p style={{color:'#a78bfa', fontSize:'0.85rem', marginTop:'10px'}}>Injecting specialized pathways for priority muscle groups...</p>}
              {customPrompt && <p style={{color:'#00f5a0', fontSize:'0.85rem', marginTop:'5px'}}>Applying strictly to custom directives: "{customPrompt}"</p>}
           </div>
        ) : (
           <div className="ai-gen-body" style={{maxHeight:'70vh', overflowY:'auto'}}>
              <section className="gen-params">
                 <div className="param-item">
                    <label><Zap size={16} /> Experience Level</label>
                    <div className="option-row">
                       {['Beginner', 'Intermediate', 'Advanced'].map(opt => (
                         <button 
                           key={opt}
                           className={level === opt ? 'active' : ''}
                           onClick={() => setLevel(opt)}
                         >{opt}</button>
                       ))}
                    </div>
                 </div>

                 <div className="param-item">
                    <label><Target size={16} /> Primary Objective</label>
                    <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                       <option>Mass Building</option>
                       <option>Pure Strength</option>
                       <option>Fat Loss / Definition</option>
                       <option>Endurance / Athleticism</option>
                    </select>
                 </div>

                 <div className="param-item">
                    <label><Dumbbell size={16} /> Weekly Commitment</label>
                    <div className="days-selector">
                        {[2, 3, 4, 5, 6].map(d => (
                            <button 
                              key={d} 
                              className={days === d ? 'active' : ''} 
                              onClick={() => setDays(d)}
                            >{d} Days</button>
                        ))}
                    </div>
                 </div>

                 <div className="param-item">
                    <label>Equipment Access</label>
                    <select value={equipment} onChange={(e) => setEquipment(e.target.value)}>
                       <option>Full Gym</option>
                       <option>Dumbbells Only</option>
                       <option>Home / No Equipment</option>
                    </select>
                 </div>

                 <div className="param-item">
                    <label>Priority Target Areas (Over-Indexing)</label>
                    <div className="supp-grid">
                      {Object.keys(focusAreas).map(key => (
                        <label key={key} className={`supp-checkbox ${focusAreas[key] ? 'active' : ''}`}>
                          <input type="checkbox" checked={focusAreas[key]} onChange={() => setFocusAreas({...focusAreas, [key]: !focusAreas[key]})} style={{display:'none'}} />
                          <span className="supp-indicator"></span>
                          <span className="supp-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                 </div>

                 <div className="param-item">
                    <label>Additional Constraints / AI Prompt (Optional)</label>
                    <textarea 
                        value={customPrompt} 
                        onChange={e => setCustomPrompt(e.target.value)} 
                        rows={2} 
                        placeholder="e.g., 'I have lower back pain, avoid heavy deadlifts'" 
                        style={{width:'100%', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', padding: '10px', borderRadius: '12px', resize:'none', fontFamily:'inherit'}}
                    />
                 </div>
              </section>

              <button className="btn-generate-ai" onClick={handleGenerate}>
                 <Sparkles size={20} /> Generate Neural Protocol
              </button>
           </div>
        )}
      </motion.div>
    </div>
  );
}
