import React from 'react';

/** 
 * MacroRing — SVG circular progress for a single macro
 * Updated: Light Mode compatible text colors
 */
export default function MacroRing({ value = 0, max = 1, color = '#FF3366', label, unit = 'g', size = 90 }) {
  const strokeWidth = size > 100 ? 8 : 6;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const offset = circumference - (pct / 100) * circumference;

  // Text sizes scale with ring size
  const valFontSize = size > 100 ? 15 : 12;
  const unitFontSize = size > 100 ? 10 : 8;

  return (
    <div className="macro-ring-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="macro-ring-svg">
        {/* Track — light grey for light mode */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
        {/* Center value — dark text for light mode */}
        <text x="50%" y="44%" textAnchor="middle" fill="#0f172a" fontSize={valFontSize} fontWeight="900" dy=".1em">
          {Math.round(value)}
        </text>
        <text x="50%" y="63%" textAnchor="middle" fill="#64748b" fontSize={unitFontSize} fontWeight="700" dy=".1em">
          {unit}
        </text>
      </svg>
      <span className="macro-ring-label">{label}</span>
    </div>
  );
}
