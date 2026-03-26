import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useApp } from '../../context/AppContext';
import './Auth.css';

export default function Login({ onSwitchToSignup }) {
  const { login, loading, error, setError } = useApp();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
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
    <div className="auth-page">
      <div className="auth-bg-blob auth-bg-blob-1" />
      <div className="auth-bg-blob auth-bg-blob-2" />
      
      <motion.div 
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <h1 className="auth-logo text-gradient">FitformaX</h1>
          <p className="auth-subtitle">Elevate your performance</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <motion.div 
              className="error-text"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {error}
            </motion.div>
          )}
          
          <Input 
            label="Email" 
            type="email"
            placeholder="name@example.com" 
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
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            New here?{' '}
            <button 
              className="fx-btn-text" 
              onClick={onSwitchToSignup}
              style={{ padding: 0, fontWeight: 700 }}
            >
              Create Account
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
