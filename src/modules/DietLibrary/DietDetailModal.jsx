import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Trash2, Clock, CheckSquare } from 'lucide-react';
import MacroRing from '../Diet/MacroRing';

export default function DietDetailModal({ diet, onClose, onSetPlan, onDelete }) {
  if (!diet) return null;

  return (
    <div className="modal-overlay fade-in">
      <motion.div 
        className="modal-content timeline-modal"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="modal-header">
          <div>
            <span className={`diet-tag ${diet.type === 'custom' ? 'custom-badge' : ''}`} style={{marginBottom:'8px', display:'inline-block'}}>
              {diet.type === 'custom' ? 'Custom Protocol' : 'Premium Protocol'}
            </span>
            <h2 style={{fontSize:'2rem'}}>{diet.name}</h2>
          </div>
          <button className="btn-close" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="modal-body" style={{padding: '2rem'}}>
          <p style={{color:'rgba(255,255,255,0.7)', fontSize:'1.1rem', lineHeight:1.6, marginBottom:'2rem'}}>{diet.desc}</p>
          
          <div className="detail-macros" style={{background:'rgba(255,255,255,0.02)', padding:'1.5rem', borderRadius:'16px', marginBottom:'2.5rem'}}>
            <MacroRing value={diet.macros.protein} max={100} color="#60a5fa" label="Protein" unit="%" size={100} />
            <MacroRing value={diet.macros.carbs} max={100} color="#f59e0b" label="Carbs" unit="%" size={100} />
            <MacroRing value={diet.macros.fat} max={100} color="#f472b6" label="Fat" unit="%" size={100} />
          </div>

          <div className="content-grid" style={{display:'grid', gap:'2rem'}}>
            <div className="diet-rules-section">
              <h3 style={{marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'10px', fontSize:'1.4rem'}}>
                <CheckCircle size={22} color="#00f5a0"/> Daily Directives
              </h3>
              <ul className="detail-rules">
                {diet.rules && diet.rules.map((rule, idx) => (
                  <li key={idx} style={{background:'rgba(0,245,160,0.05)', borderLeft:'3px solid #00f5a0'}}>{rule}</li>
                ))}
                {(!diet.rules || diet.rules.length === 0) && (
                  <li style={{opacity:0.5}}>No specific rules defined.</li>
                )}
              </ul>
            </div>

            <div className="diet-schedule-section">
              <h3 style={{marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'10px', fontSize:'1.4rem'}}>
                <Clock size={22} color="#8b5cf6"/> Full-Day Schedule
              </h3>
              
              <div className="timeline-container relative">
                {diet.schedule && diet.schedule.length > 0 ? (
                  diet.schedule.map((entry, idx) => (
                    <div key={idx} className="timeline-node">
                      <div className="node-time">
                        <span className="time-val">{entry.time}</span>
                      </div>
                      <div className="node-content glass-card">
                        <h4 style={{fontSize:'1.1rem', margin:'0 0 8px', color:'#fff'}}>{entry.mealName}</h4>
                        {entry.notes && <p className="node-notes" style={{color:'#f59e0b', fontSize:'0.85rem', margin:'0 0 10px', fontWeight:'700'}}>{entry.notes}</p>}
                        {entry.items && entry.items.length > 0 && (
                          <ul className="node-items" style={{margin:0, padding:'0 0 0 16px', color:'rgba(255,255,255,0.7)', fontSize:'0.9rem', lineHeight:1.5}}>
                            {entry.items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{color:'rgba(255,255,255,0.4)'}}>No schedule data provided for this plan.</p>
                )}
              </div>
            </div>
          </div>

          <div style={{display:'flex', gap:'16px', marginTop: '3rem'}}>
            <button className="btn-set-plan" onClick={() => onSetPlan(diet)} style={{marginTop: 0, flex: 1, display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', fontSize:'1.1rem'}}>
              <CheckSquare size={20} /> Deploy as Active Plan
            </button>
            {diet.type === 'custom' && onDelete && (
              <button 
                onClick={() => onDelete(diet.id)}
                style={{
                  background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', 
                  color: '#ff6b6b', borderRadius: '12px', padding: '0 24px', cursor:'pointer', display:'flex', alignItems:'center'
                }}>
                <Trash2 size={24} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
