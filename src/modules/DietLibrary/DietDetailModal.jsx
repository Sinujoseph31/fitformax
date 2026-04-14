import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  CheckCircle,
  Trash2,
  Clock,
  CheckSquare,
  Zap,
  Scale,
  Target,
  Sun,
  CloudSun,
  Moon,
  Coffee,
  Info
} from 'lucide-react';
import MacroRing from '../Diet/MacroRing';
import './DietDetailModal.css';

export default function DietDetailModal({ diet, onClose, onSetPlan, onDelete }) {
  if (!diet) return null;

  const getMealIcon = (time) => {
    if (!time) return <Coffee size={18} />;
    const h = parseInt(time.split(':')[0]);
    const isPM = time.toLowerCase().includes('pm');
    const hour = (isPM && h !== 12) ? h + 12 : (!isPM && h === 12) ? 0 : h;

    if (hour < 11) return <Sun size={18} className="text-orange" />;
    if (hour < 16) return <CloudSun size={18} className="text-yellow" />;
    return <Moon size={18} className="text-dim" />;
  };

  return (
    <div className="modal-overlay fade-in">
      <motion.div
        className="modal-content dossier-modal"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="dossier-header-fixed">
          <div className="header-meta">
            <span className={`protocol-type-tag ${diet.type === 'custom' ? 'custom' : 'standard'}`}>
              {diet.category === 'AI Generated' ? '🧠 NEURAL PROTOCOL' : diet.type === 'custom' ? 'CUSTOM DESIGN' : 'MASTER TEMPLATE'}
            </span>
            <div className="title-row">
              <h2>{diet.name}</h2>
              <button className="btn-close-minimal" onClick={onClose}><X size={24} /></button>
            </div>
            <p className="dossier-desc-short">{diet.desc}</p>
          </div>

          <div className="macro-profile-shelf-mini">
            <div className="m-pill protein">
              <span className="m-p-val">{diet.macros?.protein || 0}%</span>
              <span className="m-p-label">Protein</span>
            </div>
            <div className="m-pill carbs">
              <span className="m-p-val">{diet.macros?.carbs || 0}%</span>
              <span className="m-p-label">Carbs</span>
            </div>
            <div className="m-pill fat">
              <span className="m-p-val">{diet.macros?.fat || 0}%</span>
              <span className="m-p-label">Fat</span>
            </div>
          </div>
        </div>

        <div className="modal-body dossier-scrollable">
          <div className="dossier-grid">
            <div className="dossier-main">
              <div className="section-title">
                <Clock size={18} />
                <h3>Daily Timeline</h3>
              </div>

              <div className="protocol-timeline">
                {diet.schedule && diet.schedule.length > 0 ? (
                  diet.schedule.map((entry, idx) => (
                    <div key={idx} className="timeline-block">
                      <div className="time-strip">
                        <span className="time-stamp">{entry.time}</span>
                        <div className="node-dot"></div>
                      </div>
                      <div className="meal-content-card glass">
                        <div className="meal-header">
                          {getMealIcon(entry.time)}
                          <h4>{entry.mealName}</h4>
                        </div>
                        {entry.notes && (
                          <div className="meal-note-badge">
                            <Info size={12} /> {entry.notes}
                          </div>
                        )}
                        <ul className="meal-items-list">
                          {(entry.items || []).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-timeline">No schedule data provided.</div>
                )}
              </div>
            </div>

            <div className="dossier-side">
              <div className="section-title">
                <Zap size={18} />
                <h3>Directives</h3>
              </div>
              <ul className="directives-list">
                {(diet.rules || []).map((rule, idx) => (
                  <li key={idx} className="directive-item">
                    <CheckCircle size={14} className="text-primary" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              <div className="dossier-actions-sticky">
                {onDelete && (
                  <button className="btn-delete-protocol-minimal" onClick={() => onDelete(diet._id || diet.id)}>
                    <Trash2 size={20} />
                  </button>
                )}
                <button className="btn-deploy-protocol" onClick={() => onSetPlan(diet)}>
                  <Target size={20} /> Deploy Protocol
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
