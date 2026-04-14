import React, { useState, useEffect } from 'react';
import { Search, Filter, Info, ChevronRight, PlayCircle, Sparkles, Plus } from 'lucide-react';
import { EXERCISES, MUSCLE_GROUPS } from '../../data/exercises';
import ExerciseDetail from './ExerciseDetail';
import './ExerciseLibrary.css';

export default function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [customExercises, setCustomExercises] = useState([]);
  const [isAIScouting, setIsAIScouting] = useState(false);

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

  const handleAIScout = () => {
    if (!searchTerm) return alert("Enter an exercise name to scout!");
    setIsAIScouting(true);
    
    setTimeout(() => {
      const newEx = {
        id: `ai_ex_${Date.now()}`,
        name: searchTerm,
        category: 'AI Discovered',
        icon: '✨',
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
            All
          </button>
          {MUSCLE_GROUPS.map(cat => (
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
              <h3>{ex.name}</h3>
              <span className="ex-tag">{ex.category}</span>
            </div>
            <ChevronRight size={20} className="ex-arrow" />
          </div>
        ))}
      </div>

      {selectedExercise && (
        <ExerciseDetail 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
    </div>
  );
}
