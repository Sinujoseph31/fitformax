import React, { useState, useEffect } from 'react';
import { Search, Filter, Info, ChevronRight, PlayCircle, Sparkles, Plus, X } from 'lucide-react';
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
    muscles: '', description: '', steps: '', mistakes: '', icon: '💪',
    gifUrl: ''
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
      gifUrl: newCustomEx.gifUrl || '',
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
            className="btn-custom-add"
            onClick={() => setIsAddingCustom(true)}
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
            <span className="cat-label">All</span> <span className="cat-count">{allExercises.length}</span>
          </button>
          {MUSCLE_GROUPS.map(cat => {
            const count = allExercises.filter(ex => ex.category === cat).length;
            return (
              <button 
                key={cat}
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span className="cat-label">{cat}</span> <span className="cat-count">{count}</span>
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
          <div className="ed-modal custom-ex-modal" onClick={e => e.stopPropagation()}>
            <button className="ed-close" style={{ top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setIsAddingCustom(false)}>
              <X size={18} />
            </button>
            <div className="ed-scroll-content" style={{ padding: '2rem' }}>
              <div className="modal-header-simple">
                <h2 className="modal-title">Create Custom Exercise</h2>
                <p className="modal-subtitle">Add your unique protocol to the neural library.</p>
              </div>
              
              <div className="custom-ex-form">
                <div className="input-group">
                  <label>Basic Information</label>
                  <div className="input-row-grid">
                    <input 
                      type="text" 
                      placeholder="Exercise Name" 
                      value={newCustomEx.name}
                      onChange={e => {
                        const val = e.target.value;
                        setNewCustomEx({...newCustomEx, name: val, icon: guessEmoji(val)});
                      }}
                    />
                    <input 
                      type="text" 
                      placeholder="Emoji" 
                      className="emoji-input"
                      value={newCustomEx.icon}
                      onChange={e => setNewCustomEx({...newCustomEx, icon: e.target.value})}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Classification</label>
                  <div className="input-row-grid split">
                    <select
                      value={newCustomEx.category}
                      onChange={e => setNewCustomEx({...newCustomEx, category: e.target.value})}
                    >
                      <option value="" disabled>Category</option>
                      {MUSCLE_GROUPS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select
                      value={newCustomEx.equipment}
                      onChange={e => setNewCustomEx({...newCustomEx, equipment: e.target.value})}
                    >
                      <option value="" disabled>Equipment</option>
                      {EQUIPMENT.map(eq => <option key={eq} value={eq}>{eq}</option>)}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Targeting & Visuals</label>
                  <input 
                    type="text" 
                    placeholder="Muscles (e.g. Quads, Glutes)" 
                    value={newCustomEx.muscles}
                    onChange={e => setNewCustomEx({...newCustomEx, muscles: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Video/GIF URL (Direct Link)" 
                    value={newCustomEx.gifUrl}
                    onChange={e => setNewCustomEx({...newCustomEx, gifUrl: e.target.value})}
                  />
                </div>

                <div className="input-group">
                  <label>Institutional Knowledge</label>
                  <textarea 
                    placeholder="Description" 
                    value={newCustomEx.description}
                    onChange={e => setNewCustomEx({...newCustomEx, description: e.target.value})}
                    className="desc-textarea"
                  />
                  <div className="input-row-grid split">
                    <textarea 
                      placeholder="Steps (1 per line)" 
                      value={newCustomEx.steps}
                      onChange={e => setNewCustomEx({...newCustomEx, steps: e.target.value})}
                    />
                    <textarea 
                      placeholder="Mistakes (1 per line)" 
                      value={newCustomEx.mistakes}
                      onChange={e => setNewCustomEx({...newCustomEx, mistakes: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-actions-fixed">
                <button className="btn-modal-cancel" onClick={() => setIsAddingCustom(false)}>Cancel</button>
                <button className="btn-modal-save" onClick={handleAddCustom}>Initialize Exercise</button>
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
