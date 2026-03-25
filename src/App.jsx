import React, { useState } from 'react';
import AppLayout from './layouts/AppLayout';
import AuthContainer from './modules/User/AuthContainer';
import Dashboard from './modules/Dashboard/Dashboard';
import Progress from './modules/BodyTracking/Progress';
import Weight from './modules/Workout/Weight';
import Profile from './modules/User/Profile';
import Coach from './modules/Coach/Coach';
import { useApp } from './context/AppContext';
import './styles/global.css';

function App() {
  const { isAuthenticated, loading } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'progress': return <Progress />;
      case 'weight': return <Weight />;
      case 'profile': return <Profile />;
      case 'coach': return <Coach />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  // Global Loading Spinner Overlay
  const LoadingOverlay = () => (
    <div className="fx-loading-overlay">
      <div className="fx-spinner" />
    </div>
  );

  if (!isAuthenticated) {
    return (
      <>
        <AuthContainer />
        {loading && <LoadingOverlay />}
      </>
    );
  }

  return (
    <AppLayout activeTab={activeTab} onTabSelect={setActiveTab}>
      <div style={{ position: 'relative', minHeight: '100%' }}>
        {renderContent()}
        {loading && <LoadingOverlay />}
      </div>
    </AppLayout>
  );
}

export default App;
