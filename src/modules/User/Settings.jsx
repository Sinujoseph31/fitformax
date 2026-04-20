import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings as SettingsIcon, 
  ChevronRight, 
  Bell, 
  Shield, 
  LogOut, 
  Fingerprint, 
  Target,
  CircleUserRound,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Settings.css';

const Settings = () => {
  const { 
    userProfile, 
    updateProfile, 
    logout, 
    hapticsEnabled, 
    setHapticsEnabled, 
    biometricsEnabled, 
    setBiometricsEnabled,
    loading 
  } = useApp();

  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    goal: userProfile?.goal || 'gain',
    gender: userProfile?.gender || 'male'
  });

  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleGoalChange = (newGoal) => {
    setFormData(prev => ({ ...prev, goal: newGoal }));
  };

  const handleGenderChange = (newGender) => {
    setFormData(prev => ({ ...prev, gender: newGender }));
  };

  return (
    <div className="settings-container fade-in">
      <header className="settings-header">
        <div className="header-intel">
          <h1>System Control</h1>
          <p>Biological Profile & Preferences</p>
        </div>
        <div className="header-action">
          <button className="fx-btn-icon secondary" onClick={logout}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="settings-grid">
        {/* Profile Sect */}
        <section className="settings-sect profile-hub">
          <div className="sect-header">
            <CircleUserRound className="sect-icon" />
            <h3>Biological Profile</h3>
          </div>
          
          <form className="settings-form" onSubmit={handleUpdate}>
            <div className="input-group">
              <label>Agent Name</label>
              <input 
                type="text" 
                className="fx-input"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter display name"
              />
            </div>

            <div className="input-group">
              <label>Tactical Goal</label>
              <div className="fx-segmented-tabs">
                <button 
                  type="button"
                  className={`fx-segmented-tab ${formData.goal === 'gain' ? 'active' : ''}`}
                  onClick={() => handleGoalChange('gain')}
                >
                  <span>Hypertrophy</span>
                </button>
                <button 
                  type="button"
                  className={`fx-segmented-tab ${formData.goal === 'lose' ? 'active' : ''}`}
                  onClick={() => handleGoalChange('lose')}
                >
                  <span>Metabolic Burn</span>
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Biological Gender</label>
              <div className="fx-segmented-tabs">
                <button 
                  type="button"
                  className={`fx-segmented-tab ${formData.gender === 'male' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('male')}
                >
                  <span>Male</span>
                </button>
                <button 
                  type="button"
                  className={`fx-segmented-tab ${formData.gender === 'female' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('female')}
                >
                  <span>Female</span>
                </button>
              </div>
            </div>

            <button type="submit" className="fx-btn-primary full-width" disabled={loading}>
              {loading ? <div className="fx-spinner mini" /> : 'Synchronize Profile'}
            </button>
            
            {success && <p className="status-msg success">Governance Updated Successfully</p>}
          </form>
        </section>

        {/* System Preferences */}
        <div className="settings-column">
          <section className="settings-sect preferences-hub">
            <div className="sect-header">
              <SettingsIcon className="sect-icon" />
              <h3>System Interface</h3>
            </div>

            <div className="pref-list">
              <div className="pref-item">
                <div className="pref-intel">
                  <div className="pref-title">Haptic Response</div>
                  <div className="pref-desc">Tactile vibration on interactions</div>
                </div>
                <div 
                  className={`fx-toggle ${hapticsEnabled ? 'active' : ''}`}
                  onClick={() => setHapticsEnabled(!hapticsEnabled)}
                >
                  <div className="toggle-knob" />
                </div>
              </div>

              <div className="pref-item">
                <div className="pref-intel">
                  <div className="pref-title">Biometric Lock</div>
                  <div className="pref-desc">Use Fingerprint/FaceID for access</div>
                </div>
                <div 
                  className={`fx-toggle ${biometricsEnabled ? 'active' : ''}`}
                  onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                >
                  <div className="toggle-knob" />
                </div>
              </div>
            </div>
          </section>

          <section className="settings-sect security-hub">
            <div className="sect-header">
              <Shield className="sect-icon" />
              <h3>Protocol & Security</h3>
            </div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-lbl">Account Tier</span>
                <span className="badge-primary">{userProfile?.role?.toUpperCase() || 'USER'}</span>
              </div>
              <div className="info-item">
                <span className="info-lbl">Email Address</span>
                <span className="text-muted">{userProfile?.email}</span>
              </div>
              <div className="info-item">
                <span className="info-lbl">Core Version</span>
                <span className="text-muted">v2.4.0-Stable</span>
              </div>
            </div>
          </section>

          <button className="fx-btn-danger outline full-width" onClick={logout} style={{ marginTop: 'auto' }}>
            <LogOut size={16} />
            Terminte Active Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
