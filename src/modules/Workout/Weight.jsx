import React, { useState } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './Weight.css';
import { useApp } from '../../context/AppContext';

export default function Weight() {
  const { weights, addWeight, userProfile, loading } = useApp();
  const [newWeight, setNewWeight] = useState('');

  const handleLogWeight = async () => {
    if (newWeight && !loading) {
      await addWeight(newWeight);
      setNewWeight('');
    }
  };

  const renderChart = () => {
    if (weights.length < 2) return (
      <div className="empty-chart-msg">Log at least 2 entries to see the trend.</div>
    );

    const values = [...weights].reverse().map(w => w.value);
    const min = Math.min(...values) - 0.5;
    const max = Math.max(...values) + 0.5;
    const range = max - min;
    const width = 300;
    const height = 100;

    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="weight-graph-svg">
        <polyline
          fill="none"
          stroke="var(--accent-neon)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        <polyline
          fill="none"
          stroke="var(--accent-neon)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          style={{ opacity: 0.2, filter: 'blur(4px)' }}
        />
      </svg>
    );
  };

  return (
    <div className="fx-weight animate-fade-in">
      <Header title="Weight" subtitle="Track your progress" />
      
      <div className="weight-content">
        <section className="weight-input-card">
          <Input 
            label="Log Current Weight" 
            type="number" 
            placeholder="75.4" 
            value={newWeight} 
            onChange={e => setNewWeight(e.target.value)}
            disabled={loading}
          />
          <Button fluid onClick={handleLogWeight} disabled={loading || !newWeight}>
            {loading ? 'LOGGING...' : 'Log Weight'}
          </Button>
        </section>

        <section className="weight-visual">
          <h3>Weight Trend</h3>
          <div className="graph-container-real">
            {renderChart()}
          </div>
        </section>

        <section className="weight-history">
          <div className="history-header">
            <h3>History</h3>
            <span className="current-stat">Goal: {userProfile.goal || 'Set Goal'}</span>
          </div>
          <div className="history-list">
            {weights.length === 0 && <p style={{ color: 'var(--text-secondary)', padding: '20px' }}>No entries found.</p>}
            {[...weights].map(item => (
              <div key={item._id || item.id} className="history-item">
                <div className="h-left">
                  <span className="h-date">{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="h-right">
                  <span className="h-value">{item.value}</span>
                  <span className="h-unit">kg</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
