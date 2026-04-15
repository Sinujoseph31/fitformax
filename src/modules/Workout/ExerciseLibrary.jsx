import React, { useState, useEffect } from 'react';
import { Search, Filter, Info, ChevronRight, PlayCircle, Sparkles, Plus } from 'lucide-react';
import { EXERCISES, MUSCLE_GROUPS, EQUIPMENT } from '../../data/exercises';
import ExerciseDetail from './ExerciseDetail';
import './ExerciseLibrary.css';

export default function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [customExercises, setCustomExercises] = useState([]);
  const [isAIScouting, setIsAIScouting] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  
  const defaultCustomEx = { 
    name: '', category: 'Chest', equipment: 'Bodyweight', 
    muscles: '', description: '', steps: '', mistakes: '', icon: '💪' 
  };
  const [newCustomEx, setNewCustomEx] = useState(defaultCustomEx);

  useEffect(() => {
    const saved = localStorage.getItem('fx_custom_exercises');
    if (saved) setCustomExercises(JSON.parse(saved));
  }, []);

  const allExercises = [...customExercises, ...EXERCISES];

  const filteredExercises = allExercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || ex.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddCustom = () => {
    if (!newCustomEx.name) return alert("Enter exercise name");
    const newEx = {
      id: `custom_ex_${Date.now()}`,
      name: newCustomEx.name,
      category: newCustomEx.category,
      equipment: newCustomEx.equipment,
      status: 'Custom Added',
      icon: newCustomEx.icon || '💪',
      description: newCustomEx.description || 'Manually added custom user exercise.',
      muscles: newCustomEx.muscles ? newCustomEx.muscles.split(',').map(m => m.trim()) : [newCustomEx.category],
      steps: newCustomEx.steps ? newCustomEx.steps.split('\n').filter(s => s.trim()) : ['Perform the movement with control'],
      mistakes: newCustomEx.mistakes ? newCustomEx.mistakes.split('\n').filter(m => m.trim()) : ['Improper form'],
      type: 'custom'
    };
    const updated = [newEx, ...customExercises];
    setCustomExercises(updated);
    localStorage.setItem('fx_custom_exercises', JSON.stringify(updated));
    setIsAddingCustom(false);
    setNewCustomEx(defaultCustomEx);
  };

  const guessEmoji = (name, isAI = false) => {
    const n = name.toLowerCase();
    if (n.includes('push')) return '🧱';
    if (n.includes('bench') || n.includes('press') || n.includes('barbell') || n.includes('db')) return '🏋️‍♂️';
    if (n.includes('fly')) return '🦋';
    if (n.includes('deadlift') || n.includes('hinge')) return '⚡';
    if (n.includes('pull') || n.includes('chin')) return '🦇';
    if (n.includes('row')) return '🚣';
    if (n.includes('squat') || n.includes('leg') || n.includes('lunge') || n.includes('calf')) return '🦵';
    if (n.includes('run') || n.includes('sprint') || n.includes('jog') || n.includes('treadmill')) return '🏃';
    if (n.includes('yoga') || n.includes('stretch')) return '🧘';
    if (n.includes('jump') || n.includes('box') || n.includes('burpee')) return '🐸';
    if (n.includes('curl') || n.includes('arm') || n.includes('tri') || n.includes('bi')) return '💪';
    if (n.includes('abs') || n.includes('core') || n.includes('plank')) return '🧱';
    if (n.includes('shoulder') || n.includes('delt')) return '⛰️';
    return isAI ? '✨' : '💪';
  };

  const handleAIScout = () => {
    if (!searchTerm) return alert("Enter an exercise name to scout!");
    setIsAIScouting(true);
    
    setTimeout(() => {
      const newEx = {
        id: `ai_ex_${Date.now()}`,
        name: searchTerm,
        category: activeCategory === 'All' ? 'Chest' : activeCategory,
        status: 'Pending Approval',
        icon: guessEmoji(searchTerm, true),
        description: `Neural analysis for ${searchTerm}. This is an AI-suggested variant optimized for biomechanical efficiency.`,
        muscles: ['Target Muscle', 'Core'],
        steps: ['Perform the movement with control', 'Focus on the mind-muscle connection', 'Maintain steady breathing'],
        mistakes: ['Rushing the movement', 'Using excessive weight', 'Loss of core tension'],
        type: 'ai'
      };
      const updated = [newEx, ...customExercises];
      setCustomExercises(updated);
      localStorage.setItem('fx_custom_exercises', JSON.stringify(updated));
      setIsAIScouting(false);
      setSearchTerm('');
      setSelectedExercise(newEx); // Instantly open it so the user knows it worked
    }, 2000);
  };

  return (
    <div className="exercise-library-container fade-in">
      <div className="library-header">
        <h1>Exercise Library</h1>
        <p>Master your form with professional guides and tips.</p>
      </div>

      <div className="library-controls glass-card">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search 100+ exercises..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => setIsAddingCustom(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px 16px', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <Plus size={16} /> Custom
          </button>
          <button 
            className={`btn-ai-scout ${isAIScouting ? 'loading' : ''}`}
            onClick={handleAIScout}
            disabled={isAIScouting}
          >
            {isAIScouting ? <div className="dot-pulse" /> : <><Sparkles size={16} /> AI Scout</>}
          </button>
        </div>
        
        <div className="category-scroll">
          <button 
            className={`cat-pill ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            All <span className="cat-count">{allExercises.length}</span>
          </button>
          {MUSCLE_GROUPS.map(cat => {
            const count = allExercises.filter(ex => ex.category === cat).length;
            return (
              <button 
                key={cat}
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} <span className="cat-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="exercise-grid">
        {filteredExercises.map(ex => (
          <div 
            key={ex.id} 
            className="exercise-card glass-card"
            onClick={() => setSelectedExercise(ex)}
          >
            <div className="ex-icon-box">
              <span className="ex-emoji">{ex.icon}</span>
            </div>
            <div className="ex-content">
              <h3 style={{ display: 'flex', alignItems: 'center' }}>
                {ex.name}
                {ex.type === 'ai' && <span className="ai-badge">AI</span>}
              </h3>
              <span className="ex-tag">{ex.category}</span>
              {ex.status === 'Pending Approval' && <div className="approval-badge">Pending Approval</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {ex.id.startsWith('ai_ex_') && (
                <button 
                  className="btn-delete-ex"
                  onClick={(e) => {
                    e.stopPropagation();
                    const updated = customExercises.filter(ce => ce.id !== ex.id);
                    setCustomExercises(updated);
                    localStorage.setItem('fx_custom_exercises', JSON.stringify(updated));
                    if (selectedExercise?.id === ex.id) setSelectedExercise(null);
                  }}
                >
                  Delete
                </button>
              )}
              <ChevronRight size={20} className="ex-arrow" />
            </div>
          </div>
        ))}
      </div>

      {isAddingCustom && (
        <div className="ed-overlay" onClick={() => setIsAddingCustom(false)}>
          <div className="ed-modal" onClick={e => e.stopPropagation()} style={{ padding: '2rem', height: 'auto', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Create Custom Exercise</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 70px', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Exercise Name" 
                  value={newCustomEx.name}
                  onChange={e => {
                    const val = e.target.value;
                    setNewCustomEx({...newCustomEx, name: val, icon: guessEmoji(val)});
                  }}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', fontSize: '1rem', outline: 'none' }}
                />
                <input 
                  type="text" 
                  placeholder="Emoji" 
                  title="Emoji Icon"
                  value={newCustomEx.icon}
                  onChange={e => setNewCustomEx({...newCustomEx, icon: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', fontSize: '1rem', outline: 'none', textAlign: 'center' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <select
                  value={newCustomEx.category}
                  onChange={e => setNewCustomEx({...newCustomEx, category: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', background: '#111827', border: '1px solid var(--border)', color: 'white', fontSize: '1rem', outline: 'none' }}
                >
                  <option value="" disabled>Select Category</option>
                  {MUSCLE_GROUPS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select
                  value={newCustomEx.equipment}
                  onChange={e => setNewCustomEx({...newCustomEx, equipment: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', background: '#111827', border: '1px solid var(--border)', color: 'white', fontSize: '1rem', outline: 'none' }}
                >
                  <option value="" disabled>Select Equipment</option>
                  {EQUIPMENT.map(eq => <option key={eq} value={eq}>{eq}</option>)}
                </select>
              </div>
              <input 
                type="text" 
                placeholder="Target Muscles (comma separated, e.g. Upper Chest, Triceps)" 
                value={newCustomEx.muscles}
                onChange={e => setNewCustomEx({...newCustomEx, muscles: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', fontSize: '1rem', outline: 'none' }}
              />
              <textarea 
                placeholder="Description" 
                value={newCustomEx.description}
                onChange={e => setNewCustomEx({...newCustomEx, description: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', minHeight: '60px', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <textarea 
                  placeholder="Steps (1 per line)" 
                  value={newCustomEx.steps}
                  onChange={e => setNewCustomEx({...newCustomEx, steps: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', minHeight: '100px', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
                <textarea 
                  placeholder="Common Mistakes (1 per line)" 
                  value={newCustomEx.mistakes}
                  onChange={e => setNewCustomEx({...newCustomEx, mistakes: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white', minHeight: '100px', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button onClick={() => setIsAddingCustom(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                <button onClick={handleAddCustom} style={{ flex: 1, padding: '12px', background: 'var(--primary)', border: 'none', color: 'black', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}>Save Exercise</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedExercise && (
        <ExerciseDetail 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
    </div>
  );
}
