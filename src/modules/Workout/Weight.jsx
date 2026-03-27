import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, History, TrendingUp, Plus, Trash2 } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useApp } from '../../context/AppContext';
import HapticService from '../../services/HapticService';
import './Weight.css';

export default function Weight() {
  const { weights, addWeight, deleteWeight, userProfile, loading } = useApp();
  const [newWeight, setNewWeight] = useState('');

  const handleLogWeight = async () => {
    if (newWeight && !loading) {
      HapticService.impact(); // Trigger haptic
      await addWeight(newWeight);
      HapticService.notification(); // Success haptic
      setNewWeight('');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this weight entry?")) {
      await deleteWeight(id);
    }
  };

  const renderChart = () => {
    if (weights.length < 2) return (
      <div className="empty-chart-msg">
        <TrendingUp size={32} style={{ opacity: 0.2, marginBottom: '10px' }} />
        <p>Log at least 2 entries to see your trend.</p>
      </div>
    );

    const values = [...weights].reverse().map(w => w.value);
    const min = Math.min(...values) - 0.5;
    const max = Math.max(...values) + 0.5;
    const range = max - min;
    const width = 400;
    const height = 150;

    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="chart-wrapper">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="weight-graph-svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          <polyline
            fill="none"
            stroke="var(--primary)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            style={{ opacity: 0.15, filter: 'blur(6px)' }}
          />
        </svg>
      </div>
    );
  };

  return (
    <motion.div 
      className="weight-container fade-in"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="page-header">
        <h1 className="text-gradient">Weight Tracking</h1>
        <p>Stay consistent with your {userProfile?.goal?.toLowerCase()} plan.</p>
      </header>

      <div className="weight-grid">
        <section className="input-section">
          <Card className="glass-card log-card">
            <div className="card-icon-header">
              <Scale size={24} className="text-gradient" />
              <h3>Log Entry</h3>
            </div>
            <div className="input-row">
              <Input 
                type="number" 
                placeholder="0.0" 
                value={newWeight} 
                onChange={e => setNewWeight(e.target.value)}
                disabled={loading}
              />
              <span className="unit-label">KG</span>
            </div>
            <Button fluid onClick={handleLogWeight} disabled={loading || !newWeight}>
              {loading ? 'Recording...' : 'Save Progress'}
            </Button>
          </Card>
        </section>

        <section className="trend-section">
          <Card className="glass-card chart-card">
            <div className="card-header">
              <h3>Progress Curve</h3>
              <div className="goal-badge">Goal: {userProfile?.goal}</div>
            </div>
            <div className="graph-container">
              {renderChart()}
            </div>
          </Card>
        </section>

        <section className="history-section">
          <div className="section-header">
            <History size={20} />
            <h3>Log History</h3>
          </div>
          <div className="history-list">
            {weights.length === 0 && !loading && (
              <div className="empty-state">No weight logs yet.</div>
            )}
            {[...weights].map((item, idx) => {
              const prev = weights[idx + 1];
              const diff = prev ? (item.value - prev.value).toFixed(1) : null;
              
              return (
                <motion.div 
                  key={item._id || item.id} 
                  className="history-item glass"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="h-info">
                    <span className="h-date">{new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="h-time">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="h-metrics">
                    {diff !== null && (
                      <span className={`h-diff ${diff > 0 ? 'up' : 'down'}`}>
                        {diff > 0 ? `+${diff}` : diff} kg
                      </span>
                    )}
                    <div className="h-main">
                      <span className="h-value">{item.value}</span>
                      <span className="h-unit">kg</span>
                    </div>
                    <button 
                      className="h-delete-btn" 
                      onClick={() => handleDelete(item._id || item.id)}
                      disabled={loading}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
