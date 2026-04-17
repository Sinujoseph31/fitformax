import React, { useRef, useEffect, useState } from 'react';
import './TitanPickers.css';

/**
 * 3D Wheel Picker for Ages and Weights
 */
export const TitanWheel = ({ min, max, value, onChange, label = "" }) => {
  const scrollRef = useRef(null);
  const items = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const ITEM_HEIGHT = 80;

  // Custom dragging logic for desktop mice
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTopStart, setScrollTopStart] = useState(0);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTopStart(scrollRef.current.scrollTop);
    scrollRef.current.style.scrollSnapType = 'none'; // Disable snap while dragging
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const dy = e.clientY - startY;
    scrollRef.current.scrollTop = scrollTopStart - dy;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
        scrollRef.current.style.scrollSnapType = 'y mandatory';
    }
  };

  const handleScroll = (e) => {
    if (!scrollRef.current) return;
    const scrollPos = e.target.scrollTop;
    const selectedIndex = Math.round(scrollPos / ITEM_HEIGHT);
    
    // Bounds check
    const safeIndex = Math.max(0, Math.min(selectedIndex, items.length - 1));
    const newValue = items[safeIndex];
    
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
        const index = items.indexOf(value);
        if (index !== -1) {
            scrollRef.current.scrollTop = index * ITEM_HEIGHT;
        }
    }
  }, []);

  return (
    <div className="titan-picker-container">
        <div className="titan-wheel">
            <div className="titan-wheel-mask"></div>
            <div 
                className="titan-wheel-items" 
                ref={scrollRef} 
                onScroll={handleScroll}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                style={{ touchAction: 'none' }} /* Prevent browser default dragging */
            >
                {items.map((item) => (
                    <div 
                        key={item} 
                        className={`titan-wheel-item ${item === value ? 'selected' : ''}`}
                    >
                        {item} {item === value && label && <span style={{fontSize: '1rem', marginLeft: '8px', color: 'var(--primary)'}}>{label}</span>}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

/**
 * Interactive Horizontal Ruler for Height
 */
export const TitanRuler = ({ min, max, value, onChange }) => {
    const rulerRef = useRef(null);
    const steps = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const ITEM_WIDTH = 20;

    // Custom dragging logic for desktop mice
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftStart, setScrollLeftStart] = useState(0);

    const handlePointerDown = (e) => {
      setIsDragging(true);
      setStartX(e.clientX);
      setScrollLeftStart(rulerRef.current.scrollLeft);
      rulerRef.current.style.scrollSnapType = 'none'; // Disable snap while dragging
    };
  
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const dx = e.clientX - startX;
      rulerRef.current.scrollLeft = scrollLeftStart - dx;
    };
  
    const handlePointerUp = () => {
      setIsDragging(false);
      if (rulerRef.current) {
          rulerRef.current.style.scrollSnapType = 'x mandatory';
      }
    };
  
    const handleScroll = (e) => {
      if (!rulerRef.current) return;
      const scrollPos = e.target.scrollLeft;
      const selectedIndex = Math.round(scrollPos / ITEM_WIDTH);
      
      const safeIndex = Math.max(0, Math.min(selectedIndex, steps.length - 1));
      const newValue = steps[safeIndex];
      
      if (newValue !== value) {
        onChange(newValue);
      }
    };

    useEffect(() => {
        if (rulerRef.current) {
            const index = steps.indexOf(value);
            if (index !== -1) {
                // Ensure initial setup aligns cleanly without snap breaking it
                setTimeout(() => {
                  rulerRef.current.scrollLeft = index * ITEM_WIDTH;
                }, 50);
            }
        }
    }, []);
  
    return (
      <div className="titan-picker-container">
          <div className="titan-ruler">
            <div className="ruler-center-pointer"></div>
            <div className="ruler-shadow-overlay"></div>
            <div 
                className="titan-ruler-track" 
                ref={rulerRef} 
                onScroll={handleScroll}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                style={{ touchAction: 'none' }} /* Prevent browser default dragging */
            >
              {steps.map((step) => (
                <div key={step} className={`ruler-mark ${step % 10 === 0 ? 'major' : ''}`}>
                  {step % 10 === 0 && <span className="ruler-num">{step}</span>}
                  <div className="ruler-line"></div>
                </div>
              ))}
            </div>
          </div>
      </div>
    );
  };
