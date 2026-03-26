import React from 'react';
import './MuscleHighlighter.css';

const MUSCLE_MAP = {
  'Chest': { path: 'M110,65 Q115,65 120,65 L125,70 Q130,75 130,85 L130,100 Q120,105 110,105 L100,100 Q95,90 95,80 L100,70 Z', label: 'Chest' },
  'Lats': { path: 'M130,100 L135,110 Q145,130 145,160 L135,170 Q120,165 110,160 L115,120 Z', label: 'Lats' },
  'Abs': { path: 'M110,110 Q115,110 120,110 L122,145 Q115,150 108,145 Z', label: 'Abs' },
  'Quads': { path: 'M110,185 Q125,185 135,190 L140,240 Q125,250 110,245 Z', label: 'Quads' },
  'Shoulders': { path: 'M130,65 Q135,65 140,70 L145,85 Q145,100 135,105 L130,85 Z', label: 'Delts' },
  'Biceps': { path: 'M145,85 Q155,90 160,100 L160,125 Q150,135 145,120 Z', label: 'Biceps' },
  'Triceps': { path: 'M145,85 Q155,80 165,90 L165,115 Q155,125 145,110 Z', label: 'Triceps' },
  'Forearms': { path: 'M160,125 Q165,135 168,160 L160,170 Q150,165 145,140 Z', label: 'Forearms' },
  'Calves': { path: 'M115,260 Q125,260 130,270 L132,310 Q120,320 110,315 Z', label: 'Calves' },
  'Glutes': { path: 'M110,165 Q125,165 135,170 L135,195 Q120,205 110,200 Z', label: 'Glutes' },
  'Hamstrings': { path: 'M110,205 Q125,205 135,210 L135,255 Q120,265 110,260 Z', label: 'Hamstrings' }
};

export default function MuscleHighlighter({ targetedMuscles = [] }) {
  const activeMuscles = targetedMuscles.map(m => {
    if (m.includes('Chest')) return 'Chest';
    if (m.includes('Lat') || m.includes('Back')) return 'Lats';
    if (m.includes('Abs') || m.includes('Core')) return 'Abs';
    if (m.includes('Quad')) return 'Quads';
    if (m.includes('Shoulder') || m.includes('Delt')) return 'Shoulders';
    if (m.includes('Bicep')) return 'Biceps';
    if (m.includes('Tricep')) return 'Triceps';
    if (m.includes('Forearm')) return 'Forearms';
    if (m.includes('Calf')) return 'Calves';
    if (m.includes('Glute')) return 'Glutes';
    if (m.includes('Hamstring')) return 'Hamstrings';
    return m;
  });

  return (
    <div className="muscle-highlighter">
      <div className="anatomy-labels">
        {targetedMuscles.map(m => <span key={m} className="anatomy-badge">{m}</span>)}
      </div>
      <svg viewBox="0 0 240 360" className="anatomical-svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Skeleton Body */}
        <g className="base-body" opacity="0.1">
          <path d="M120,40 Q135,40 135,25 Q135,10 120,10 Q105,10 105,25 Q105,40 120,40 Z" />
          <path d="M120,45 L145,60 L145,170 L95,170 L95,60 Z" />
          <path d="M145,60 L170,90 L170,175 L145,170 Z" />
          <path d="M95,60 L70,90 L70,175 L95,170 Z" />
          <path d="M100,170 L115,255 L115,330 L100,335 Z" />
          <path d="M140,170 L125,255 L125,330 L140,335 Z" />
        </g>

        {/* Targeted Muscles */}
        <g className="active-muscles">
          {Object.entries(MUSCLE_MAP).map(([name, data]) => {
            const isActive = activeMuscles.includes(name);
            return (
              <g key={name} className={isActive ? 'muscle-group active' : 'muscle-group'}>
                <path d={data.path} />
                <path d={data.path} transform="scale(-1, 1) translate(-240, 0)" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
