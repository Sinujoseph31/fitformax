import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Clock } from 'lucide-react';
import { DIET_CATEGORIES } from '../../data/diets';

export default function DietBuilderModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Goal-Oriented',
    desc: '',
    macros: { protein: 30, carbs: 40, fat: 30 },
    rules: [],
    schedule: [
      { time: '06:00 AM', mealName: 'Wake Up Routine', notes: 'Hydrate the system.', items: ['16oz Water'] },
      { time: '10:00 PM', mealName: 'Bedtime', notes: 'Sleep Aid or Recovery.', items: [] }
    ]
  });
  
  const [newRule, setNewRule] = useState('');
  const [newMeal, setNewMeal] = useState({ time: '', mealName: '', notes: '', itemsInput: '' });

  const handleMacroChange = (e, type) => {
    setFormData({
      ...formData,
      macros: { ...formData.macros, [type]: parseInt(e.target.value) || 0 }
    });
  };

  const addRule = () => {
    if (newRule.trim()) {
      setFormData({ ...formData, rules: [...formData.rules, newRule.trim()] });
      setNewRule('');
    }
  };

  const removeRule = (idx) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== idx)
    });
  };

  const addMeal = () => {
    if (newMeal.time && newMeal.mealName) {
      const itemsArray = newMeal.itemsInput.split('\n').filter(i => i.trim() !== '');
      setFormData({ 
        ...formData, 
        schedule: [...formData.schedule, { time: newMeal.time, mealName: newMeal.mealName, notes: newMeal.notes, items: itemsArray }]
      });
      setNewMeal({ time: '', mealName: '', notes: '', itemsInput: '' });
    }
  };

  const removeMeal = (idx) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== idx)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalMacros = formData.macros.protein + formData.macros.carbs + formData.macros.fat;
    if (totalMacros !== 100) {
      alert(`Macros must equal 100%. Currently at ${totalMacros}%.`);
      return;
    }
    
    // Sort schedule by time roughly
    const sortedForm = {...formData};
    
    onSave({
      ...sortedForm,
      id: `custom_${Date.now()}`,
      type: 'custom'
    });
  };

  const validCategories = DIET_CATEGORIES.filter(c => c !== 'All');

  return (
    <div className="modal-overlay fade-in">
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="modal-header">
          <h2>Create Custom Protocol</h2>
          <button className="btn-close" type="button" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} id="dietBuilderForm">
            <div className="form-group">
              <label>Protocol Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. The Apex Predator" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {validCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} rows={2} placeholder="Briefly describe this protocol..." />
            </div>

            <div className="form-group" style={{background:'rgba(255,255,255,0.02)', padding:'12px', borderRadius:'12px', border:'1px solid rgba(255,255,255,0.05)'}}>
              <label style={{marginBottom:'10px'}}>Macro Split Targets (%) - Must equal 100</label>
              <div className="macro-sliders">
                <div className="slider-group">
                  <label style={{color:'#60a5fa', fontSize:'0.7rem'}}>PROTEIN</label>
                  <input type="number" min="0" max="100" value={formData.macros.protein} onChange={e => handleMacroChange(e, 'protein')} />
                </div>
                <div className="slider-group">
                  <label style={{color:'#f59e0b', fontSize:'0.7rem'}}>CARBS</label>
                  <input type="number" min="0" max="100" value={formData.macros.carbs} onChange={e => handleMacroChange(e, 'carbs')} />
                </div>
                <div className="slider-group">
                  <label style={{color:'#f472b6', fontSize:'0.7rem'}}>FAT</label>
                  <input type="number" min="0" max="100" value={formData.macros.fat} onChange={e => handleMacroChange(e, 'fat')} />
                </div>
              </div>
            </div>

            <hr style={{borderColor:'rgba(255,255,255,0.1)', margin:'2rem 0'}} />

            {/* Daily Schedule Builder */}
            <div className="schedule-builder" style={{marginBottom:'2rem'}}>
              <h3 style={{fontSize:'1.1rem', marginBottom:'12px', display:'flex', alignItems:'center', gap:'8px', color:'#8b5cf6'}}>
                <Clock size={18} /> Daily Meal Schedule
              </h3>
              
              {formData.schedule.length > 0 && (
                <div className="timeline-container" style={{marginBottom:'1.5rem', background:'rgba(0,0,0,0.2)', padding:'1rem 1rem 1rem 2rem', borderRadius:'12px'}}>
                  {formData.schedule.map((entry, idx) => (
                    <div key={idx} className="timeline-node" style={{marginBottom: idx !== formData.schedule.length -1 ? '1rem' : 0}}>
                      <div className="node-time" style={{top: '4px'}}>
                        <span className="time-val" style={{fontSize:'0.75rem', top:'-2px'}}>{entry.time}</span>
                      </div>
                      <div className="node-content glass-card" style={{padding:'0.75rem', marginLeft:'1.5rem'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                          <h4 style={{fontSize:'1rem', margin:'0 0 4px'}}>{entry.mealName}</h4>
                          <Trash2 size={14} color="#ff6b6b" style={{cursor:'pointer'}} onClick={() => removeMeal(idx)} />
                        </div>
                        {entry.notes && <p style={{color:'#f59e0b', fontSize:'0.8rem', margin:'0 0 6px'}}>{entry.notes}</p>}
                        {entry.items.length > 0 && (
                          <span style={{fontSize:'0.8rem', color:'rgba(255,255,255,0.6)'}}>{entry.items.length} items</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="add-meal-box" style={{background:'rgba(139, 92, 246, 0.05)', border:'1px dashed rgba(139, 92, 246, 0.4)', padding:'1rem', borderRadius:'12px'}}>
                <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
                  <input type="text" style={{flex:1, background: 'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', padding:'8px', color:'#fff', borderRadius:'6px'}} placeholder="Time (e.g. 08:00 AM)" value={newMeal.time} onChange={e => setNewMeal({...newMeal, time: e.target.value})} />
                  <input type="text" style={{flex:2, background: 'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', padding:'8px', color:'#fff', borderRadius:'6px'}} placeholder="Meal Name (e.g. Pre-Workout)" value={newMeal.mealName} onChange={e => setNewMeal({...newMeal, mealName: e.target.value})} />
                </div>
                <input type="text" style={{width:'100%', marginBottom:'10px', background: 'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', padding:'8px', color:'#fff', borderRadius:'6px'}} placeholder="Optional Notes (e.g. Drink 16oz water first)" value={newMeal.notes} onChange={e => setNewMeal({...newMeal, notes: e.target.value})} />
                <textarea style={{width:'100%', marginBottom:'10px', background: 'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', padding:'8px', color:'#fff', borderRadius:'6px', height:'60px'}} placeholder="Food items (one per line)..." value={newMeal.itemsInput} onChange={e => setNewMeal({...newMeal, itemsInput: e.target.value})} />
                <button type="button" onClick={addMeal} style={{width:'100%', padding:'8px', background:'rgba(139, 92, 246, 0.2)', color:'#c4b5fd', border:'1px solid rgba(139, 92, 246, 0.4)', borderRadius:'6px', cursor:'pointer', fontWeight:'700', display:'flex', justifyContent:'center', alignItems:'center', gap:'6px'}}>
                  <Plus size={16} /> Add Meal to Schedule
                </button>
              </div>
            </div>

            <div className="rules-builder">
              <label style={{display:'block', marginBottom:'6px', fontWeight:'700', fontSize:'0.85rem', color:'rgba(255,255,255,0.6)'}}>Core Rules & Habits</label>
              <div className="rule-input-group">
                <input style={{flex:1, background: 'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', padding:'10px', color:'#fff', borderRadius:'8px'}} value={newRule} onChange={e => setNewRule(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addRule(); } }} placeholder="Add a habit rule (e.g. Avoid sugar)..." />
                <button type="button" className="btn-sys-add" onClick={addRule}><Plus size={20}/></button>
              </div>
              <ul className="detail-rules">
                {formData.rules.map((r, i) => (
                  <li key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 12px'}}>
                    <span>{r}</span>
                    <Trash2 size={16} color="#ff6b6b" style={{cursor:'pointer'}} onClick={() => removeRule(i)} />
                  </li>
                ))}
              </ul>
            </div>

          </form>
        </div>

        {/* Floating sticky footer */}
        <div style={{position:'sticky', bottom:0, background:'#111214', padding:'1rem 1.5rem', borderTop:'1px solid rgba(255,255,255,0.1)', zIndex:10}}>
          <button type="submit" form="dietBuilderForm" className="btn-set-plan" style={{marginTop:0}}>
            Deploy Protocol to Library
          </button>
        </div>

      </motion.div>
    </div>
  );
}
