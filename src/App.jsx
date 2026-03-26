import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AuthContainer from './modules/User/AuthContainer';
import Dashboard from './modules/Dashboard/Dashboard';
import Progress from './modules/BodyTracking/Progress';
import WorkoutHistory from './modules/Workout/WorkoutHistory';
import ExerciseLibrary from './modules/Workout/ExerciseLibrary';
import Profile from './modules/User/Profile';
import Coach from './modules/Coach/Coach';
import Diet from './modules/Diet/Diet';
import { useApp } from './context/AppContext';
import NotificationService from './services/NotificationService';
import './styles/global.css';

function App() {
  const { isAuthenticated, isInitializing, loading } = useApp();

  useEffect(() => {
    // Initialize notifications
    NotificationService.init().catch(err => {
      console.warn('Notification init failed', err);
    });
  }, []);

  // Global Loading Spinner Overlay
  const LoadingOverlay = () => (
    <div className="fx-loading-overlay">
      <div className="fx-spinner" />
    </div>
  );

  if (isInitializing) return <LoadingOverlay />;

  if (!isAuthenticated) {
    return <AuthContainer />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workout" element={<WorkoutHistory />} />
        <Route path="/exercises" element={<ExerciseLibrary />} />
        <Route path="/track" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meal" element={<Diet />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/settings" element={<div>Settings Component (TBD)</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
