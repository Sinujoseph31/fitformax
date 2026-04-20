import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Play, Dumbbell, Calendar, Trash2, Edit2 } from 'lucide-react';
import { EXERCISES } from '../../data/exercises';
import './WorkoutDetailModal.css';

export default function WorkoutDetailModal({ plan, onClose, onDeploy, onDelete, onEdit }) {
  if (!plan) return null;

  return (
    <div className="workout-dossier-overlay">
      <motion.div 
        className="workout-dossier-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="dossier-header">
          <div className="header-meta">
            <span className={`difficulty-tag ${plan.difficulty.toLowerCase()}`}>
              {plan.difficulty} PROTOCOL
            </span>
            <div className="title-row">
              <h2>{plan.name}</h2>
              <button className="btn-close-dossier" onClick={onClose}><X size={24} /></button>
            </div>
            <p className="dossier-desc-brief">{plan.desc}</p>
          </div>
          
          <div className="dossier-stats-shelf">
            <div className="stat-pill">
              <Clock size={16} /> <span>{plan.duration}</span>
            </div>
            <div className="stat-pill">
               {plan.category}
            </div>
            <div className="stat-pill">
              <Calendar size={16} /> <span>{plan.schedule.filter(s => s.exercises.length > 0).length} Days Active</span>
            </div>
          </div>
        </div>

        <div className="dossier-scroll-body">
          <div className="weekly-layout">
            {plan.schedule.map((day, dIdx) => (
              <div key={dIdx} className={`day-card ${day.exercises.length === 0 ? 'rest-day' : ''}`}>
                <div className="day-header">
                  <div className="day-name">{day.day}</div>
                  <div className="day-focus">{day.focus}</div>
                </div>

                {day.exercises.length > 0 ? (
                  <div className="day-exercises">
                    {day.exercises.map((exRef, eIdx) => {
                      const exData = EXERCISES.find(e => e.id === exRef.id);
                      return (
                        <div key={eIdx} className="exercise-row">
                          <div className="ex-icon">{exData?.icon || '💪'}</div>
                          <div className="ex-info">
                            <div className="ex-name">{exData?.name || exRef.id}</div>
                            <div className="ex-params">{exRef.sets} sets × {exRef.reps}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rest-indicator">
                    <Clock size={20} /> <span>Muscle Recovery Phase</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="dossier-footer">
           <div className="footer-left-actions">
            {onDelete && (
              <button className="btn-delete-custom" onClick={() => onDelete(plan._id || plan.id)}>
                  <Trash2 size={20} />
              </button>
            )}
            {onEdit && (
              <button className="btn-edit-custom" onClick={() => onEdit(plan)}>
                  <Edit2 size={20} />
              </button>
            )}
           </div>
           <button className="btn-deploy-workout" onClick={() => onDeploy(plan)}>
              <Play size={20} fill="currentColor" /> Deploy Program
           </button>
        </div>
      </motion.div>
    </div>
  );
}
