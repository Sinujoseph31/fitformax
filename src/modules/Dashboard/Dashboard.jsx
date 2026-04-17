import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Activity, Zap, Utensils, Dumbbell,
  Play, Droplets, Flame, ShieldCheck, Mountain, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import WorkoutSession from '../Workout/WorkoutSession';
import './Dashboard.css';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/**
 * Builds a 4-week streak grid from real workout history.
 *
 * Logic:
 *  - Today is the anchor (right edge of the grid).
 *  - We look back 28 days (4 rows × 7 columns).
 *  - Each cell = 1 if the user logged at least one workout on that date, else 0.
 *  - Columns = Mon–Sun. The grid fills left-to-right, oldest → newest.
 */
function buildStreakGrid(workouts = []) {
  // Build a Set of "YYYY-MM-DD" strings where a workout was completed
  const workoutDates = new Set(
    workouts
      .filter(w => w.completedAt || w.createdAt || w.date)
      .map(w => {
        const d = new Date(w.completedAt || w.createdAt || w.date);
        return d.toISOString().slice(0, 10); // "2026-04-17"
      })
  );

  // Build 28-cell grid, starting from 27 days ago up to today
  const cells = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    cells.push({
      date: d,
      active: workoutDates.has(key),
      isToday: i === 0,
      isFuture: false,
    });
  }

  // Split into 4 rows of 7
  const rows = [];
  for (let r = 0; r < 4; r++) {
    rows.push(cells.slice(r * 7, r * 7 + 7));
  }
  return rows;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { userProfile, workouts } = useApp();
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [waterIntake, setWaterIntake] = useState(2400);

  // Build real streak from workout history
  const streakRows = buildStreakGrid(workouts || []);
  const allCells = streakRows.flat();
  const activeDays = allCells.filter(c => c.active).length;
  const consistencyPct = Math.round((activeDays / 28) * 100);

  // This week (last row) active count
  const thisWeekCells = streakRows[3] || [];
  const thisWeekActive = thisWeekCells.filter(c => c.active).length;

  const nextWorkoutName = userProfile?.goal === 'gain' ? 'Hypertrophy Alpha' : 'Metabolic Burn 01';
  const firstName = userProfile?.name?.split(' ')[0] || 'Titan';

  const bmi = userProfile?.weight && userProfile?.height
    ? (userProfile.weight / Math.pow(userProfile.height / 100, 2)).toFixed(1)
    : '22.5';

  useEffect(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`water_${today}`);
    if (saved) setWaterIntake(parseInt(saved));
  }, []);

  const addWater = () => {
    const newVal = waterIntake + 500;
    setWaterIntake(newVal);
    localStorage.setItem(`water_${new Date().toDateString()}`, newVal);
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <header className="db-header">
        <div className="db-header-left">
          <div className="db-status-pill">
            <span className="db-pulse" />
            System Online
          </div>
          <h1 className="db-greeting">Good morning, <span className="db-name">{firstName}</span> 👋</h1>
          <p className="db-subtitle">Let's crush today's target.</p>
        </div>
        <div className="db-header-right">
          <div className="db-mass-badge">
            <span className="db-mass-lbl">Current Mass</span>
            <span className="db-mass-val">{userProfile?.weight || '--'} <small>kg</small></span>
          </div>
        </div>
      </header>

      {/* ── Main Grid ──────────────────────────────── */}
      <div className="db-grid">

        {/* LEFT COLUMN */}
        <div className="db-col-main">

          {/* Active Workout Card */}
          <motion.div
            className="db-workout-card"
            whileHover={{ y: -4 }}
            onClick={() => setIsWorkoutActive(true)}
          >
            <div className="db-workout-badge">TODAY'S WORKOUT</div>
            <h2 className="db-workout-title">{nextWorkoutName}</h2>
            <div className="db-workout-stats">
              <div className="db-stat">
                <span className="db-stat-val">45</span>
                <span className="db-stat-lbl">MIN</span>
              </div>
              <div className="db-stat-divider" />
              <div className="db-stat">
                <span className="db-stat-val">520</span>
                <span className="db-stat-lbl">KCAL</span>
              </div>
              <div className="db-stat-divider" />
              <div className="db-stat">
                <span className="db-stat-val">ADV</span>
                <span className="db-stat-lbl">LEVEL</span>
              </div>
            </div>
            <button className="db-start-btn">
              <Play size={18} fill="currentColor" />
              Start Session
            </button>
          </motion.div>

          {/* Metrics Row */}
          <div className="db-metrics-row">
            {/* Calories */}
            <div className="db-metric-card">
              <div className="db-metric-icon calories"><Flame size={20} /></div>
              <div className="db-metric-info">
                <span className="db-metric-lbl">Calories Today</span>
                <span className="db-metric-val">1,420 <small style={{fontSize:'0.8rem',color:'var(--text-dim)',fontWeight:600}}>/ 2,200</small></span>
                <div style={{width:'100%',height:'6px',background:'var(--border)',borderRadius:'10px',marginTop:'6px'}}>
                  <div style={{width:'64%',height:'100%',background:'var(--gradient-main)',borderRadius:'10px'}} />
                </div>
                <span style={{fontSize:'0.72rem',color:'var(--text-dim)',marginTop:'4px'}}>64% of daily goal</span>
              </div>
            </div>

            {/* Hydration */}
            <div className="db-metric-card db-hydration-card">
              <div style={{width:'100%'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
                  <div className="db-metric-icon hydration"><Droplets size={20} /></div>
                  <div>
                    <span className="db-metric-lbl">Hydration</span>
                    <div className="db-metric-val">{(waterIntake/1000).toFixed(1)}L <small style={{fontSize:'0.8rem',color:'var(--text-dim)',fontWeight:600}}>/ 4.0L ({waterIntake}ml)</small></div>
                  </div>
                </div>
                <div style={{width:'100%',height:'6px',background:'var(--border)',borderRadius:'10px',marginBottom:'0.75rem'}}>
                  <div style={{width:`${Math.min((waterIntake/4000)*100,100)}%`,height:'100%',background:'linear-gradient(90deg,#3b82f6,#60a5fa)',borderRadius:'10px'}} />
                </div>
                <div style={{display:'flex',gap:'0.5rem'}}>
                  {[250,500,1000].map(ml => (
                    <button key={ml} className="db-water-btn" onClick={(e)=>{e.stopPropagation();const nv=waterIntake+ml;setWaterIntake(nv);localStorage.setItem(`water_${new Date().toDateString()}`,nv);}}>
                      +{ml<1000?ml+'ml':'1L'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ascent Challenge */}
          <div className="db-ascent-card">
            <div className="db-ascent-icon"><Mountain size={26} /></div>
            <div className="db-ascent-info">
              <span className="db-ascent-tag">LANDMARK CHALLENGE</span>
              <h4>Mount Everest Ascent</h4>
              <div className="db-ascent-bar-wrap">
                <div className="db-ascent-bar">
                  <div className="db-ascent-fill" style={{ width: '47%' }} />
                </div>
                <span className="db-ascent-pct">4,200m / 8,848m</span>
              </div>
            </div>
            <button className="db-ascent-btn" onClick={() => navigate('/workout')}>
              Sync <ChevronRight size={16} />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="db-col-side">

          {/* Streak Matrix */}
          <div className="db-widget">
            <div className="db-widget-header">
              <Activity size={18} className="db-widget-icon" />
              <span>Weekly Streak</span>
            </div>

            {/* Day Labels */}
            <div className="db-streak-days">
              {DAYS.map((d, i) => <span key={i}>{d}</span>)}
            </div>

            {/* Streak Grid — 4 rows × 7 cols */}
            <div className="db-streak-grid">
              {streakRows.map((row, ri) =>
                row.map((cell, di) => (
                  <div
                    key={`${ri}-${di}`}
                    className={`db-streak-cell${cell.active ? ' active' : ''}${cell.isToday ? ' today' : ''}`}
                    title={cell.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  />
                ))
              )}
            </div>

            <div className="db-streak-footer">
              <span className="db-streak-score">{thisWeekActive}/7 days this week</span>
              <span className="db-streak-pct">{consistencyPct}% streak</span>
            </div>
          </div>

          {/* Bio Status */}
          <div className="db-widget db-bio-widget">
            <div className="db-widget-header">
              <ShieldCheck size={18} className="db-widget-icon" />
              <span>Bio Status</span>
            </div>
            <div className="db-bio-rows">
              <div className="db-bio-row">
                <span>BMI</span>
                <span className="db-bio-val primary">{bmi}</span>
              </div>
              <div className="db-bio-row">
                <span>Category</span>
                <span className="db-bio-val success">Optimal</span>
              </div>
              <div className="db-bio-row">
                <span>Target</span>
                <span className="db-bio-val">{userProfile?.targetWeight || '--'} kg</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="db-widget">
            <div className="db-widget-header">
              <Zap size={18} className="db-widget-icon" />
              <span>Quick Actions</span>
            </div>
            <div className="db-qa-list">
              <button className="db-qa-btn" onClick={() => navigate('/composition')}>
                <Camera size={16} /> Log Body Update
              </button>
              <button className="db-qa-btn" onClick={() => navigate('/meal')}>
                <Utensils size={16} /> Log Meal
              </button>
              <button className="db-qa-btn" onClick={() => navigate('/workouts')}>
                <Dumbbell size={16} /> Explore Workouts
              </button>
            </div>
          </div>

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
