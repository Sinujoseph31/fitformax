import React from 'react';
import Card from './Card';
import './StatCard.css';

export default function StatCard({ label, value, unit, icon, trend, highlight = false }) {
  return (
    <Card className={`fx-stat-card ${highlight ? 'highlight' : ''}`}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        {trend && (
          <span className={`stat-trend ${trend > 0 ? 'up' : 'down'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="stat-body">
        <div className="stat-label">{label}</div>
        <div className="stat-value">
          {value} <span className="stat-unit">{unit}</span>
        </div>
      </div>
    </Card>
  );
}
