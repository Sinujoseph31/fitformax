import React, { useState, useEffect } from 'react';
import DietTracker from './DietTracker';
import DietPlanViewer from './DietPlanViewer';
import DietDiscovery from './DietDiscovery';
import './Diet.css';

export default function Diet() {
  const [activeTab, setActiveTab] = useState('tracker');
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fx_diet_plan');
    if (savedPlan) {
      try { setActivePlan(JSON.parse(savedPlan)); } catch (err) {}
    }
  }, []);

  const handlePlanSave = (plan) => {
    localStorage.setItem('fx_diet_plan', JSON.stringify(plan));
    setActivePlan(plan);
  };

  const handleRetake = () => {
    setActivePlan(null);
    localStorage.removeItem('fx_diet_plan');
  };

  return (
    <div className="diet-page fade-in">
      {/* ── Premium Tab Bar ── */}
      <div className="diet-tabs-nav">
        <button
          className={`diet-tab ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          Daily Tracker
        </button>
        <button
          className={`diet-tab ${activeTab === 'plan' ? 'active' : ''}`}
          onClick={() => setActiveTab('plan')}
        >
          My Plan
        </button>
      </div>

      <div className="diet-tab-content">
        {activeTab === 'tracker' && <DietTracker />}
        {activeTab === 'plan' && (
          activePlan
            ? <DietPlanViewer activePlan={activePlan} onRetake={handleRetake} />
            : <DietDiscovery onSave={handlePlanSave} />
        )}
      </div>
    </div>
  );
}
