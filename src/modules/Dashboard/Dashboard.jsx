import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Camera, 
  TrendingUp, 
  Target, 
  ImageIcon, 
  Activity,
  Zap, 
  Utensils, 
  Dumbbell as WorkoutIcon,
  ChevronRight,
  Info,
  Play,
  Droplets,
  Flame,
  Clock,
  Layers
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
  const { userProfile, weights, photos, workouts, compositions } = useApp();
  const [insights, setInsights] = useState({ recommendation: null, diet: null, workout: null });
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);

  // Get localized greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    // Load water from local storage for today
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`water_${today}`);
    if (saved) setWaterIntake(parseInt(saved));

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

  const updateWater = (amount) => {
    const newTotal = Math.max(0, waterIntake + amount);
    setWaterIntake(newTotal);
    localStorage.setItem(`water_${new Date().toDateString()}`, newTotal);
  };

  const latestWeight = weights.length > 0 ? weights[0].value : (userProfile?.weight || '--');
  const weightTrend = weights.length > 1 ? (((weights[1].value - weights[0].value) / weights[1].value) * 100).toFixed(1) : null;

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="dashboard-header-premium">
        <div className="header-main">
          <span className="greeting-label">{greeting}</span>
          <h1 className="user-name-title">{userProfile?.name?.split(' ')[0] || 'Athlete'}</h1>
        </div>
        <div className="daily-brief-box glass">
          <Zap size={16} className="text-primary" />
          <p>You've completed 3 workouts this week. {userProfile?.goal === 'Muscle Gain' ? 'Keep protein high!' : 'Stay consistent!'}</p>
        </div>
      </header>

      <div className="dashboard-layout-grid">
        {/* Main Column */}
        <div className="dashboard-main-col">
          {/* Daily Progress Row */}
          <section className="progress-highlights-grid">
            <Card className="calories-card glass">
              <div className="card-top">
                <Flame size={20} className="text-orange" />
                <span>Daily Calories</span>
              </div>
              <div className="cal-large-val">1,840 <span>/ 2,400</span></div>
              <div className="progress-bar-thin">
                <div className="progress-fill" style={{ width: '76%' }}></div>
              </div>
              <div className="macro-mini-row">
                <div className="m-item">P: 140g</div>
                <div className="m-item">C: 220g</div>
                <div className="m-item">F: 65g</div>
              </div>
            </Card>

            <Card className="water-card glass">
              <div className="card-top">
                <Droplets size={20} className="text-blue" />
                <span>Hydration</span>
              </div>
              <div className="water-progress-circle">
                <span className="water-val">{(waterIntake / 1000).toFixed(1)}L</span>
                <span className="water-target">/ 4L</span>
              </div>
              <div className="water-controls">
                <button onClick={() => updateWater(250)}>+250ml</button>
                <button onClick={() => updateWater(500)}>+500ml</button>
              </div>
            </Card>
          </section>

          {/* Activity Section */}
          <section className="dashboard-activity">
            <div className="section-header">
              <h3>Training Schedule</h3>
              <button className="text-btn" onClick={() => navigate('/workout')}>Full Plan</button>
            </div>
            
            <div className="schedule-preview">
              {!loadingInsights && insights.workout ? (
                Array.isArray(insights.workout.schedule) ? (
                  insights.workout.schedule.slice(0, 3).map((day, i) => (
                    <div key={i} className={`schedule-item ${i === 0 ? 'active' : ''}`}>
                      <div className="sched-icon"><Clock size={16} /></div>
                      <div className="sched-info">
                        <span className="sched-day">{day.split(':')[0]}</span>
                        <span className="sched-name">{day.split(':')[1] || 'Workout Session'}</span>
                      </div>
                      {i === 0 && <button className="start-btn-mini" onClick={() => setIsWorkoutActive(true)}>Start</button>}
                    </div>
                  ))
                ) : (
                  <div className="schedule-item active">
                    <div className="sched-icon"><Clock size={16} /></div>
                    <div className="sched-info">
                      <span className="sched-day">Today</span>
                      <span className="sched-name">{insights.workout.focus}</span>
                    </div>
                    <button className="start-btn-mini" onClick={() => setIsWorkoutActive(true)}>Start</button>
                  </div>
                )
              ) : (
                <div className="skeleton-line" />
              )}
            </div>
          </section>

          {/* AI Insights (Big Card) */}
          <AnimatePresence>
            {!loadingInsights && insights.recommendation && (
              <Card highlight className="ai-brief-card">
                <div className="ai-label">AI ASSISTANT</div>
                <h4>Your Weight is {insights.recommendation.status}</h4>
                <p>{insights.recommendation.message}</p>
                <div className="ai-action-footer">
                  <button onClick={() => navigate('/coach')}>Ask for Diet Plan <ChevronRight size={16} /></button>
                </div>
              </Card>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Column (Desktop) / Bottom Flow (Mobile) */}
        <div className="dashboard-side-col">
          <section className="stats-compact-grid">
            <StatCard 
              label="Weight" 
              value={latestWeight} 
              unit="kg" 
              icon={<TrendingUp size={20} />} 
              trend={weightTrend ? -weightTrend : null} 
            />
            <StatCard 
              label="BMI" 
              value={userProfile?.bmi || '--'} 
              unit={userProfile?.bmiCategory || ''} 
              icon={<Activity size={20} />} 
            />
          </section>

          <section className="quick-action-list">
            <h3>Quick Actions</h3>
            <button className="qa-item" onClick={() => navigate('/composition')}>
              <Camera size={18} /> Take Update Photo
            </button>
            <button className="qa-item" onClick={() => navigate('/meal')}>
              <Utensils size={18} /> Log Meal
            </button>
            <button className="qa-item" onClick={() => setIsWorkoutActive(true)}>
              <WorkoutIcon size={18} /> Next Workout
            </button>
          </section>

          {workouts.length > 0 && (
             <section className="recent-workouts-dashboard">
                <div className="section-header">
                  <h3>Recent</h3>
                  <button className="text-btn" onClick={() => navigate('/workout')}>History</button>
                </div>
                <div className="workout-stack">
                  {workouts.slice(0, 2).map((w, i) => (
                    <div key={i} className="mini-workout-item glass">
                      <Layers size={14} className="text-accent" />
                      <div className="mini-w-details">
                        <span className="mini-w-name">{w.name}</span>
                        <span className="mini-w-meta">{new Date(w.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </section>
          )}

          {/* Recent Photos Mini Gallery */}
          {photos.length > 0 && (
            <section className="mini-gallery-section">
              <div className="section-header">
                <h3>Insights</h3>
                <button className="text-btn" onClick={() => navigate('/composition')}>Track</button>
              </div>
              <div className="photo-strip">
                {photos.slice(0, 4).map((p, i) => (
                  <div key={i} className="mini-photo-sq glass" style={{
                    backgroundImage: `url(${p.url})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                    {!p.url && <ImageIcon size={16} className="text-dim" />}
                  </div>
                ))}
              </div>
            </section>
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
