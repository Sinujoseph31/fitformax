import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Activity, Zap, Utensils, Dumbbell,
  Play, Droplets, Flame, ShieldCheck, Mountain, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiCall } from '../../utils/api';
import WorkoutSession from '../Workout/WorkoutSession';
import './Dashboard.css';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function buildStreakGrid(workouts = []) {
  const workoutDates = new Map(); // Using Map to store counts/intensity
  
  workouts.forEach(w => {
    const d = new Date(w.completedAt || w.createdAt || w.date || w.startTime);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    
    if (!workoutDates.has(key)) {
      workoutDates.set(key, { count: 0, protocols: [] });
    }
    
    const data = workoutDates.get(key);
    const intensity = (w.exercises?.length || 1);
    data.count += intensity;
    if (w.name) data.protocols.push(w.name);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayOfWeek = today.getDay(); 
  const monOffset = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);

  const gridStart = new Date(today);
  gridStart.setDate(today.getDate() - monOffset - 21);

  const cells = [];
  for (let i = 0; i < 28; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    
    const data = workoutDates.get(key) || { count: 0, protocols: [] };
    const count = data.count;
    // Map count to 0-3 level
    const level = count === 0 ? 0 : (count < 3 ? 1 : (count < 6 ? 2 : 3));

    cells.push({
      key,
      date: d,
      active: count > 0,
      level: level,
      protocols: data.protocols,
      isToday: d.getTime() === today.getTime(),
      isFuture: d > today,
    });
  }

  const rows = [];
  for (let r = 0; r < 4; r++) {
    const row = cells.slice(r * 7, r * 7 + 7);
    const isPerfect = row.every(c => c.active);
    rows.push({ cells: row, isPerfect });
  }
  return rows;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { userProfile, workouts, meals } = useApp();
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [waterIntake, setWaterIntake] = useState(2400);
  const [activePlan, setActivePlan] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Build real streak from workout history
  const streakRows = buildStreakGrid(workouts || []);
  const allCells = streakRows.map(r => r.cells).flat();
  const activeDays = allCells.filter(c => c.active).length;
  const consistencyPct = Math.round((activeDays / 28) * 100);

  // This week (last row) active count
  const thisWeekCells = streakRows[3]?.cells || [];
  const thisWeekActive = thisWeekCells.filter(c => c.active).length;

  const nextWorkoutName = userProfile?.goal === 'gain' ? 'Hypertrophy Alpha' : 'Metabolic Burn 01';
  const displayPlanName = activePlan ? activePlan.name : nextWorkoutName;
  const firstName = userProfile?.name?.split(' ')[0] || 'Titan';

  const bmi = userProfile?.weight && userProfile?.height
    ? (userProfile.weight / Math.pow(userProfile.height / 100, 2)).toFixed(1)
    : '22.5';

  // ── Smart Nutrition Logic ──
  // 1. Calculate Target (Base on Mifflin-St Jeor or simple estimate)
  // Base: 25 kcal/kg for sedentary, +/- 500 for gain/loss
  const baseKcal = (userProfile?.weight || 75) * 28; 
  const goalOffset = userProfile?.goal === 'gain' ? 500 : (userProfile?.goal === 'lose' ? -500 : 0);
  const targetKcal = Math.round(baseKcal + goalOffset);

  // 2. Aggregate Today's Meals
  const today = new Date().toISOString().slice(0, 10);
  const todayMeals = meals?.filter(m => {
    const mDate = new Date(m.date || m.createdAt).toISOString().slice(0, 10);
    return mDate === today;
  }) || [];
  
  const consumedKcal = todayMeals.reduce((acc, m) => acc + (Number(m.calories) || 0), 0);
  const nutritionPct = Math.min(Math.round((consumedKcal / targetKcal) * 100), 100);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedWater = localStorage.getItem(`water_${today}`);
    // if (savedWater) setWaterIntake(parseInt(savedWater));

    const loadHydration = async () => {
      try {
        const data = await apiCall('/hydration/today');
        if (data) setWaterIntake(data.amount);
      } catch (err) {
        console.error("Hydration sync failed", err);
      }
    };
    loadHydration();

    const savedPlan = localStorage.getItem('fx_workout_plan');
    if (savedPlan) {
      try {
        setActivePlan(JSON.parse(savedPlan));
      } catch (err) {
        console.error("Failed to parse saved plan", err);
      }
    }
  }, []);

  const updateWater = async (ml) => {
    const newVal = waterIntake + ml;
    setWaterIntake(newVal);
    // Silent background sync
    try {
      await apiCall('/hydration', 'POST', { amount: ml });
    } catch (err) {
      console.error("Failed to sync water", err);
    }
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
            className={`db-workout-card ${activePlan ? 'has-active-plan' : ''}`}
            whileHover={{ y: -4 }}
            onClick={() => setIsWorkoutActive(true)}
          >
            <div className="db-workout-badge">{activePlan ? 'ACTIVE PROTOCOL' : "TODAY'S RECOMMENDATION"}</div>
            <h2 className="db-workout-title">{displayPlanName}</h2>
            <div className="db-workout-stats">
              <div className="db-stat">
                <span className="db-stat-val">{activePlan?.duration || '45'}</span>
                <span className="db-stat-lbl">MIN</span>
              </div>
              <div className="db-stat-divider" />
              <div className="db-stat">
                <span className="db-stat-val">520</span>
                <span className="db-stat-lbl">KCAL</span>
              </div>
              <div className="db-stat-divider" />
              <div className="db-stat">
                <span className="db-stat-val">{activePlan?.difficulty?.substring(0,3).toUpperCase() || 'ADV'}</span>
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
            <div className="db-metric-card" onClick={() => navigate('/meal')}>
              <div className="db-metric-icon calories"><Flame size={20} /></div>
              <div className="db-metric-info">
                <span className="db-metric-lbl">Calories Today</span>
                <span className="db-metric-val">{consumedKcal.toLocaleString()} <small style={{fontSize:'0.8rem',color:'var(--text-dim)',fontWeight:600}}>/ {targetKcal.toLocaleString()}</small></span>
                <div style={{width:'100%',height:'6px',background:'var(--border)',borderRadius:'10px',marginTop:'6px'}}>
                  <div style={{width:`${nutritionPct}%`,height:'100%',background:'var(--gradient-main)',borderRadius:'10px'}} />
                </div>
                <span style={{fontSize:'0.72rem',color:'var(--text-dim)',marginTop:'4px'}}>{nutritionPct}% of daily goal</span>
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
                    <button key={ml} className="db-water-btn" onClick={(e)=>{e.stopPropagation(); updateWater(ml);}}>
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
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <Activity size={18} className="db-widget-icon" />
                <span>Weekly Streak</span>
              </div>
              <button 
                className="fx-btn-text" 
                style={{fontSize:'0.75rem', fontWeight:800}}
                onClick={() => navigate('/schedule')}
              >
                Full Calendar
              </button>
            </div>

            {/* Day Labels */}
            <div className="db-streak-days">
              {DAYS.map((d, i) => <span key={i}>{d}</span>)}
            </div>

            {/* Streak Grid — 4 rows × 7 cols */}
            <div className="db-streak-grid">
              {streakRows.map((row, ri) => (
                <div key={ri} className={`db-streak-row ${row.isPerfect ? 'perfect-week' : ''}`}>
                  {row.cells.map((cell, di) => (
                    <div
                      key={di}
                      className={`db-streak-cell lv-${cell.level}${cell.isToday ? ' today' : ''}${hoveredCell?.key === cell.key ? ' hovered' : ''}`}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      onClick={() => setHoveredCell(hoveredCell?.key === cell.key ? null : cell)}
                    >
                      <span className="db-cell-num">{cell.date.getDate()}</span>
                      {cell.isToday && <div className="today-marker" />}
                      
                      <AnimatePresence>
                        {hoveredCell?.key === cell.key && !cell.isFuture && (
                          <motion.div 
                            className="db-streak-tooltip"
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          >
                            <div className="tooltip-date">{cell.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                            <div className="tooltip-status">
                              {cell.active ? (
                                <>
                                  <span className="status-dot online" />
                                  Missions Completed
                                </>
                              ) : (
                                <>
                                  <span className="status-dot offline" />
                                  Standby / Rest
                                </>
                              )}
                            </div>
                            {cell.protocols.length > 0 && (
                              <div className="tooltip-protocols">
                                {cell.protocols.map((p, i) => (
                                  <div key={i} className="protocol-tag">{p}</div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              ))}
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
