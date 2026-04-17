import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Edit3, Target, Droplets, Medal, CheckCircle2 } from 'lucide-react';
import MacroRing from './MacroRing';

export default function DietPlanViewer({ activePlan, onRetake }) {
  if (!activePlan) return null;

  return (
    <motion.div
      className="diet-plan-viewer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Plan Header */}
      <div className="ap-header-card">
        <div className="ap-title">
          {activePlan.type === 'ai-custom' && <Sparkles className="icon-ai" size={20} />}
          <h2>{activePlan.name}</h2>
          {activePlan.type === 'ai-custom' && <span className="badge-ai">AI Optimized</span>}
        </div>
        <p className="ap-desc">{activePlan.desc}</p>
        <button className="btn-retake" onClick={onRetake}>
          <Edit3 size={14} /> Retake Discovery
        </button>
      </div>

      {/* Daily Targets — Macro Rings */}
      <div className="plan-macros-card">
        <h3 className="plan-section-title"><Target size={18} /> Daily Targets</h3>
        <div className="plan-rings">
          <MacroRing value={activePlan.macros.protein} max={100} color="#3b82f6" label="Protein" unit="%" size={100} />
          <MacroRing value={activePlan.macros.carbs}   max={100} color="#FF9933" label="Carbs"   unit="%" size={100} />
          <MacroRing value={activePlan.macros.fat}     max={100} color="#8b5cf6" label="Fat"     unit="%" size={100} />
        </div>
        <p className="target-note">Hit these macro % splits based on your daily caloric goal in the Tracker tab.</p>
      </div>

      <div className="plan-bottom-grid">
        {/* Nutrition Score */}
        <div className="plan-score-card">
          <h3 className="plan-section-title"><Medal size={18} /> Nutrition Score</h3>
          <div className="score-display">
            <span className="score-val">0</span>
            <span className="score-lvl">Level 1 · Novice</span>
          </div>
          <p className="score-desc">Log meals consistently to earn XP and level up your rank. (Coming soon)</p>
        </div>

        {/* Habits */}
        <div className="plan-habits-card">
          <h3 className="plan-section-title"><Droplets size={18} /> Habits & Directives</h3>
          <ul className="habit-list">
            {activePlan.rules.map((rule, idx) => (
              <li key={idx} className="habit-item">
                <CheckCircle2 size={15} className="habit-icon" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
