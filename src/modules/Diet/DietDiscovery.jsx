import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, AlertCircle, Utensils, Target, Clock, CheckCircle, Loader } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'goal',
    title: 'What is your primary goal?',
    icon: <Target size={24} />,
    options: [
      { id: 'shredder', label: 'The Shredder', desc: 'Lose weight & burn fat (Caloric Deficit)' },
      { id: 'builder', label: 'The Builder', desc: 'Gain muscle mass (Caloric Surplus)' },
      { id: 'recomp', label: 'Body Recomposition', desc: 'Lose fat, build muscle (Maintenance+)' }
    ]
  },
  {
    id: 'preference',
    title: 'Any dietary preferences?',
    icon: <Utensils size={24} />,
    options: [
      { id: 'omnivore', label: 'Omnivore', desc: 'No restrictions, standard balanced diet' },
      { id: 'vegan', label: 'Vegan', desc: '100% Plant-powered' },
      { id: 'vegetarian', label: 'Vegetarian', desc: 'Plant-based with dairy/eggs' },
      { id: 'keto', label: 'Keto', desc: 'Extremely low carb, high fat' },
      { id: 'paleo', label: 'Paleo', desc: 'Whole foods only (Ancestral)' }
    ]
  },
  {
    id: 'lifestyle',
    title: 'What is your cooking style?',
    icon: <Clock size={24} />,
    options: [
      { id: 'busy', label: 'Busy Professional', desc: 'Needs quick 15-min meals & meal prep' },
      { id: 'cook', label: 'Dedicated Cook', desc: 'Enjoys cooking fresh meals daily' },
      { id: 'if', label: 'Intermittent Faster', desc: 'Eats all meals in an 8-hour window (16:8)' }
    ]
  }
];

export default function DietDiscovery({ onSave }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ goal: '', preference: '', lifestyle: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelect = (questionId, optionId) => {
    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);
    
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 250);
    } else {
      setTimeout(() => {
        setStep(step + 1);
        handleFinishOptionA(nextAnswers);
      }, 250);
    }
  };

  const handleFinishOptionA = (finalAnswers) => {
    // Generate Option A Baseline Template
    const templateName = `The ${finalAnswers.lifestyle === 'busy' ? 'Busy ' : ''}${finalAnswers.preference === 'vegan' ? 'Vegan ' : finalAnswers.preference === 'keto' ? 'Keto ' : ''}${finalAnswers.goal === 'shredder' ? 'Shredder' : finalAnswers.goal === 'builder' ? 'Muscle Builder' : 'Recomp Plan'}`;
    
    // Simulate macro splits roughly based on goals
    let c = 40, p = 30, f = 30; // standard recomp
    if (finalAnswers.goal === 'shredder') { c = 35; p = 40; f = 25; }
    if (finalAnswers.goal === 'builder') { c = 50; p = 30; f = 20; }
    if (finalAnswers.preference === 'keto') { c = 5; p = 25; f = 70; }

    setResult({
      type: 'template',
      name: templateName,
      desc: "Based on your answers, this is the optimal pre-built baseline for you. You can start using this immediately, or let our AI customize it further.",
      macros: { carbs: c, protein: p, fat: f },
      rules: [
        finalAnswers.goal === 'shredder' ? "Maintain a daily 300-500 calorie deficit." : finalAnswers.goal === 'builder' ? "Maintain a daily 300-500 calorie surplus." : "Eat at maintenance calories, prioritize high protein.",
        finalAnswers.preference === 'vegan' ? "Ensure complete proteins by combining legumes and grains." : "Focus on whole, unprocessed protein sources.",
        finalAnswers.lifestyle === 'busy' ? "Batch cook carb sources (rice/potatoes) on Sundays." : "Focus on nutrient timing around workouts."
      ]
    });
  };

  const handleEnhanceWithAI = () => {
    setIsGenerating(true);
    // Simulate AI Generation time
    setTimeout(() => {
      setResult({
        type: 'ai-custom',
        name: `Bespoke ${answers.preference.charAt(0).toUpperCase() + answers.preference.slice(1)} ${answers.goal.charAt(0).toUpperCase() + answers.goal.slice(1)} Protocol`,
        desc: "A fully personalized, hyper-optimized nutritional architecture generated specifically for your unique profile and lifestyle constraints.",
        macros: { carbs: answers.preference === 'keto' ? 8 : (answers.goal === 'builder' ? 52 : 38), 
                  protein: answers.goal === 'shredder' ? 42 : 32, 
                  fat: answers.preference === 'keto' ? 68 : (answers.goal === 'shredder' ? 20 : 16) },
        rules: [
          "AI Custom: Hydrate with 16oz of water immediately upon waking.",
          `AI Custom: Consume 30g of ${answers.preference === 'vegan' ? 'plant' : 'complete'} protein within 45 mins post-workout.`,
          "AI Custom: Supplement with 5g Creatine Monohydrate daily.",
          answers.lifestyle === 'if' ? "AI Custom: Break fast with protein/fat, save heavy carbs for post-workout window." : "AI Custom: Spread meals evenly to sustain energy and muscle protein synthesis."
        ]
      });
      setIsGenerating(false);
    }, 2500);
  };

  if (step === QUESTIONS.length) {
    if (!result) return <div className="discovery-result fade-in" style={{padding: '4rem', display: 'flex', justifyContent: 'center'}}><span className="spinner-small" style={{borderColor: 'var(--primary)'}} /></div>;
    return (
      <div className="discovery-result fade-in">
        <div className={`plan-result-card ${result.type === 'ai-custom' ? 'ai-glow' : ''}`}>
          <div className="result-header">
            {result.type === 'ai-custom' ? <Sparkles className="icon-ai" size={32} /> : <CheckCircle className="icon-success" size={32} />}
            <h2>{result.name}</h2>
            <p>{result.desc}</p>
          </div>

          <div className="result-macros-preview">
            <div className="macro-bar-label">Recommended Macro Split</div>
            <div className="macro-bar-visual">
              <div className="macro-segment p" style={{ width: `${result.macros.protein}%` }}>P {result.macros.protein}%</div>
              <div className="macro-segment c" style={{ width: `${result.macros.carbs}%` }}>C {result.macros.carbs}%</div>
              <div className="macro-segment f" style={{ width: `${result.macros.fat}%` }}>F {result.macros.fat}%</div>
            </div>
          </div>

          <div className="result-rules">
            <h4>Core Directives</h4>
            <ul>
              {result.rules.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          <div className="result-actions">
            {result.type === 'template' && (
              <button className="btn-enhance-ai" onClick={handleEnhanceWithAI} disabled={isGenerating}>
                {isGenerating ? <Loader className="spin" size={18} /> : <Sparkles size={18} />}
                {isGenerating ? 'AI is formulating...' : 'Enhance with AI'}
              </button>
            )}
            <button className="btn-save-plan" style={{marginTop: result.type==='ai-custom' ? '20px' : 0}} onClick={() => onSave(result)}>
              Set as My Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[step];

  return (
    <div className="diet-discovery fade-in">
      <div className="wizard-progress">
        <div className="progress-track">
          <motion.div 
            className="progress-fill" 
            initial={{ width: 0 }}
            animate={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <span>Step {step + 1} of {QUESTIONS.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          className="wizard-step"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="wizard-question-header">
            <div className="icon-wrap">{currentQ.icon}</div>
            <h2>{currentQ.title}</h2>
          </div>

          <div className="wizard-options">
            {currentQ.options.map(opt => (
              <button 
                key={opt.id} 
                className={`wizard-option ${answers[currentQ.id] === opt.id ? 'selected' : ''}`}
                onClick={() => handleSelect(currentQ.id, opt.id)}
              >
                <div className="opt-left">
                  <h4>{opt.label}</h4>
                  <p>{opt.desc}</p>
                </div>
                <div className="opt-indicator" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="wizard-footer">
        {step > 0 ? (
          <button className="btn-back" onClick={() => setStep(s => s - 1)}>
            <ChevronLeft size={18} /> Back
          </button>
        ) : <div />}
      </div>
    </div>
  );
}
