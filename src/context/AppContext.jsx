import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiCall } from '../utils/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('fx_token'));
  const [userProfile, setUserProfile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [weights, setWeights] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [compositions, setCompositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState(null);
  const [hapticsEnabled, setHapticsEnabled] = useState(() => JSON.parse(localStorage.getItem('fx_haptics')) ?? true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(() => JSON.parse(localStorage.getItem('fx_biometrics')) ?? false);

  // Sync settings to localStorage
  useEffect(() => {
    localStorage.setItem('fx_haptics', JSON.stringify(hapticsEnabled));
  }, [hapticsEnabled]);

  useEffect(() => {
    localStorage.setItem('fx_biometrics', JSON.stringify(biometricsEnabled));
  }, [biometricsEnabled]);

  // Initial Load
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('fx_token');
      if (token) {
        try {
          await loadAllData();
        } catch (err) {
          console.error("Auto-initialization failed", err);
          logout(); // Immediate decertification
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsInitializing(false);
    };
    init();
  }, []); // Run once on startup

  const loadAllData = async () => {
    try {
      const [profile, weightData, photoData, workoutData, compData] = await Promise.all([
        apiCall('/user/profile'),
        apiCall('/weight'),
        apiCall('/photos'),
        apiCall('/workouts'),
        apiCall('/composition')
      ]);
      setUserProfile(profile);
      setWeights(weightData);
      setPhotos(photoData);
      setWorkouts(workoutData);
      setCompositions(compData);
      setIsAuthenticated(true);
    } catch (err) {
      if (err.message.toLowerCase().includes('authorized') || 
          err.message.toLowerCase().includes('token') ||
          err.status === 401) {
        logout();
      }
      throw err;
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const data = await apiCall('/auth/signup', 'POST', { 
        name: userData.name, 
        email: userData.email,
        password: userData.password
      });
      localStorage.setItem('fx_token', data.token);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await apiCall('/auth/login', 'POST', credentials);
      localStorage.setItem('fx_token', data.token);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('fx_token');
    setIsAuthenticated(false);
    setUserProfile(null);
    setPhotos([]);
    setWeights([]);
    setWorkouts([]);
    setCompositions([]);
  }, []);

  const addPhoto = async (formData) => {
    setLoading(true);
    try {
      const newPhoto = await apiCall('/photos', 'POST', formData, true);
      setPhotos(prev => [newPhoto, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addWeight = async (val) => {
    setLoading(true);
    try {
      const newVal = await apiCall('/weight', 'POST', { value: val });
      setWeights(prev => [newVal, ...prev]);
      setUserProfile(prev => ({ ...prev, weight: val }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteWeight = async (id) => {
    setLoading(true);
    try {
      await apiCall(`/weight/${id}`, 'DELETE');
      setWeights(prev => prev.filter(w => w._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveWorkout = async (workoutData) => {
    setLoading(true);
    try {
      const saved = await apiCall('/workouts', 'POST', workoutData);
      setWorkouts(prev => [saved, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    setLoading(true);
    try {
      const updated = await apiCall('/user/profile', 'PUT', data);
      setUserProfile(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      await apiCall('/user/profile', 'DELETE');
      logout();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated, signup, login, logout, updateProfile, deleteAccount,
      userProfile, photos, addPhoto,
      weights, addWeight, deleteWeight,
      workouts, saveWorkout,
      compositions, loadAllData,
      hapticsEnabled, setHapticsEnabled,
      biometricsEnabled, setBiometricsEnabled,
      loading, isInitializing, error, setError
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
