import React, { useState } from 'react';
import { X, Plus, Trash2, Dumbbell, Save } from 'lucide-react';
import { EXERCISES, MUSCLE_GROUPS } from '../../data/exercises';
import './WorkoutBuilderModal.css';

export default function WorkoutBuilderModal({ onSave, onClose }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [category, setCategory] = useState('Bodybuilding');
  const [schedule, setSchedule] = useState([
    { day: 'Monday', focus: '', exercises: [] }
  ]);
  const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(null);

  const addDay = () => {
    setSchedule([...schedule, { day: 'New Day', focus: '', exercises: [] }]);
  };

  const removeDay = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const updateDay = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const removeExercise = (dayIdx, exIdx) => {
    const updated = [...schedule];
    updated[dayIdx].exercises = updated[dayIdx].exercises.filter((_, i) => i !== exIdx);
    setSchedule(updated);
  };

  const addExerciseToDay = (exerciseId) => {
    const updated = [...schedule];
    updated[activeDayIndex].exercises.push({ id: exerciseId, sets: 3, reps: '10-12' });
    setSchedule(updated);
    setIsExercisePickerOpen(false);
  };

  const handleSave = () => {
    if (!name) return alert('Name your protocol first!');
    onSave({
      id: `custom_${Date.now()}`,
      type: 'custom',
      name,
      desc: desc || 'Custom training protocol.',
      difficulty,
      category,
      duration: '60 min',
      tags: ['Custom'],
      schedule
    });
  };

  return (
    <div className="builder-overlay">
      <div className="builder-modal glass">
        <div className="builder-header">
          <div className="builder-title">
             <Dumbbell className="text-primary" />
             <h2>Workout Architect</h2>
          </div>
          <button className="btn-close-builder" onClick={onClose}><X /></button>
        </div>

        <div className="builder-scroll-area">
          <section className="config-section">
            <div className="input-group">
              <label>Protocol Name</label>
              <input 
                type="text" 
                placeholder="e.g. 10-Week Mass Builder" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-row">
               <div className="input-group">
                 <label>Difficulty</label>
                 <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                 </select>
               </div>
               <div className="input-group">
                 <label>Goal Category</label>
                 <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Bodybuilding</option>
                    <option>Strength / Power</option>
                    <option>Weight Loss / HIIT</option>
                    <option>Home / No Equipment</option>
                 </select>
               </div>
            </div>
          </section>

          <section className="days-section">
            <div className="section-header">
              <h3>Weekly Schedule</h3>
              <button className="btn-add-day" onClick={addDay}><Plus size={16} /> Add Day</button>
            </div>

            {schedule.map((day, dIdx) => (
              <div key={dIdx} className="builder-day-card">
                <div className="day-card-header">
                  <input 
                    className="inp-day-name"
                    value={day.day} 
                    onChange={(e) => updateDay(dIdx, 'day', e.target.value)}
                  />
                  <input 
                    className="inp-day-focus"
                    placeholder="Focus: Chest/Back etc."
                    value={day.focus} 
                    onChange={(e) => updateDay(dIdx, 'focus', e.target.value)}
                  />
                  <button className="btn-remove-day" onClick={() => removeDay(dIdx)}><Trash2 size={16} /></button>
                </div>

                <div className="day-exercise-list">
                  {day.exercises.map((ex, eIdx) => {
                    const exInfo = EXERCISES.find(e => e.id === ex.id);
                    return (
                      <div key={eIdx} className="builder-ex-row">
                        <span className="ex-icon">{exInfo?.icon || '💪'}</span>
                        <span className="ex-name">{exInfo?.name || ex.id}</span>
                        <div className="ex-inputs">
                           <input type="text" value={ex.sets} onChange={(e) => {
                             const updated = [...schedule];
                             updated[dIdx].exercises[eIdx].sets = e.target.value;
                             setSchedule(updated);
                           }} placeholder="Sets" />
                           <input type="text" value={ex.reps} onChange={(e) => {
                             const updated = [...schedule];
                             updated[dIdx].exercises[eIdx].reps = e.target.value;
                             setSchedule(updated);
                           }} placeholder="Reps" />
                        </div>
                        <button className="btn-remove-ex" onClick={() => removeExercise(dIdx, eIdx)}><X size={14} /></button>
                      </div>
                    )
                  })}
                  <button className="btn-pick-exercise" onClick={() => {
                    setActiveDayIndex(dIdx);
                    setIsExercisePickerOpen(true);
                  }}>
                    <Plus size={14} /> Add Exercise
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="builder-footer">
           <button className="btn-cancel" onClick={onClose}>Discard</button>
           <button className="btn-save-protocol" onClick={handleSave}>
              <Save size={18} /> Save Protocol
           </button>
        </div>
      </div>

      {isExercisePickerOpen && (
        <ExercisePicker 
          onSelect={addExerciseToDay} 
          onClose={() => setIsExercisePickerOpen(false)} 
        />
      )}
    </div>
  );
}

function ExercisePicker({ onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const list = EXERCISES.filter(ex => 
    (cat === 'All' || ex.category === cat) && 
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="picker-overlay">
      <div className="picker-modal">
        <div className="picker-header">
           <input 
             autoFocus
             placeholder="Search exercises..." 
             value={search} 
             onChange={(e) => setSearch(e.target.value)} 
           />
           <button onClick={onClose}><X /></button>
        </div>
        <div className="picker-cats">
           <button className={cat === 'All' ? 'active' : ''} onClick={() => setCat('All')}>All</button>
           {MUSCLE_GROUPS.map(m => (
             <button key={m} className={cat === m ? 'active' : ''} onClick={() => setCat(m)}>{m}</button>
           ))}
        </div>
        <div className="picker-list">
           {list.map(ex => (
             <button key={ex.id} onClick={() => onSelect(ex.id)}>
                <span>{ex.icon}</span> {ex.name}
             </button>
           ))}
        </div>
      </div>
    </div>
  )
}
