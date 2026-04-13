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
import DietLibrary from './modules/DietLibrary/DietLibrary';
import BodyMetricsSetup from './modules/User/BodyMetricsSetup';
import BodyComposition from './modules/User/BodyComposition';
import AdminPanel from './modules/Admin/AdminPanel';
import { useApp } from './context/AppContext';
import NotificationService from './services/NotificationService';
import './styles/global.css';

function App() {
  const { isAuthenticated, isInitializing, loading, userProfile } = useApp();

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

  // Force onboarding if logged in but missing core body metrics
  if (isAuthenticated && userProfile && (!userProfile.gender || !userProfile.bmi)) {
    return <BodyMetricsSetup />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workout" element={<WorkoutHistory />} />
        <Route path="/exercises" element={<ExerciseLibrary />} />
        <Route path="/track" element={<Progress />} />
        <Route path="/composition" element={<BodyComposition />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meal" element={<Diet />} />
        <Route path="/diets" element={<DietLibrary />} />
        <Route path="/coach" element={<Coach />} />
        {userProfile?.role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
        <Route path="/settings" element={<div>Settings Component (TBD)</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
