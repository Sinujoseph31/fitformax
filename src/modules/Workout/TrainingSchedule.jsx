import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, CheckCircle2, 
  Calendar as CalendarIcon, Info, Target, Zap 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './TrainingSchedule.css';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TrainingSchedule() {
  const { workouts, userProfile } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get active plan from localStorage
  const [activePlan, setActivePlan] = useState(() => {
    return JSON.parse(localStorage.getItem('fx_workout_plan')) || null;
  });

  const [completedDays, setCompletedDays] = useState(() => {
    return JSON.parse(localStorage.getItem('fx_completed_days')) || [];
  });

  // Calculate Month stats
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Generate the full grid (including padding for previous month)
  const calendarGrid = [];
  
  // Padding for start of month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarGrid.push({
      day: prevMonthLastDay - i,
      month: 'prev',
      fullDate: new Date(year, month - 1, prevMonthLastDay - i)
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarGrid.push({
      day: i,
      month: 'current',
      fullDate: new Date(year, month, i)
    });
  }
  
  // Padding for end of month (up to 42 cells to fill 6 rows)
  const remainingCells = 42 - calendarGrid.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarGrid.push({
      day: i,
      month: 'next',
      fullDate: new Date(year, month + 1, i)
    });
  }

  const toggleDay = (key) => {
    const newCompleted = completedDays.includes(key)
      ? completedDays.filter(k => k !== key)
      : [...completedDays, key];
    
    setCompletedDays(newCompleted);
    localStorage.setItem('fx_completed_days', JSON.stringify(newCompleted));
  };

  const getTaskForDay = (fullDate) => {
    if (!activePlan) return null;
    
    // Simple mapping: Repeat the schedule days sequentially or anchor them
    // For this implementation, we'll map the schedule days (e.g. 4 days) 
    // to the weekday indices defined in the plan, or just repeat.
    
    const dayOfWeek = fullDate.getDay(); // 0-6
    // Assuming schedule follows [Mon, Tue, Wed, Thu, Fri, Sat, Sun] indexes 1-7
    // Adjusting to 0-6 (Sun-Sat)
    const normalizedDayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
    
    // Check if the plan has a routine for this specific day of the week
    const dayRoutine = activePlan.schedule?.find(d => d.day === (normalizedDayIndex + 1));
    return dayRoutine;
  };

  return (
    <div className="schedule-container fade-in">
      {/* ── Header ─────────────────────────────────── */}
      <div className="schedule-header">
        <div className="header-info">
          <CalendarIcon className="header-icon" />
          <div>
            <h1>Mission Control</h1>
            <p className="subtitle">{monthName} {year} Training Matrix</p>
          </div>
        </div>
        
        <div className="header-controls">
          <button className="nav-btn" onClick={() => setCurrentDate(new Date(year, month - 1))}>
            <ChevronLeft size={20} />
          </button>
          <div className="current-month-display">{monthName}</div>
          <button className="nav-btn" onClick={() => setCurrentDate(new Date(year, month + 1))}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ── Plan Overview ──────────────────────────── */}
      {activePlan && (
        <motion.div 
          className="plan-badge-glass"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="plan-meta">
            <Zap size={16} className="text-primary" />
            <span>Active Deployment: <strong>{activePlan.name}</strong></span>
          </div>
          <div className="plan-stats">
            <span>{activePlan.schedule.length} Sessions / Week</span>
            <div className="divider-v" />
            <span>Target: {activePlan.difficulty}</span>
          </div>
        </motion.div>
      )}

      {/* ── Calendar Grid ──────────────────────────── */}
      <div className="calendar-card glass-card">
        <div className="weekday-header">
          {DAYS_OF_WEEK.map(d => <div key={d} className="weekday-lbl">{d}</div>)}
        </div>
        
        <div className="calendar-main-grid">
          {calendarGrid.map((cell, idx) => {
            const dateKey = `${cell.fullDate.getFullYear()}-${cell.fullDate.getMonth()}-${cell.day}`;
            const isCompleted = completedDays.includes(dateKey);
            const isToday = new Date().toDateString() === cell.fullDate.toDateString();
            const routine = getTaskForDay(cell.fullDate);
            const isInactive = cell.month !== 'current';

            return (
              <div 
                key={idx} 
                className={`calendar-cell ${isInactive ? 'inactive' : ''} ${isToday ? 'today' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => !isInactive && toggleDay(dateKey)}
              >
                <div className="cell-header">
                  <span className="day-num">{cell.day}</span>
                  {routine && <div className="routine-dot" />}
                </div>
                
                <div className="cell-content">
                  {routine ? (
                    <div className="mission-tag">
                      <div className="mission-check">
                         {isCompleted && <CheckCircle2 size={12} />}
                      </div>
                      <span className="mission-name">{routine.name}</span>
                    </div>
                  ) : (
                    !isInactive && <span className="rest-day-lbl">Rest</span>
                  )}
                </div>

                {isToday && <div className="today-bar" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Legend ─────────────────────────────────── */}
      <div className="schedule-footer">
        <div className="footer-legend">
          <div className="legend-item"><span className="dot ongoing" /> Active Protocol</div>
          <div className="legend-item"><span className="dot finished" /> Mission Accomplished</div>
          <div className="legend-item"><span className="dot rest" /> Physiological Recovery</div>
        </div>
        <div className="footer-cta">
           <p>Consistency leads to mastery. Don't break the chain.</p>
        </div>
      </div>
    </div>
  );
}
