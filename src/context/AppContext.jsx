import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiCall } from '../utils/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('fx_token'));
  const [userProfile, setUserProfile] = useState({ name: '', age: '', height: '', weight: '', goal: '' });
  const [photos, setPhotos] = useState([]);
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial Load
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [profile, weightData, photoData] = await Promise.all([
        apiCall('/user/profile'),
        apiCall('/weight'),
        apiCall('/photos')
      ]);
      setUserProfile(profile);
      setWeights(weightData);
      setPhotos(photoData);
    } catch (err) {
      if (err.message.includes('authorized')) logout();
      setError(err.message);
    } finally {
      setLoading(false);
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
      // Immediately update profile with onboarding details
      await apiCall('/user/profile', 'PUT', userData);
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

  const logout = () => {
    localStorage.removeItem('fx_token');
    setIsAuthenticated(false);
    setUserProfile({ name: '', age: '', height: '', weight: '', goal: '' });
    setPhotos([]);
    setWeights([]);
  };

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
      // Update local profile weight too
      setUserProfile(prev => ({ ...prev, weight: val }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated, signup, login, logout,
      userProfile, photos, addPhoto,
      weights, addWeight,
      loading, error, setError
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
