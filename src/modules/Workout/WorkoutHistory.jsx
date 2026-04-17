import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  ChevronDown, 
  Dumbbell, 
  Scale, 
  BookOpen,
  Plus,
  Trash2
} from 'lucide-react';
import { apiCall } from '../../utils/api';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Weight from './Weight';
import ExerciseLibrary from './ExerciseLibrary';
import './WorkoutHistory.css';

export default function WorkoutHistory() {
  const { workouts, loading, loadAllData } = useApp();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('sessions');
  const [deletingId, setDeletingId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDeleteWorkout = async (e, id) => {
    e.stopPropagation(); // prevent card expansion
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    
    setDeletingId(id);
    try {
      await apiCall(`/workouts/${id}`, 'DELETE');
      await loadAllData();
    } catch (err) {
      console.error("Failed to delete workout", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div 
      className="history-container fade-in"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="page-header">
        <h1>Training History</h1>
        <p>Review your sessions and track your gains.</p>
      </header>

      <div className="history-tabs">
        <button 
          className={activeTab === 'sessions' ? 'active' : ''} 
          onClick={() => setActiveTab('sessions')}
        >
          <History size={16} /> Sessions
        </button>
        <button 
          className={activeTab === 'library' ? 'active' : ''} 
          onClick={() => setActiveTab('library')}
        >
          <BookOpen size={16} /> Library
        </button>
        <button 
          className={activeTab === 'weight' ? 'active' : ''} 
          onClick={() => setActiveTab('weight')}
        >
          <Scale size={16} /> Training Weight
        </button>
      </div>

      <div className="history-content">
        <AnimatePresence mode="wait">
          {activeTab === 'sessions' && (
            <motion.div 
              key="sessions"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="sessions-list"
            >
              {workouts.length === 0 && !loading && (
                <div className="empty-state fade-in">
                  <div className="empty-icon-ring overlay">
                    <Dumbbell size={40} className="floating" />
                  </div>
                  <h3>No Training Data</h3>
                  <p>You haven't recorded any sessions yet. Build your first routine or explore the exercise library!</p>
                  <div className="empty-actions">
                    <button className="his-btn-primary" onClick={() => navigate('/')}>
                      Start Workout
                    </button>
                    <button className="his-btn-secondary" onClick={() => setActiveTab('library')}>
                      Browse Library
                    </button>
                  </div>
                </div>
              )}

              {workouts.map((w, idx) => (
                <div 
                  key={w._id} 
                  className={`session-card ${expandedId === w._id ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(w._id)}
                >
                  <div className="session-summary-row">
                    <div className="s-date-box">
                      <span className="s-day">{new Date(w.createdAt).getDate()}</span>
                      <span className="s-mon">{new Date(w.createdAt).toLocaleDateString([], { month: 'short' })}</span>
                    </div>
                    <div className="s-info">
                      <h3>{w.name}</h3>
                      <div className="s-meta">
                        <span>{w.exercises.length} Exercises</span>
                        <span className="dot">•</span>
                        <span>{new Date(w.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="expand-icon-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <button 
                        className="delete-btn-mini" 
                        onClick={(e) => handleDeleteWorkout(e, w._id)}
                        disabled={deletingId === w._id}
                        title="Delete Session"
                      >
                        {deletingId === w._id ? '...' : <Trash2 size={16} />}
                      </button>
                      <div className="expand-icon">
                        {expandedId === w._id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === w._id && (
                      <motion.div 
                        className="session-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="ex-details-list">
                          {w.exercises.map((ex, exIdx) => (
                            <div key={exIdx} className="ex-detail-item">
                              <div className="ex-detail-header">
                                <strong>{ex.name}</strong>
                                <span>{ex.sets.length} Sets</span>
                              </div>
                              <div className="set-summary">
                                {ex.sets.map((s, sIdx) => (
                                  <div key={sIdx} className="set-tag">
                                    {s.weight}kg x {s.reps}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'library' && (
            <motion.div 
              key="library"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="library-tab-content"
            >
              <ExerciseLibrary />
            </motion.div>
          )}

          {activeTab === 'weight' && (
            <motion.div 
              key="weight"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <Weight />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
