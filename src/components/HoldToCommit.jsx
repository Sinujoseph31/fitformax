import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './HoldToCommit.css';

const HoldToCommit = ({ onComplete, text = "Hold to Commit", duration = 2000 }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const controls = useAnimation();

  const startHold = () => {
    setIsHolding(true);
    startTimeRef.current = Date.now();
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(timerRef.current);
        onComplete();
      }
    }, 10);
  };

  const endHold = () => {
    setIsHolding(false);
    clearInterval(timerRef.current);
    setProgress(0);
  };

  return (
    <div className="hold-commit-container">
      <motion.button
        className={`hold-commit-button ${isHolding ? 'holding' : ''}`}
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        animate={controls}
        whileTap={{ scale: 0.96 }}
      >
        <div className="hold-commit-bg" style={{ width: `${progress}%` }} />
        <span className="hold-commit-text">{text}</span>
        
        <svg className="hold-commit-svg" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="48" 
            className="hold-commit-circle-bg" 
          />
          <circle 
            cx="50" cy="50" r="48" 
            className="hold-commit-circle-progress" 
            style={{ 
              strokeDasharray: '301.59', 
              strokeDashoffset: 301.59 - (301.59 * progress) / 100 
            }}
          />
        </svg>
      </motion.button>
      
      <p className="hold-commit-hint">Hold for 2 seconds to finalize your plan</p>
    </div>
  );
};

export default HoldToCommit;
