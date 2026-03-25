import React, { useState } from 'react';
import Onboarding from './Onboarding';
import Login from './Login';

export default function AuthContainer() {
  const [view, setView] = useState('login'); // 'login' or 'signup'

  if (view === 'login') {
    return <Login onSwitchToSignup={() => setView('signup')} />;
  }

  return <Onboarding onSwitchToLogin={() => setView('login')} />;
}
