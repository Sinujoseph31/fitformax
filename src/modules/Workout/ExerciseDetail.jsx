import React, { useState } from 'react';
import { X, Play, Info, CheckCircle2, Target, BookOpen, AlertTriangle, ListOrdered, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MuscleHighlighter from './MuscleHighlighter';
import './ExerciseDetail.css';

export default function ExerciseDetail({ exercise, onClose }) {
  const [activeVisualTab, setActiveVisualTab] = useState('guide');
  const [activeCoachTab, setActiveCoachTab] = useState('steps');

  if (!exercise) return null;

  return (
    <AnimatePresence>
      <div className="ed-overlay" onClick={onClose}>
        <motion.div
          className="ed-modal"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button className="ed-close" onClick={onClose}><X size={20} /></button>

          {/* ── HERO VISUAL ── */}
          <div className="ed-hero">
            {/* tabs */}
            <div className="ed-vis-tabs">
              <button className={activeVisualTab === 'guide' ? 'active' : ''} onClick={() => setActiveVisualTab('guide')}>
                <Play size={13} /> Guide
              </button>
              <button className={activeVisualTab === 'anatomy' ? 'active' : ''} onClick={() => setActiveVisualTab('anatomy')}>
                <BookOpen size={13} /> Anatomy
              </button>
            </div>

            {/* content */}
            <AnimatePresence mode="wait">
              {activeVisualTab === 'guide' ? (
                <motion.div key="guide" className="ed-guide-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {exercise.gifUrl ? (
                    <img src={exercise.gifUrl} alt={exercise.name} className="ed-gif" />
                  ) : (
                    <div className="ed-no-gif">
                      <div className="ed-no-gif-icon">{exercise.icon}</div>
                      <p>Follow the step-by-step guide below</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="anatomy" className="ed-anatomy-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <MuscleHighlighter targetedMuscles={exercise.muscles} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* gradient fade bottom */}
            <div className="ed-hero-fade" />
          </div>

          {/* ── HEADER INFO ── */}
          <div className="ed-info">
            <div className="ed-icon-badge">{exercise.icon}</div>
            <div>
              <h2 className="ed-title">{exercise.name}</h2>
              <div className="ed-meta">
                <span className="ed-cat">{exercise.category}</span>
                <span className="ed-sep">·</span>
                <span className="ed-equip">{exercise.equipment}</span>
              </div>
            </div>
          </div>

          {/* ── MUSCLES ── */}
          <div className="ed-muscles">
            <div className="ed-label"><Target size={14} />Target Muscles</div>
            <div className="ed-pills">
              {exercise.muscles?.map(m => <span key={m} className="ed-pill">{m}</span>)}
            </div>
          </div>

          {/* ── DESCRIPTION ── */}
          <p className="ed-desc">{exercise.description}</p>

          {/* ── COACHING TABS ── */}
          <div className="ed-coaching">
            <div className="ed-coach-tabs">
              <button className={activeCoachTab === 'steps' ? 'active' : ''} onClick={() => setActiveCoachTab('steps')}>
                <ListOrdered size={14} /> Step-by-Step
              </button>
              <button className={activeCoachTab === 'mistakes' ? 'active' : ''} onClick={() => setActiveCoachTab('mistakes')}>
                <AlertTriangle size={14} /> Mistakes
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeCoachTab === 'steps' ? (
                <motion.ol key="steps" className="ed-steps" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                  {(exercise.steps || exercise.tips || []).map((step, i) => (
                    <li key={i}>
                      <span className="ed-step-num">{i + 1}</span>
                      <span className="ed-step-text">{step}</span>
                    </li>
                  ))}
                </motion.ol>
              ) : (
                <motion.ul key="mistakes" className="ed-mistakes" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  {(exercise.mistakes || exercise.tips || []).map((item, i) => (
                    <li key={i}>
                      <AlertTriangle size={14} className="warn-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* ── CTA ── */}
          <button className="ed-cta" onClick={onClose}>
            <Zap size={18} /> Got it, Let's Lift!
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
