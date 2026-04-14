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

  // Lock body scroll to keep popup perfectly targeted in view
  useEffect(() => {
    if (selectedDiet || isBuilderOpen || isAIOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedDiet, isBuilderOpen, isAIOpen]);

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

  const allDiets = [...customDiets, ...PREDEFINED_DIETS];

  const filteredDiets = allDiets.filter(diet => {
    const term = searchTerm.toLowerCase().trim();

    // Default match (Name & Description)
    let matchesSearch = diet.name.toLowerCase().includes(term) ||
      diet.desc.toLowerCase().includes(term);

    // Upgrade: Smart Token Matching
    if (term === 'keto') matchesSearch = matchesSearch || diet.macros.carbs <= 15;
    if (term === 'high protein' || term === 'protein') matchesSearch = matchesSearch || diet.macros.protein >= 30;
    if (term === 'low carb' || term === 'carb') matchesSearch = matchesSearch || diet.macros.carbs <= 30;
    if (term === 'veg' || term === 'vegetarian') matchesSearch = matchesSearch || diet.name.toLowerCase().includes('veg') || diet.desc.toLowerCase().includes('vegetarian');
    if (term === 'non-veg') matchesSearch = matchesSearch || diet.name.toLowerCase().includes('non-veg') || diet.desc.toLowerCase().includes('chicken') || diet.desc.toLowerCase().includes('fish');
    if (term === 'custom') matchesSearch = matchesSearch || diet.type === 'custom';

    const matchesCategory = activeCategory === 'All' || diet.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Utility to highlight text
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase()
        ? <mark key={i} className="search-highlight">{part}</mark>
        : part
    );
  };

  const handleSaveCustom = (newDiet) => {
    const updated = [newDiet, ...customDiets];
    setCustomDiets(updated);
    localStorage.setItem('fx_custom_diets', JSON.stringify(updated));
    setIsBuilderOpen(false);
  };

  const handleDeleteCustom = (id) => {
    if (window.confirm("Are you sure you want to delete this custom diet?")) {
      const updated = customDiets.filter(d => d.id !== id);
      setCustomDiets(updated);
      localStorage.setItem('fx_custom_diets', JSON.stringify(updated));
      setSelectedDiet(null);
    }
  };

  const handleSetPlan = (diet) => {
    localStorage.setItem('fx_diet_plan', JSON.stringify(diet));
    if (diet.schedule && diet.schedule.length > 0) {
      const newLayout = [];
      const newMeta = {};
      diet.schedule.forEach((node, index) => {
        const slotKey = `protocol_slot_${index}`;
        newLayout.push(slotKey);
        newMeta[slotKey] = { label: node.mealName, time: node.time };
      });
      localStorage.setItem('fx_meals_layout', JSON.stringify(newLayout));
      localStorage.setItem('fx_meals_meta', JSON.stringify(newMeta));
    }
    navigate('/meal');
  };

  return (
    <div className="diet-library-container fade-in">
      <div className="library-header">
        <div>
          <h1>Diet Library</h1>
          <p>Browse predefined nutrition templates or architect your own.</p>
        </div>
        <div className="header-actions-diet">
          <button className="btn-trigger-ai" onClick={() => setIsAIOpen(true)}>
            <Sparkles size={18} /> AI Generator
          </button>
          <button className="btn-add-custom" onClick={() => setIsBuilderOpen(true)}>
            <Plus size={18} /> Custom Diet
          </button>
        </div>
      </div>

      <div className="library-controls glass-card">
        <div className="search-box-wrapper">
          <div className="search-input-group">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search: 'High Protein', 'Veg', 'Keto'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>
          <div className="search-suggestions">
            <span className="suggestion-label">Try:</span>
            {['High Protein', 'Veg', 'Keto', 'Custom'].map(s => (
              <button key={s} onClick={() => setSearchTerm(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="category-scroll-wrapper">
          <div className="category-scroll">
            {DIET_CATEGORIES.map(cat => {
              const icons = {
                'All': '📋',
                'Weight Loss': '🔥',
                'Muscle Gain': '💪',
                'Maintenance': '⚖️',
                'Specialty / Lifestyle': '🌿',
                'Medical / Health': '🏥',
                'Intermittent Fasting': '⏳',
                'Athletic Performance': '⚡',
                'Regional / Indian': '🍛'
              };

              // Count diets in this category
              const count = cat === 'All'
                ? allDiets.length
                : allDiets.filter(d => d.category === cat).length;

              if (count === 0 && cat !== 'All') return null; // Hide empty categories

              return (
                <button
                  key={cat}
                  className={`cat-pill ${activeCategory === cat ? 'active' : ''} ${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span className="cat-icon-mini">{icons[cat] || '🥗'}</span>
                  <span className="cat-name">{cat}</span>
                  <span className="cat-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="diet-grid">
        {filteredDiets.map(diet => (
          <div
            key={diet.id}
            className={`diet-card ${diet.type === 'custom' ? 'custom-card' : ''} ${diet.category === 'AI Generated' ? 'ai-card' : ''}`}
            onClick={() => setSelectedDiet(diet)}
          >
            <div className="card-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {diet.category === 'AI Generated' && <Sparkles size={17} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 5px var(--primary-shadow))' }} />}
                <h3>{highlightText(diet.name, searchTerm)}</h3>
              </div>
              {diet.type === 'custom' && diet.category !== 'AI Generated' && <span className="diet-tag custom-badge">Custom</span>}
              {diet.category === 'AI Generated' && <span className="diet-tag ai-badge">AI Brain</span>}
              {diet.type !== 'custom' && <span className="diet-tag">{diet.category}</span>}
            </div>
            <p>{highlightText(diet.desc.length > 90 ? diet.desc.substring(0, 90) + '...' : diet.desc, searchTerm)}</p>
            <div className="macro-mini-display">
              <div className="m-p" style={{ width: `${diet.macros.protein}%` }}></div>
              <div className="m-c" style={{ width: `${diet.macros.carbs}%` }}></div>
              <div className="m-f" style={{ width: `${diet.macros.fat}%` }}></div>
              <div className="macro-labels-mini">
                <span>P {diet.macros.protein}%</span>
                <span>C {diet.macros.carbs}%</span>
                <span>F {diet.macros.fat}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDiets.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'rgba(255,255,255,0.4)' }}>
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
