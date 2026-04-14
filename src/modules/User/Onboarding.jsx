import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useApp } from '../../context/AppContext';
import './Auth.css';

export default function Onboarding({ onSwitchToLogin }) {
  const { signup, loading, error, setError } = useApp();
  const [form, setForm] = useState({
    name: '', email: '', password: ''
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
    } catch (err) {
      // Error handled by context
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-blob auth-bg-blob-1" />
      <div className="auth-bg-blob auth-bg-blob-2" />

      <div className="auth-card glass-card">
        <div className="auth-header">
          <h1 className="auth-logo text-gradient">Join FitformaX</h1>
          <p className="auth-subtitle">Start your 1% journey today</p>
        </div>

        <form className="auth-form" onSubmit={handleSignup}>
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
            type="submit"
            disabled={!form.name || !form.email || !form.password}
          >
            Create Account
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Already a member?{' '}
            <button className="fx-btn-text" onClick={onSwitchToLogin} style={{ padding: 0, fontWeight: 700 }}>
              Sign In
            </button>
          </p>
        </div>

        {error && <div className="error-text" style={{ marginTop: '1rem', textAlign: 'center' }}>{error}</div>}
        {loading && <div className="fx-spinner" style={{ margin: '1rem auto' }} />}
      </div>
    </div>
  );
}
