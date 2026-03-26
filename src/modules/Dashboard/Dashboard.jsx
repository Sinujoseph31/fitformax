import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Camera, 
  TrendingUp, 
  Target, 
  ImageIcon, 
  Zap, 
  Utensils, 
  Dumbbell as WorkoutIcon,
  ChevronRight,
  Info,
  Play
} from 'lucide-react';
import Card from '../../components/Card';
import StatCard from '../../components/StatCard';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { apiCall } from '../../utils/api';
import WorkoutSession from '../Workout/WorkoutSession';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userProfile, weights, photos, workouts } = useApp();
  const [insights, setInsights] = useState({ recommendation: null, diet: null, workout: null });
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const [recRes, dietRes, workRes] = await Promise.all([
          apiCall('/insights/recommendations'),
          apiCall('/insights/diet'),
          apiCall('/insights/workout')
        ]);
        setInsights({ recommendation: recRes, diet: dietRes, workout: workRes });
      } catch (error) {
        console.error("Failed to load insights", error);
      } finally {
        setLoadingInsights(false);
      }
    };
    if (userProfile?.goal) fetchInsights();
  }, [userProfile?.goal, weights]);

  const latestWeight = weights.length > 0 ? weights[0].value : (userProfile?.weight || '--');
  
  // Calculate a simple trend for demonstration
  const weightTrend = weights.length > 1 ? (((weights[1].value - weights[0].value) / weights[1].value) * 100).toFixed(1) : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="dashboard-header">
        <div className="header-text">
          <h1 className="text-gradient">Hello, {userProfile?.name?.split(' ')[0] || 'Athlete'}</h1>
          <p>Here's your progress overview for today.</p>
        </div>
        <div className="header-actions mobile-only">
          <button className="icon-btn-glass" onClick={() => navigate('/profile')}>
            <div className="avatar-placeholder" />
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Quick Stats */}
        <section className="stats-row">
          <StatCard 
            label="Weight" 
            value={latestWeight} 
            unit="kg" 
            icon={<TrendingUp size={20} />} 
            trend={weightTrend ? -weightTrend : null} // Negative trend shown as "good" usually for weight loss
            highlight
          />
          <StatCard 
            label="Goal" 
            value={userProfile?.goal || 'Set Goal'} 
            unit="" 
            icon={<Target size={20} />} 
          />
          <StatCard 
            label="Gallery" 
            value={photos.length} 
            unit="Photos" 
            icon={<ImageIcon size={20} />} 
          />
        </section>

        {/* Action Bar */}
        <section className="action-bar">
          <Button highlight onClick={() => setIsWorkoutActive(true)} className="action-btn start-btn">
            <Play size={20} fill="currentColor" />
            <span>Start Workout</span>
          </Button>
          <Button onClick={() => navigate('/weight')} className="action-btn">
            <Plus size={20} />
            <span>Log Weight</span>
          </Button>
          <Button variant="secondary" onClick={() => navigate('/weight')} className="action-btn">
            <Camera size={20} />
            <span>Add Photo</span>
          </Button>
        </section>

        {/* Recent Workouts */}
        {workouts.length > 0 && (
          <motion.section variants={itemVariants} className="recent-workouts-section">
            <div className="section-header">
              <h3>Recent Sessions</h3>
              <button className="text-btn" onClick={() => navigate('/workout')}>View All</button>
            </div>
            <div className="workout-list-horizontal">
              {workouts.slice(0, 3).map((w, i) => (
                <Card key={w._id} className="mini-workout-card glass">
                  <div className="mini-w-header">
                    <span className="w-icon">⚡</span>
                    <div className="w-info">
                      <span className="w-name">{w.name}</span>
                      <span className="w-date">{new Date(w.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="w-metrics">
                    <span>{w.exercises.length} Exercises</span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        {/* AI Insight Highlight */}
        <AnimatePresence>
          {!loadingInsights && insights.recommendation && (
            <motion.section 
              variants={itemVariants}
              className="insight-section"
            >
              <Card highlight className="insight-card">
                <div className="insight-badge">
                  <Zap size={14} fill="currentColor" />
                  <span>AI INSIGHT</span>
                </div>
                
                <div className="insight-header">
                  <h3>{insights.recommendation.status}</h3>
                  <div className="insight-trend">
                    {insights.recommendation.trend === 'increasing' ? '↑' : insights.recommendation.trend === 'decreasing' ? '↓' : '→'}
                    {Math.abs(insights.recommendation.diff).toFixed(1)} kg
                  </div>
                </div>

                <p className="insight-message">{insights.recommendation.message}</p>

                <div className="insight-action-box">
                  <span className="action-label">Recommendation:</span>
                  <p className="action-text">{insights.recommendation.action}</p>
                </div>

                <button className="insight-cta" onClick={() => navigate('/coach')}>
                  Chat with Coach <ChevronRight size={16} />
                </button>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Plan Overviews */}
        <div className="plans-grid">
          {!loadingInsights && insights.diet && (
            <motion.section variants={itemVariants}>
              <Card className="plan-card">
                <div className="plan-header">
                  <Utensils size={20} className="plan-icon" />
                  <h3>Daily Nutrition</h3>
                </div>
                <div className="meal-list">
                  <div className="meal-item"><span>Breakfast</span> <p>{insights.diet.breakfast}</p></div>
                  <div className="meal-item"><span>Lunch</span> <p>{insights.diet.lunch}</p></div>
                  <div className="meal-item"><span>Dinner</span> <p>{insights.diet.dinner}</p></div>
                </div>
              </Card>
            </motion.section>
          )}

          {!loadingInsights && insights.workout && (
            <motion.section variants={itemVariants}>
              <Card className="plan-card">
                <div className="plan-header">
                  <WorkoutIcon size={20} className="plan-icon" />
                  <h3>Workout Plan</h3>
                </div>
                <div className="workout-focus">
                  <span className="focus-label">Focus:</span>
                  <p className="focus-text text-gradient">{insights.workout.focus}</p>
                </div>
                <div className="workout-preview">
                  {insights.workout.schedule.slice(0, 3).map((day, i) => (
                    <div key={i} className="workout-day">{day}</div>
                  ))}
                  <button className="view-more-btn" onClick={() => navigate('/workout')}>
                    View full schedule
                  </button>
                </div>
              </Card>
            </motion.section>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isWorkoutActive && (
          <WorkoutSession onFinish={() => setIsWorkoutActive(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
