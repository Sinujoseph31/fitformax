import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import StatCard from '../../components/StatCard';
import Button from '../../components/Button';
import './Dashboard.css';
import { useApp } from '../../context/AppContext';
import { apiCall } from '../../utils/api';

export default function Dashboard({ onNavigate }) {
  const { userProfile, weights, photos } = useApp();
  const [insights, setInsights] = useState({ recommendation: null, diet: null, workout: null });
  const [loadingInsights, setLoadingInsights] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const [recRes, dietRes, workRes] = await Promise.all([
          apiCall('/insights/recommendations'),
          apiCall('/insights/diet'),
          apiCall('/insights/workout')
        ]);
        setInsights({ recommendation: recRes, diet: dietRes, workout: workRes });
      } catch (error) {
        console.error("Failed to load insights", error);
      } finally {
        setLoadingInsights(false);
      }
    };
    if (userProfile.goal) fetchInsights();
  }, [userProfile.goal, weights]);

  const latestWeight = weights.length > 0 ? weights[0].value : userProfile.weight;
  const latestPhoto = photos.length > 0 ? photos[0].url : null;

  return (
    <div className="fx-dashboard animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div className="dashboard-header-premium">
        <div className="brand-header">
          <div className="brand-dot" />
          <span className="brand-name">FitformaX</span>
        </div>
        <div className="header-avatar" />
      </div>

      <Header 
        title={`Hi, ${userProfile.name || 'User'}`} 
        subtitle="Your smart daily summary"
      />

      <div className="dashboard-content">
        <section className="section-quick-actions" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <Button fluid onClick={() => onNavigate('weight')} style={{ flex: 1, padding: '12px 0' }}>Log Weight</Button>
          <Button fluid onClick={() => onNavigate('progress')} style={{ flex: 1, padding: '12px 0', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }}>Add Photo</Button>
        </section>

        <section className="section-stats">
          <div className="stats-grid">
            <StatCard label="Weight" value={latestWeight} unit="kg" icon="⚖" />
            <StatCard label="Goal" value={userProfile.goal || '--'} unit="" icon="🎯" />
            <StatCard label="Photos" value={photos.length} unit="" icon="📸" />
          </div>
        </section>

        {!loadingInsights && insights.recommendation && (
          <section className="section-recommendation">
            <Card highlight className="recommendation-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="recommendation-badge">{insights.recommendation.status === 'Getting Started' ? 'ONBOARDING' : 'AI INSIGHT'}</div>
                  {insights.recommendation.status !== 'Getting Started' && insights.recommendation.status !== 'AI Insight' && (
                    <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 600, 
                    color: insights.recommendation.status === 'On Track' ? 'var(--accent-neon)' : 
                           (insights.recommendation.status === 'Check Data' || insights.recommendation.status === 'Stagnant' || insights.recommendation.status === 'Slow Progress') ? '#FFD166' : 
                           '#FF4A4A' 
                  }}>
                    {insights.recommendation.status}
                  </span>
                  )}
                </div>
                
                {!insights.recommendation.isStarted && (
                  <div style={{ 
                    fontSize: '0.85rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px',
                    backgroundColor: insights.recommendation.trend === 'increasing' ? (userProfile.goal === 'Muscle Gain' ? 'rgba(0, 255, 156, 0.1)' : 'rgba(255, 74, 74, 0.1)') : 
                                     insights.recommendation.trend === 'decreasing' ? (userProfile.goal === 'Fat Loss' ? 'rgba(0, 255, 156, 0.1)' : 'rgba(255, 74, 74, 0.1)') : 
                                     'rgba(255, 255, 255, 0.1)',
                    color: insights.recommendation.trend === 'increasing' ? (userProfile.goal === 'Muscle Gain' ? 'var(--accent-neon)' : '#FF4A4A') : 
                           insights.recommendation.trend === 'decreasing' ? (userProfile.goal === 'Fat Loss' ? 'var(--accent-neon)' : '#FF4A4A') : 
                           'var(--text-secondary)'
                  }}>
                    {insights.recommendation.diff > 0 ? '+' : ''}{parseFloat(Math.abs(insights.recommendation.diff).toFixed(1))} kg {insights.recommendation.trend === 'increasing' ? '↑' : insights.recommendation.trend === 'decreasing' ? '↓' : '→'} <span style={{fontWeight: 'normal', opacity: 0.8}}> (past {insights.recommendation.timeframe})</span>
                  </div>
                )}
                
                {insights.recommendation.isStarted && (
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFD166' }}>
                    {insights.recommendation.currentCount === 3 ? "3 of 3 entries completed" : `Progress: ${insights.recommendation.currentCount || 0} / 3 entries`}
                  </div>
                )}
              </div>
              
              <h3 style={{ fontSize: '1.2rem', marginTop: '8px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                {insights.recommendation.message}
              </h3>
              
              {!insights.recommendation.isStarted && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Suggested Action:</span>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{insights.recommendation.action}</span>
                </div>
              )}

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Button variant="text" onClick={() => onNavigate('weight')} style={{ padding: 0, height: 'auto', fontWeight: '600' }}>
                  → Log today's weight
                </Button>
              </div>
            </Card>
            <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Updated: Today
            </div>
          </section>
        )}

        {!loadingInsights && insights.diet && (
          <section className="section-diet">
            <h3 style={{ margin: '24px 0 16px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>🍽️ {userProfile.goal} Diet ({latestWeight} kg)</h3>
            <Card className="routine-card">
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-neon)', marginBottom: '8px' }}>Based on your goal</div>
              <div className="routine-row"><strong>Breakfast:</strong> {insights.diet.breakfast}</div>
              <div className="routine-row"><strong>Lunch:</strong> {insights.diet.lunch}</div>
              <div className="routine-row"><strong>Snack:</strong> {insights.diet.snack}</div>
              <div className="routine-row"><strong>Dinner:</strong> {insights.diet.dinner}</div>
            </Card>
          </section>
        )}

        {!loadingInsights && insights.workout && (
          <section className="section-workout">
            <h3 style={{ margin: '24px 0 16px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>🏋️ Weekly Routine</h3>
            <Card highlight className="workout-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: 'var(--accent-neon)', fontWeight: 600 }}>{insights.workout.focus}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '8px' }}>Week 1 Plan</span>
              </div>
              {insights.workout.schedule.map((day, idx) => (
                <div key={idx} className="workout-row" style={{ color: 'var(--text-secondary)', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {day}
                </div>
              ))}
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
