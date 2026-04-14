import React, { useState, useEffect } from 'react';
import { Search, Plus, Sparkles, Clock, Target, Dumbbell } from 'lucide-react';
import { WORKOUT_CATEGORIES, PREDEFINED_WORKOUTS } from '../../data/workouts';
import { EXERCISES } from '../../data/exercises';
import WorkoutDetailModal from './WorkoutDetailModal';
import WorkoutBuilderModal from './WorkoutBuilderModal';
import WorkoutAIGeneratorModal from './WorkoutAIGeneratorModal';
import { useNavigate } from 'react-router-dom';
import './WorkoutLibrary.css';

export default function WorkoutLibrary() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [customPlans, setCustomPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Load custom plans from local storage
  useEffect(() => {
    const saved = localStorage.getItem('fx_custom_workouts');
    if (saved) {
      try {
        setCustomPlans(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load custom workouts", e);
      }
    }
  }, []);

  const handleDeploy = (plan) => {
    localStorage.setItem('fx_workout_plan', JSON.stringify(plan));
    navigate('/session');
  };

  const handleSaveCustom = (newPlan) => {
    const updated = [newPlan, ...customPlans];
    setCustomPlans(updated);
    localStorage.setItem('fx_custom_workouts', JSON.stringify(updated));
    setIsBuilderOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this custom training protocol?")) {
      const updated = customPlans.filter(p => p.id !== id);
      setCustomPlans(updated);
      localStorage.setItem('fx_custom_workouts', JSON.stringify(updated));
      setSelectedPlan(null);
    }
  };

  const allPlans = [...customPlans, ...PREDEFINED_WORKOUTS];

  const filteredPlans = allPlans.filter(plan => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = plan.name.toLowerCase().includes(term) || 
                          plan.desc.toLowerCase().includes(term) ||
                          (plan.tags && plan.tags.some(t => t.toLowerCase().includes(term)));
    
    const matchesCategory = activeCategory === 'All' || plan.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <mark key={i} className="search-highlight">{part}</mark> 
        : part
    );
  };

  return (
    <div className="workout-library-container fade-in">
      <div className="library-header">
        <div>
          <h1>Workout Library</h1>
          <p>Explore world-class training protocols or engineer your own split.</p>
        </div>
        <div className="header-actions">
           <button className="btn-trigger-ai" onClick={() => setIsAIOpen(true)}>
              <Sparkles size={18} /> AI Architect
           </button>
           <button className="btn-add-custom" onClick={() => setIsBuilderOpen(true)}>
              <Plus size={18} /> New Plan
           </button>
        </div>
      </div>

      <div className="library-controls glass-card">
        <div className="search-box-wrapper">
          <div className="search-input-group">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search: 'Bro Split', 'Strength', 'PPL'..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="category-scroll-wrapper">
          <div className="category-scroll">
            {WORKOUT_CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="workout-grid">
        {filteredPlans.map(plan => (
          <div key={plan.id} className="workout-card glass-card" onClick={() => setSelectedPlan(plan)}>
            <div className="card-top-row">
              <h3>{highlightText(plan.name, searchTerm)}</h3>
              <div className="card-badge">{plan.difficulty}</div>
            </div>
            <div className="card-main">
              <p>{highlightText(plan.desc.length > 80 ? plan.desc.substring(0, 80) + '...' : plan.desc, searchTerm)}</p>
            </div>
            <div className="card-footer">
              <div className="footer-meta">
                <span><Clock size={14} /> {plan.duration}</span>
                <span><Dumbbell size={14} /> {plan.schedule.length} Days</span>
              </div>
              <div className="card-tags">
                {plan.tags.slice(0, 2).map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="empty-state">
          <p>No training protocols found matching your criteria.</p>
        </div>
      )}

      {selectedPlan && (
        <WorkoutDetailModal 
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onDeploy={handleDeploy}
          onDelete={selectedPlan.type === 'custom' ? handleDelete : null}
        />
      )}

      {isBuilderOpen && (
        <WorkoutBuilderModal 
          onSave={handleSaveCustom} 
          onClose={() => setIsBuilderOpen(false)} 
        />
      )}

      {isAIOpen && (
        <WorkoutAIGeneratorModal 
          onSave={handleSaveCustom} 
          onClose={() => setIsAIOpen(false)} 
        />
      )}
    </div>
  );
}
