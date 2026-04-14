import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Clock, Scale } from 'lucide-react';
import { DIET_CATEGORIES } from '../../data/diets';
import './DietLibrary.css';

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
    setFormData({ ...formData, rules: formData.rules.filter((_, i) => i !== idx) });
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
    setFormData({ ...formData, schedule: formData.schedule.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalMacros = formData.macros.protein + formData.macros.carbs + formData.macros.fat;
    if (totalMacros !== 100) {
      alert(`Macros must equal 100%. Currently at ${totalMacros}%.`);
      return;
    }
    onSave({ ...formData, id: `custom_${Date.now()}`, type: 'custom' });
  };

  const validCategories = DIET_CATEGORIES.filter(c => c !== 'All');

  return (
    <div className="ai-gen-overlay" style={{zIndex: 15000}}>
      <motion.div 
        className="ai-gen-modal glass"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="ai-gen-header">
           <div className="ai-title">
             <Scale className="sparkle-icon" size={24} />
             <h2>Protocol Architect</h2>
           </div>
           <button onClick={onClose} className="btn-close-ai"><X /></button>
        </div>

        <div className="ai-gen-body" style={{maxHeight:'75vh', overflowY:'auto'}}>
          <form onSubmit={handleSubmit} id="dietBuilderForm" className="gen-params">
            
            <div className="param-item grid-2-col">
              <div>
                <label>Protocol Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. The Apex Predator" />
              </div>
              <div>
                <label>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {validCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="param-item">
              <label>Description</label>
              <textarea required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} rows={2} placeholder="Briefly describe this protocol..." />
            </div>

            <div className="param-item">
              <label>Macro Split Targets (%) - Target 100%</label>
              <div className="grid-2-col" style={{gridTemplateColumns: 'repeat(3, 1fr)', gap:'10px'}}>
                <div>
                  <label style={{color:'#60a5fa', fontSize:'0.7rem', paddingBottom:'4px'}}>PROTEIN</label>
                  <input type="number" min="0" max="100" value={formData.macros.protein} onChange={e => handleMacroChange(e, 'protein')} />
                </div>
                <div>
                  <label style={{color:'#f59e0b', fontSize:'0.7rem', paddingBottom:'4px'}}>CARBS</label>
                  <input type="number" min="0" max="100" value={formData.macros.carbs} onChange={e => handleMacroChange(e, 'carbs')} />
                </div>
                <div>
                  <label style={{color:'#f472b6', fontSize:'0.7rem', paddingBottom:'4px'}}>FAT</label>
                  <input type="number" min="0" max="100" value={formData.macros.fat} onChange={e => handleMacroChange(e, 'fat')} />
                </div>
              </div>
            </div>

            <div className="param-item">
              <label style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <Clock size={16} /> Daily Meal Timeline
              </label>
              
              <div className="protocol-timeline-builder" style={{marginBottom:'1rem'}}>
                {formData.schedule.map((entry, idx) => (
                  <div key={idx} className="timeline-block-mini" style={{display:'flex', justifyContent:'space-between', background:'rgba(255,255,255,0.03)', padding:'10px', borderRadius:'10px', marginBottom:'8px', border:'1px solid rgba(255,255,255,0.05)'}}>
                    <div>
                      <span style={{color:'#8b5cf6', fontWeight:800, fontSize:'0.75rem'}}>{entry.time}</span>
                      <h4 style={{margin:0, fontSize:'0.9rem'}}>{entry.mealName}</h4>
                    </div>
                    <button type="button" onClick={() => removeMeal(idx)} style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer'}}><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>

              <div className="add-meal-compact" style={{background:'rgba(139, 92, 246, 0.05)', border:'1px dashed rgba(139, 92, 246, 0.3)', padding:'15px', borderRadius:'15px'}}>
                <div className="grid-2-col" style={{marginBottom:'10px'}}>
                   <input type="text" placeholder="Time (08:00 AM)" value={newMeal.time} onChange={e => setNewMeal({...newMeal, time: e.target.value})} />
                   <input type="text" placeholder="Meal Name" value={newMeal.mealName} onChange={e => setNewMeal({...newMeal, mealName: e.target.value})} />
                </div>
                <textarea 
                  rows={2} 
                  placeholder="Items (one per line)..." 
                  value={newMeal.itemsInput} 
                  onChange={e => setNewMeal({...newMeal, itemsInput: e.target.value})} 
                  style={{marginBottom:'10px'}}
                />
                <button type="button" onClick={addMeal} className="btn-add-item-mini" style={{width:'100%', padding:'10px', background:'rgba(139, 92, 246, 0.2)', border:'1px solid rgba(139, 92, 246, 0.4)', color:'#c4b5fd', borderRadius:'10px', cursor:'pointer', fontWeight:800}}>
                  + Add to Timeline
                </button>
              </div>
            </div>

            <div className="param-item">
               <label>Habit Rules</label>
               <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
                  <input value={newRule} onChange={e => setNewRule(e.target.value)} placeholder="e.g. No alcohol" onKeyDown={(e)=>e.key==='Enter' && (e.preventDefault(), addRule())} />
                  <button type="button" onClick={addRule} style={{padding:'0 15px', background:'#8b5cf6', border:'none', borderRadius:'10px', color:'#fff', cursor:'pointer'}}>+</button>
               </div>
               <div className="rules-list-mini">
                  {formData.rules.map((r, i) => (
                    <div key={i} style={{background:'rgba(255,255,255,0.02)', padding:'6px 12px', borderRadius:'8px', display:'flex', justifyContent:'space-between', marginBottom:'4px', fontSize:'0.85rem'}}>
                       <span>{r}</span>
                       <Trash2 size={14} color="#ef4444" style={{cursor:'pointer'}} onClick={()=>removeRule(i)} />
                    </div>
                  ))}
               </div>
            </div>

            <button type="submit" className="btn-generate-ai" style={{marginTop:'1rem'}}>
              Deploy Protocol to Library
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
