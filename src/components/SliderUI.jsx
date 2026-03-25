import React, { useState } from 'react';
import './SliderUI.css';

export default function SliderUI() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="fx-slider-container">
      <div className="fx-slider-image before" />
      <div 
        className="fx-slider-image after" 
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      />
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos} 
        onChange={(e) => setSliderPos(e.target.value)} 
        className="fx-slider-handle"
      />
      <div className="fx-slider-line" style={{ left: `${sliderPos}%` }}>
        <div className="fx-slider-knob">
          <span>⟷</span>
        </div>
      </div>
      
      <div className="fx-slider-label before-label">BEFORE</div>
      <div className="fx-slider-label after-label">AFTER</div>
    </div>
  );
}
