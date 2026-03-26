import React from 'react';
import './Toggle.css';

export default function Toggle({ label, checked, onChange, icon }) {
  return (
    <div className="fx-toggle-group">
      <div className="fx-toggle-label-box">
        {icon && <span className="fx-toggle-icon">{icon}</span>}
        <span className="fx-toggle-text">{label}</span>
      </div>
      <label className="fx-toggle-switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="fx-toggle-slider"></span>
      </label>
    </div>
  );
}
