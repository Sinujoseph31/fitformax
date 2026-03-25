import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useApp } from '../../context/AppContext';
import './Onboarding.css'; // Reusing the dark premium styles

export default function Login({ onSwitchToSignup }) {
  const { login, loading, error, setError } = useApp();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: 'password123'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(credentials);
    } catch (err) {
      // Error is caught and stored in AppContext
    }
  };

  return (
    <div className="fx-onboarding">
      <div className="onboarding-view animate-fade-in">
        <div className="onboarding-brand">
          <span className="brand-dot"></span>
          <h1>FitformaX</h1>
        </div>

        <div className="onboarding-content" style={{ marginTop: '40px' }}>
          <h2>Welcome back.</h2>
          <p className="onboarding-caption" style={{ marginBottom: '32px' }}>
            Enter your details to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {error && <div className="error-text">{error}</div>}
            
            <Input 
              label="Email Address" 
              type="email"
              placeholder="alexdoe@fitformax.com" 
              value={credentials.email} 
              onChange={e => setCredentials({...credentials, email: e.target.value})} 
            />
            
            <Input 
              label="Password" 
              type="password"
              placeholder="••••••••" 
              value={credentials.password} 
              onChange={e => setCredentials({...credentials, password: e.target.value})} 
            />

            <Button 
              type="submit" 
              fluid 
              disabled={loading || !credentials.email || !credentials.password}
            >
              {loading ? 'Authenticating...' : 'Log In'}
            </Button>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>New to FitformaX? </span>
            <Button variant="text" onClick={onSwitchToSignup}>
              Start Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
