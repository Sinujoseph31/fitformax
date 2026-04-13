import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Edit3, Target, Flame, Droplets, Medal, CheckCircle2 } from 'lucide-react';
import MacroRing from './MacroRing';

export default function DietPlanViewer({ activePlan, onRetake }) {
  if (!activePlan) return null;

  return (
    <motion.div 
      className="diet-plan-viewer fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`active-plan-header glass-card ${activePlan.type === 'ai-custom' ? 'ai-glow' : ''}`}>
        <div className="ap-title">
          {activePlan.type === 'ai-custom' && <Sparkles className="icon-ai" size={24} />}
          <h2>{activePlan.name}</h2>
          {activePlan.type === 'ai-custom' && <span className="badge-ai">AI Optimized</span>}
        </div>
        <p className="ap-desc">{activePlan.desc}</p>
        <button className="btn-retake" onClick={onRetake}>
          <Edit3 size={14} /> Retake Discovery
        </button>
      </div>

      <div className="plan-dashboard-grid">
        {/* Macros Section */}
        <div className="plan-macros-card glass-card">
          <h3><Target size={18} /> Daily Targets</h3>
          
          <div className="plan-rings">
            <div className="ring-item">
              <MacroRing value={activePlan.macros.protein} max={100} color="#60a5fa" label="Protein" unit="%" size={90} />
            </div>
            <div className="ring-item">
              <MacroRing value={activePlan.macros.carbs} max={100} color="#f59e0b" label="Carbs" unit="%" size={90} />
            </div>
            <div className="ring-item">
              <MacroRing value={activePlan.macros.fat} max={100} color="#f472b6" label="Fat" unit="%" size={90} />
            </div>
          </div>
          <div className="target-notes">
            <p>Ensure you hit these percentages based on your daily caloric intake shown in the Tracker tab.</p>
          </div>
        </div>

        {/* Gamification / Hooks Section */}
        <div className="plan-gamification glass-card">
          <h3><Medal size={18} /> Nutrition Score</h3>
          <div className="score-display">
            <span className="score-val">0</span>
            <span className="score-lvl">Level 1 Novice</span>
          </div>
          <p className="score-desc">Log your meals consistently to earn XP and level up your nutrition rank! (Coming soon)</p>
        </div>

        {/* Holistic Habits Section */}
        <div className="plan-habits-card glass-card">
          <h3><Droplets size={18} /> Habits & Directives</h3>
          <ul className="habit-list">
            {activePlan.rules.map((rule, idx) => (
              <li key={idx} className="habit-item">
                <CheckCircle2 size={16} className="habit-icon" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
