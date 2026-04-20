import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Clock, 
  Dumbbell, 
  ChevronRight, 
  X, 
  Search,
  Check,
  Activity
} from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { useApp } from '../../context/AppContext';
import HapticService from '../../services/HapticService';
import { EXERCISES, MUSCLE_GROUPS } from '../../data/exercises';
import AIFormCoach from './AIFormCoach';
import './WorkoutSession.css';

export default function WorkoutSession({ onFinish }) {
  const { saveWorkout, loading } = useApp();
  const [workoutName, setWorkoutName] = useState('Morning Session');
  const [activeExercises, setActiveExercises] = useState([]);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startTime] = useState(new Date());
  const [activeCoachExercise, setActiveCoachExercise] = useState(null);
  
  const [activeDayIdx, setActiveDayIdx] = useState(null);
  const [expandedInstanceId, setExpandedInstanceId] = useState(null);
  
  // Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const timerRef = useRef(null);

  useEffect(() => {
    // ONE-TIME INITIALIZATION
    const deployedPlanStr = localStorage.getItem('fx_workout_plan');
    if (deployedPlanStr) {
      try {
        const plan = JSON.parse(deployedPlanStr);
        setWorkoutName(plan.name);
        
        const completedDays = JSON.parse(localStorage.getItem('fx_completed_days') || '[]');
        const planId = plan.id || plan.name?.replace(/\s+/g, '_').toLowerCase() || 'default_plan';
        
        const dayIdx = plan.schedule.findIndex((d, idx) => {
           const isDone = completedDays.includes(`${planId}_${idx}`);
           const isWorkDay = d.exercises?.length > 0;
           return !isDone && isWorkDay;
        });

        if (dayIdx !== -1) {
          const dayWithWork = plan.schedule[dayIdx];
          setActiveDayIdx(dayIdx);
          const exercisesToLoad = dayWithWork.exercises.map(exRef => {
            const exData = EXERCISES.find(e => e.id === exRef.id);
            return {
              ...(exData || {}),
              id: exRef.id,
              instanceId: Math.random() + Date.now() + Math.random(),
              sets: Array(parseInt(exRef.sets) || 3).fill(null).map(() => ({
                weight: '',
                reps: exRef.reps || '10',
                isCompleted: false
              }))
            };
          });
          setActiveExercises(exercisesToLoad);
          if (exercisesToLoad.length > 0) {
            setExpandedInstanceId(exercisesToLoad[0].instanceId);
          }
        }
      } catch (err) {
        console.error("Failed to load deployed plan", err);
      }
    }
  }, []); // Run ONLY once on mount

  // RESET TIMER LOGIC
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      HapticService.notification(); 
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, timerSeconds]);

  const startRestTimer = () => {
    setTimerSeconds(60);
    setIsTimerRunning(true);
  };

  const addExercise = (exercise) => {
    const newEx = {
      ...exercise,
      instanceId: Date.now(),
      sets: [{ weight: '', reps: '', isCompleted: false }]
    };
    setActiveExercises([...activeExercises, newEx]);
    setExpandedInstanceId(newEx.instanceId);
    setShowExercisePicker(false);
    setSearchQuery('');
  };

  const removeExercise = (instanceId) => {
    setActiveExercises(activeExercises.filter(ex => ex.instanceId !== instanceId));
  };

  const addSet = (instanceId) => {
    setActiveExercises(activeExercises.map(ex => {
      if (ex.instanceId === instanceId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [...ex.sets, { weight: lastSet.weight, reps: lastSet.reps, isCompleted: false }]
        };
      }
      return ex;
    }));
  };

  const updateSet = (instanceId, setIdx, field, value) => {
    setActiveExercises(activeExercises.map(ex => {
      if (ex.instanceId === instanceId) {
        const newSets = [...ex.sets];
        newSets[setIdx] = { ...newSets[setIdx], [field]: value };
        return { ...ex, sets: newSets };
      }
      return ex;
    }));
  };

  const toggleSetComplete = (instanceId, setIdx) => {
    setActiveExercises(activeExercises.map(ex => {
      if (ex.instanceId === instanceId) {
        const newSets = [...ex.sets];
        const wasCompleted = newSets[setIdx].isCompleted;
        newSets[setIdx].isCompleted = !wasCompleted;
        
        if (!wasCompleted) {
          HapticService.impact(); // Tactile feedback on completion
          startRestTimer();
        }
        
        return { ...ex, sets: newSets };
      }
      return ex;
    }));
  };

  const handleFinishWorkout = async () => {
    if (activeExercises.length === 0) return;
    
    // Auto-mark day as completed in dashboard schedule if it's from a plan
    if (activeDayIdx !== null) {
       const deployedPlanStr = localStorage.getItem('fx_workout_plan');
       if (deployedPlanStr) {
          const plan = JSON.parse(deployedPlanStr);
          const planId = plan.id || plan.name?.replace(/\s+/g, '_').toLowerCase() || 'default_plan';
          const completedDays = JSON.parse(localStorage.getItem('fx_completed_days') || '[]');
          const dayKey = `${planId}_${activeDayIdx}`;
          if (!completedDays.includes(dayKey)) {
             completedDays.push(dayKey);
             localStorage.setItem('fx_completed_days', JSON.stringify(completedDays));
          }
       }
    }

    const workoutData = {
      name: workoutName,
      startTime,
      endTime: new Date(),
      exercises: activeExercises.map(ex => ({
        exerciseId: ex.id,
        name: ex.name,
        sets: ex.sets
          .filter(s => s.reps > 0 || s.isCompleted) // Take anything logged or checked
          .map(s => ({
            weight: Number(s.weight) || 0,
            reps: Number(s.reps) || 0,
            isCompleted: s.isCompleted
          }))
      })).filter(ex => ex.sets.length > 0) // Only save exercises with sets
    };

    const success = await saveWorkout(workoutData);
    if (success) {
      HapticService.notification();
      onFinish();
    } else {
      alert("⚠️ SAVE FAILED: The Neural Engine (Backend Server) appears to be offline. Please ensure your backend is running on port 5000.");
    }
  };

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="session-overlay">
      <motion.div 
        className="session-sheet glass-card"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <header className="session-header">
          <div className="header-top">
            <div className="live-status">
              <span className="rec-dot"></span>
              <span className="live-text">LIVE SESSION</span>
            </div>
            <button className="close-session-btn" onClick={onFinish}><X size={24} /></button>
          </div>
          
          <div className="session-title-area">
            <input 
              className="workout-title-input" 
              value={workoutName} 
              onChange={e => setWorkoutName(e.target.value)}
              placeholder="Session Name"
            />
            <div className="session-timer-large">
              {Math.floor((new Date() - startTime) / 60000)}m
            </div>
          </div>
          
          <AnimatePresence>
            {isTimerRunning && (
              <motion.div 
                className="rest-timer-overlay glass"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="timer-wrapper">
                  <Clock size={16} className="pulse-icon" />
                  <span className="timer-label">REST TIMER</span>
                  <span className={`timer-value ${timerSeconds < 10 ? 'critical' : ''}`}>
                    {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                  </span>
                  <button className="skip-timer-btn" onClick={() => setIsTimerRunning(false)}>
                    SKIP
                  </button>
                </div>
                <div className="timer-progress">
                  <motion.div 
                    className="timer-bar"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timerSeconds / 60) * 100}%` }}
                    transition={{ ease: "linear", duration: 1 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <div className="session-content">
          <AnimatePresence mode="popLayout">
            {activeExercises.length === 0 ? (
              <motion.div 
                className="session-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="empty-graphic">
                  <Dumbbell size={60} strokeWidth={1} />
                </div>
                <h3>Ready to crush it?</h3>
                <p>Add your first exercise to begin tracking.</p>
                <Button highlight onClick={() => setShowExercisePicker(true)}>
                  <Plus size={20} /> Add Exercise
                </Button>
              </motion.div>
            ) : (
              <>
                {activeExercises.map((ex, exIdx) => (
                  <motion.div 
                    key={ex.instanceId}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`exercise-block glass-card ${expandedInstanceId === ex.instanceId ? 'expanded' : 'collapsed'}`}
                    onClick={() => setExpandedInstanceId(ex.instanceId)}
                  >
                    <div className="status-indicator-bar" />
                    <div className="ex-block-header">
                      <div className="ex-title">
                        <span className="ex-icon">{ex.icon}</span>
                        <div className="ex-name-box">
                          <h4>{ex.name}</h4>
                          <span className="ex-subtitle">{ex.category}</span>
                        </div>
                      </div>
                      <button className="remove-ex-btn" onClick={() => removeExercise(ex.instanceId)}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {expandedInstanceId === ex.instanceId && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="expanded-ex-content"
                        >
                          <div className="ex-actions">
                            <button 
                              className="ai-coach-trigger glass"
                              onClick={(e) => { e.stopPropagation(); setActiveCoachExercise(ex); }}
                            >
                              <Activity size={14} /> <span>AI Form Coach</span>
                            </button>
                          </div>

                          <div className="sets-table">
                            <div className="table-row labels">
                              <span>SET</span>
                              <span>KG</span>
                              <span>REPS</span>
                              <span>DONE</span>
                            </div>
                            {ex.sets.map((set, sIdx) => (
                              <div key={sIdx} className={`table-row ${set.isCompleted ? 'completed' : ''}`} onClick={(e) => e.stopPropagation()}>
                                <span className="set-num">{sIdx + 1}</span>
                                <div className="input-with-glow">
                                  <input 
                                    type="text" 
                                    placeholder="0"
                                    value={set.weight}
                                    onChange={e => updateSet(ex.instanceId, sIdx, 'weight', e.target.value)}
                                  />
                                </div>
                                <div className="input-with-glow">
                                  <input 
                                    type="text" 
                                    placeholder="0"
                                    value={set.reps}
                                    onChange={e => updateSet(ex.instanceId, sIdx, 'reps', e.target.value)}
                                  />
                                </div>
                                <button 
                                  className={`check-btn ${set.isCompleted ? 'checked' : ''}`}
                                  onClick={(e) => { e.stopPropagation(); toggleSetComplete(ex.instanceId, sIdx); }}
                                >
                                  <div className="check-inner">
                                    {set.isCompleted ? <Check size={16} strokeWidth={4} /> : null}
                                  </div>
                                </button>
                              </div>
                            ))}
                          </div>

                          <button className="add-set-btn-premium" onClick={(e) => { e.stopPropagation(); addSet(ex.instanceId); }}>
                            <Plus size={16} /> <span>Add Set</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
                
                <button className="add-ex-secondary-btn glass" onClick={() => setShowExercisePicker(true)}>
                  <Plus size={20} /> <span>Add Exercise</span>
                </button>
              </>
            )}
          </AnimatePresence>
        </div>

        <footer className="session-footer">
          <Button fluid highlight onClick={handleFinishWorkout} disabled={loading || activeExercises.length === 0}>
            {loading ? 'Saving...' : 'Finish Workout'}
          </Button>
        </footer>
      </motion.div>

      {/* Exercise Picker Modal */}
      <AnimatePresence>
        {showExercisePicker && (
          <motion.div 
            className="picker-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="picker-content glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="picker-header">
                <h3>Select Exercise</h3>
                <button onClick={() => setShowExercisePicker(false)}><X size={20} /></button>
              </div>

              <div className="picker-search">
                <Search size={18} />
                <input 
                  placeholder="Search exercises..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="category-scroll">
                <button 
                  className={selectedCategory === 'All' ? 'active' : ''} 
                  onClick={() => setSelectedCategory('All')}
                >All</button>
                {MUSCLE_GROUPS.map(g => (
                  <button 
                    key={g} 
                    className={selectedCategory === g ? 'active' : ''}
                    onClick={() => setSelectedCategory(g)}
                  >{g}</button>
                ))}
              </div>

              <div className="exercise-list">
                {filteredExercises.map(ex => (
                  <button key={ex.id} className="ex-item-btn glass" onClick={() => addExercise(ex)}>
                    <span className="ex-icon">{ex.icon}</span>
                    <div className="ex-info">
                      <span className="ex-name">{ex.name}</span>
                      <span className="ex-cat">{ex.category}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCoachExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AIFormCoach 
              exercise={activeCoachExercise} 
              onClose={() => setActiveCoachExercise(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
