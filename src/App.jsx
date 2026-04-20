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
import WorkoutLibrary from './modules/Workout/WorkoutLibrary';
import WorkoutSession from './modules/Workout/WorkoutSession';
import TrainingSchedule from './modules/Workout/TrainingSchedule';

import BodyMetricsSetup from './modules/User/BodyMetricsSetup';
import BodyComposition from './modules/User/BodyComposition';
import Settings from './modules/User/Settings';
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

  return (
    <Routes>
      {/* AUTHENTICATION GATEWAY */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <AuthContainer /> : <Navigate to="/" replace />} 
      />

      {/* PROTECTED ECOSYSTEM */}
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            userProfile && (!userProfile.gender || !userProfile.bmi) ? (
              <BodyMetricsSetup />
            ) : (
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/workout" element={<WorkoutHistory />} />
                  <Route path="/schedule" element={<TrainingSchedule />} />
                  <Route path="/session" element={<WorkoutSession onFinish={() => window.location.href = '/workout'} />} />
                  <Route path="/exercises" element={<ExerciseLibrary />} />
                  <Route path="/track" element={<Progress />} />
                  <Route path="/composition" element={<BodyComposition />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/meal" element={<Diet />} />
                  <Route path="/diets" element={<DietLibrary />} />
                  <Route path="/workouts" element={<WorkoutLibrary />} />
                  <Route path="/coach" element={<Coach />} />
                  {userProfile?.role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AppLayout>
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
