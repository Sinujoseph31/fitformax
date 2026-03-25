import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import './Onboarding.css';
import { useApp } from '../../context/AppContext';

export default function Onboarding({ onSwitchToLogin }) {
  const { signup, loading, error, setError } = useApp();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('next');
  
  const [form, setForm] = useState({
    name: '', email: '', password: '', age: '', height: '', weight: '', goal: ''
  });

  const goToStep = (nextStep) => {
    setError(null);
    setDirection(nextStep > step ? 'next' : 'prev');
    setStep(nextStep);
  };

  const handleFinish = async (goal) => {
    try {
      await signup({ ...form, goal });
    } catch (err) {
      // Error handled by context
    }
  };

  const ProgressBanner = () => (
    <div className="onboarding-progress-container">
      <div className="onboarding-progress-bar">
        <div 
          className="onboarding-progress-fill" 
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderWelcome = () => (
    <div className="onboarding-view animate-fade-in">
      <div className="onboarding-brand">
        <span className="brand-dot"></span>
        <h1>FitformaX</h1>
      </div>

      <div className="onboarding-content main-hero" style={{ marginTop: '20px' }}>
        <h2>Your premium fitness journey starts here.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          <Input 
            label="Your Name" 
            placeholder="Alex Doe" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
          />
          <Input 
            label="Email Address" 
            type="email"
            placeholder="alexdoe@example.com" 
            value={form.email} 
            onChange={e => setForm({...form, email: e.target.value})} 
          />
          <Input 
            label="Password" 
            type="password"
            placeholder="••••••••" 
            value={form.password} 
            onChange={e => setForm({...form, password: e.target.value})} 
          />
        </div>
        
        <Button 
          fluid 
          onClick={() => goToStep(2)} 
          disabled={!form.name || !form.email || !form.password}
        >
          Get Started
        </Button>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Already tracked here? </span>
          <Button variant="text" onClick={onSwitchToLogin} style={{ padding: '4px 8px' }}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );

  const renderInfo = () => (
    <div className={`onboarding-view ${direction === 'next' ? 'animate-slide-in' : 'animate-fade-in'}`}>
      <div className="onboarding-header">
        <Button variant="text" onClick={() => goToStep(1)}>← BACK</Button>
      </div>
      <ProgressBanner />
      <h2>Tell us about yourself</h2>
      <div className="onboarding-form-section">
        <Input label="Age" type="number" placeholder="24" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
        <Input label="Height (CM)" type="number" placeholder="180" value={form.height} onChange={e => setForm({...form, height: e.target.value})} />
        <Input label="Current Weight (KG)" type="number" placeholder="78" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} />
        <div className="form-spacer" />
        <Button fluid onClick={() => goToStep(3)}>Continue</Button>
      </div>
    </div>
  );

  const renderGoal = () => (
    <div className={`onboarding-view ${direction === 'next' ? 'animate-slide-in' : 'animate-fade-in'}`}>
      <div className="onboarding-header">
        <Button variant="text" onClick={() => goToStep(2)}>← BACK</Button>
      </div>
      <ProgressBanner />
      <h2>What is your main goal?</h2>
      <div className="goal-selection">
        {error && <p className="error-text">{error}</p>}
        {[
          { id: 'Fat Loss', icon: '🔥' },
          { id: 'Muscle Gain', icon: '💪' },
          { id: 'Maintain', icon: '⚖' }
        ].map(goal => (
          <Card 
            key={goal.id} 
            className="goal-card-refined" 
            onClick={() => handleFinish(goal.id)}
            disabled={loading}
          >
            <div className="goal-icon-wrapper">{goal.icon}</div>
            <div className="goal-details">
              <span className="goal-label-main">{goal.id}</span>
              <span className="goal-caption">Optimized plans for {goal.id.toLowerCase()}.</span>
            </div>
          </Card>
        ))}
      </div>
      <p className="onboarding-caption">{loading ? 'Creating your account...' : 'Tap a goal to complete setup.'}</p>
    </div>
  );

  return (
    <div className="fx-onboarding">
      {step === 1 && renderWelcome()}
      {step === 2 && renderInfo()}
      {step === 3 && renderGoal()}
    </div>
  );
}
