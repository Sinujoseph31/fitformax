import React, { useState } from 'react';
import './SliderUI.css';

export default function SliderUI({ beforeImage, afterImage, beforeDate, afterDate }) {
  const [sliderPos, setSliderPos] = useState(50);

  if (!beforeImage || !afterImage) {
    return (
      <div className="fx-slider-placeholder glass">
        <p>Log more photos to see your transformation!</p>
      </div>
    );
  }

  return (
    <div className="fx-slider-container glass">
      <div 
        className="fx-slider-image before" 
        style={{ backgroundImage: `url(${beforeImage})` }} 
      />
      <div 
        className="fx-slider-image after" 
        style={{ 
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 0 0 ${sliderPos}%)` 
        }}
      />
      
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos} 
        onChange={(e) => setSliderPos(e.target.value)} 
        className="fx-slider-range"
      />
      
      <div className="fx-slider-divider" style={{ left: `${sliderPos}%` }}>
        <div className="fx-slider-handle">
          <span>⟷</span>
        </div>
      </div>
      
      <div className="fx-slider-label before-label">
        <span>BEFORE</span>
        {beforeDate && <small>{beforeDate}</small>}
      </div>
      <div className="fx-slider-label after-label">
        <span>AFTER</span>
        {afterDate && <small>{afterDate}</small>}
      </div>
    </div>
  );
}
