import React from 'react';

/** 
 * MacroRing — animated SVG circular progress for a single macro
 * Props: value (consumed), max (target), color, label, unit
 */
export default function MacroRing({ value = 0, max = 1, color = '#00f5a0', label, unit = 'g', size = 90 }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min((value / max) * 100, 100);
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="macro-ring-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="macro-ring-svg">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7}
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)', filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
        {/* Center text */}
        <text x="50%" y="44%" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" dy=".1em">
          {Math.round(value)}
        </text>
        <text x="50%" y="62%" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="700" dy=".1em">
          {unit}
        </text>
      </svg>
      <span className="macro-ring-label">{label}</span>
    </div>
  );
}
