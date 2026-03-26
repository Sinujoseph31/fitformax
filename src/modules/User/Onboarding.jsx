import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useApp } from '../../context/AppContext';
import './Auth.css';

export default function Onboarding({ onSwitchToLogin }) {
  const { signup, loading, error, setError } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', password: '', age: '', height: '', weight: '', goal: ''
  });

  const nextStep = () => {
    setError(null);
    setStep(s => s + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep(s => s - 1);
  };

  const handleFinish = async (goal) => {
    try {
      await signup({ ...form, goal });
    } catch (err) {
      // Error handled by context
    }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const renderStep1 = () => (
    <motion.div 
      key="step1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="step-container"
    >
      <div className="auth-header">
        <h1 className="auth-logo text-gradient">Join FitformaX</h1>
        <p className="auth-subtitle">Start your 1% journey today</p>
      </div>

      <div className="auth-form">
        <Input 
          label="Full Name" 
          placeholder="Alex Doe" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
        />
        <Input 
          label="Email" 
          type="email"
          placeholder="alex@example.com" 
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
        
        <Button 
          fluid 
          onClick={nextStep} 
          disabled={!form.name || !form.email || !form.password}
        >
          Next Step
        </Button>
      </div>

      <div className="auth-footer">
        <p>
          Already a member?{' '}
          <button className="fx-btn-text" onClick={onSwitchToLogin} style={{ padding: 0, fontWeight: 700 }}>
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div 
      key="step2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="step-container"
    >
      <div className="auth-header">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Personal Metrics</h2>
        <p className="auth-subtitle">We use this to calibrate your plan</p>
      </div>

      <div className="auth-form">
        <Input label="Age" type="number" placeholder="24" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
        <Input label="Height (CM)" type="number" placeholder="180" value={form.height} onChange={e => setForm({...form, height: e.target.value})} />
        <Input label="Weight (KG)" type="number" placeholder="75" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} />
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="secondary" onClick={prevStep} style={{ flex: 1 }}>Back</Button>
          <Button onClick={nextStep} style={{ flex: 2 }}>Confirm</Button>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div 
      key="step3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="step-container"
    >
      <div className="auth-header">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Select Your Goal</h2>
        <p className="auth-subtitle">AI will personalize your experience</p>
      </div>

      <div className="goal-grid">
        {[
          { id: 'Fat Loss', icon: '🔥', desc: 'Burn fat while maintaining muscle' },
          { id: 'Muscle Gain', icon: '💪', desc: 'Build strength and size' },
          { id: 'Performance', icon: '⚡', desc: 'Optimize for speed and power' }
        ].map(goal => (
          <div 
            key={goal.id} 
            className="goal-option glass" 
            style={{ borderRadius: 'var(--radius-lg)' }}
            onClick={() => handleFinish(goal.id)}
          >
            <div className="goal-icon">{goal.icon}</div>
            <div className="goal-info">
              <h3>{goal.id}</h3>
              <p>{goal.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="text" onClick={prevStep}>Change metrics</Button>
    </motion.div>
  );

  return (
    <div className="auth-page">
      <div className="auth-bg-blob auth-bg-blob-1" />
      <div className="auth-bg-blob auth-bg-blob-2" />

      <div className="auth-card glass-card" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
        <div className="progress-dots">
          {[1, 2, 3].map(i => (
            <div key={i} className={`dot ${step === i ? 'active' : ''}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </AnimatePresence>

        {error && <div className="error-text" style={{ marginTop: '1rem' }}>{error}</div>}
        {loading && <div className="fx-spinner" style={{ margin: '1rem auto' }} />}
      </div>
    </div>
  );
}
