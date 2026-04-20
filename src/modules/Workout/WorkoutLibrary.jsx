import React, { useState, useEffect } from 'react';
import { Search, Plus, Sparkles, Clock, Target, Dumbbell } from 'lucide-react';
import { WORKOUT_CATEGORIES, PREDEFINED_WORKOUTS } from '../../data/workouts';
import { EXERCISES } from '../../data/exercises';
import WorkoutDetailModal from './WorkoutDetailModal';
import WorkoutBuilderModal from './WorkoutBuilderModal';
import WorkoutAIGeneratorModal from './WorkoutAIGeneratorModal';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { apiCall } from '../../utils/api';
import './WorkoutLibrary.css';

export default function WorkoutLibrary() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [customPlans, setCustomPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const { userProfile } = useApp();

  // Load custom plans from API
  useEffect(() => {
    const fetchCustom = async () => {
      try {
        const { workouts } = await apiCall('/plans');
        setCustomPlans(workouts || []);
      } catch (e) {
        console.error("Failed to load custom workouts", e);
      }
    };
    fetchCustom();
  }, []);

  const handleDeploy = (plan) => {
    if (plan.type === 'custom' && plan.status === 'pending') {
      alert("This protocol is Under Review by the Admin. You can deploy it once approved.");
      return;
    }
    localStorage.setItem('fx_workout_plan', JSON.stringify(plan));
    navigate('/session');
  };

  const handleSaveCustom = async (newPlan) => {
    try {
      // If editing an approved plan, it goes back to pending
      if (newPlan.status === 'approved') {
        newPlan.status = 'pending';
      }

      if (newPlan._id || newPlan.id) {
        // Update existing - targeting the workout specific PATCH route
        const id = newPlan._id || newPlan.id;
        const saved = await apiCall(`/plans/workout/${id}`, 'PATCH', newPlan);
        setCustomPlans(customPlans.map(p => (p._id === id || p.id === id) ? saved : p));
      } else {
        // Create new
        const saved = await apiCall('/plans/workout', 'POST', newPlan);
        setCustomPlans([saved, ...customPlans]);
      }
      
      setIsBuilderOpen(false);
      setIsAIOpen(false);
      setEditingPlan(null);
      setSelectedPlan(null);
    } catch (e) {
      console.error("Failed to save plan", e);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setIsBuilderOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this custom training protocol?")) {
      try {
        await apiCall(`/plans/workout/${id}`, 'DELETE');
        setCustomPlans(customPlans.filter(p => p._id !== id));
        setSelectedPlan(null);
      } catch (e) {}
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
          <div key={plan.id || plan._id} className={`workout-card glass-card ${plan.status === 'pending' ? 'pending' : ''}`} onClick={() => setSelectedPlan(plan)}>
            <div className="card-top-row">
              <div className="card-title-group">
                <h3 className="protocol-title">{highlightText(plan.name, searchTerm)}</h3>
                {plan.type === 'custom' && (
                  <div className="status-badge-row">
                    <span className={`lib-status-badge ${plan.status}`}>
                      {plan.status === 'pending' ? 'Under Review' : plan.status}
                    </span>
                    <span className="creator-badge">By: {plan.user?.name || 'You'}</span>
                  </div>
                )}
              </div>
              <div className="card-top-right">
                <div className={`card-badge ${plan.type === 'custom' ? 'user-created-tag' : plan.difficulty.toLowerCase()}`}>
                  {plan.type === 'custom' ? 'User Created' : plan.difficulty}
                </div>
              </div>
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
          onEdit={selectedPlan.type === 'custom' ? handleEdit : null}
        />
      )}

      {isBuilderOpen && (
        <WorkoutBuilderModal 
          initialData={editingPlan}
          onSave={handleSaveCustom} 
          onClose={() => {
            setIsBuilderOpen(false);
            setEditingPlan(null);
          }} 
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
