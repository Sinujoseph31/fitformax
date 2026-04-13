import React, { useState, useEffect } from 'react';
import { Search, Plus, Sparkles } from 'lucide-react';
import { DIET_CATEGORIES, PREDEFINED_DIETS } from '../../data/diets';
import DietDetailModal from './DietDetailModal';
import DietBuilderModal from './DietBuilderModal';
import DietAIGeneratorModal from './DietAIGeneratorModal';
import { useNavigate } from 'react-router-dom';
import './DietLibrary.css';

export default function DietLibrary() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [customDiets, setCustomDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Load custom diets from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fx_custom_diets');
    if (saved) {
      try {
        setCustomDiets(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load custom diets", e);
      }
    }
  }, []);

  const allDiets = [...PREDEFINED_DIETS, ...customDiets];

  const filteredDiets = allDiets.filter(diet => {
    const matchesSearch = diet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          diet.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || diet.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveCustom = (newDiet) => {
    const updated = [...customDiets, newDiet];
    setCustomDiets(updated);
    localStorage.setItem('fx_custom_diets', JSON.stringify(updated));
    setIsBuilderOpen(false);
  };

  const handleDeleteCustom = (id) => {
    if(window.confirm("Are you sure you want to delete this custom diet?")) {
      const updated = customDiets.filter(d => d.id !== id);
      setCustomDiets(updated);
      localStorage.setItem('fx_custom_diets', JSON.stringify(updated));
      setSelectedDiet(null);
    }
  };

  const handleSetPlan = (diet) => {
    // 1. Save standard dashboard game state
    localStorage.setItem('fx_diet_plan', JSON.stringify(diet));

    // 2. Clone schedule into Tracker layout UI
    if (diet.schedule && diet.schedule.length > 0) {
      const newLayout = [];
      const newMeta = {};

      diet.schedule.forEach((node, index) => {
        const slotKey = `protocol_slot_${index}`;
        newLayout.push(slotKey);
        newMeta[slotKey] = {
          label: node.mealName,
          time: node.time,
        };
      });

      localStorage.setItem('fx_meals_layout', JSON.stringify(newLayout));
      localStorage.setItem('fx_meals_meta', JSON.stringify(newMeta));
    }

    // 3. Navigate back to the daily meal tracker 
    navigate('/meal');
  };

  return (
    <div className="diet-library-container fade-in">
      <div className="library-header">
        <div>
          <h1>Diet Library</h1>
          <p>Browse predefined nutrition templates or architect your own.</p>
        </div>
        <div style={{display:'flex', gap:'12px'}}>
          <button className="btn-trigger-ai" onClick={() => setIsAIOpen(true)}>
            <Sparkles size={18} /> AI Generator
          </button>
          <button className="btn-add-custom" onClick={() => setIsBuilderOpen(true)}>
            <Plus size={18} /> Custom Diet
          </button>
        </div>
      </div>

      <div className="library-controls glass-card">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search diets by name or focus..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-scroll">
          {DIET_CATEGORIES.map(cat => (
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

      <div className="diet-grid">
        {filteredDiets.map(diet => (
          <div 
            key={diet.id} 
            className={`diet-card ${diet.type === 'custom' ? 'custom-card' : ''}`}
            onClick={() => setSelectedDiet(diet)}
          >
            <div className="card-top">
              <h3>{diet.name}</h3>
              {diet.type === 'custom' && <span className="diet-tag custom-badge">Custom</span>}
              {diet.type !== 'custom' && <span className="diet-tag">{diet.category}</span>}
            </div>
            <p>{diet.desc.length > 90 ? diet.desc.substring(0, 90) + '...' : diet.desc}</p>
            <div className="macro-mini-display">
              <div className="m-p" style={{width: `${diet.macros.protein}%`}}></div>
              <div className="m-c" style={{width: `${diet.macros.carbs}%`}}></div>
              <div className="m-f" style={{width: `${diet.macros.fat}%`}}></div>
            </div>
          </div>
        ))}
      </div>

      {filteredDiets.length === 0 && (
        <div style={{textAlign:'center', marginTop:'4rem', color:'rgba(255,255,255,0.4)'}}>
          <p>No diets found matching your search.</p>
        </div>
      )}

      {selectedDiet && (
        <DietDetailModal 
          diet={selectedDiet} 
          onClose={() => setSelectedDiet(null)} 
          onSetPlan={handleSetPlan}
          onDelete={selectedDiet.type === 'custom' ? handleDeleteCustom : null}
        />
      )}

      {isBuilderOpen && (
        <DietBuilderModal 
          onClose={() => setIsBuilderOpen(false)}
          onSave={handleSaveCustom}
        />
      )}

      {isAIOpen && (
        <DietAIGeneratorModal 
          onClose={() => setIsAIOpen(false)}
          onSave={(generatedDiet) => {
             handleSaveCustom(generatedDiet);
             setIsAIOpen(false);
          }}
        />
      )}
    </div>
  );
}
