import React from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import './Profile.css';
import { useApp } from '../../context/AppContext';

export default function Profile() {
  const { userProfile, logout, weights } = useApp();
  
  const latestWeight = weights.length > 0 ? weights[0].value : userProfile.weight;

  const settings = [
    { title: 'Personal Information', icon: '👤', value: userProfile.name },
    { title: 'Fitness Goals', icon: '🎯', value: userProfile.goal },
    { title: 'App Theme', icon: '🌙', value: 'Dark' },
    { title: 'Notifications', icon: '🔔' },
    { title: 'Privacy & Security', icon: '🔒' },
  ];

  return (
    <div className="fx-profile animate-fade-in">
      <Header title="Profile" subtitle="Manage your account" />
      
      <div className="profile-content">
        <section className="profile-user-card">
          <div className="profile-avatar">
            <div className="avatar-edit-badge">✎</div>
          </div>
          <div className="profile-info">
            <h2>{userProfile.name || 'Alex Doe'}</h2>
            <p>Current: {latestWeight} kg • Goal: {userProfile.goal}</p>
          </div>
        </section>

        <section className="settings-section">
          <h3>Settings</h3>
          <div className="settings-list">
            {settings.map((item, idx) => (
              <div key={idx} className="settings-item">
                <div className="s-left">
                  <span className="s-icon">{item.icon}</span>
                  <span className="s-title">{item.title}</span>
                </div>
                <div className="s-right">
                  {item.value && <span className="s-value">{item.value}</span>}
                  <span className="s-arrow">˃</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-actions">
          <Button variant="secondary" fluid onClick={logout}>Log Out</Button>
          <p className="app-version">FitformaX Phase 2 (Functional)</p>
        </section>
      </div>
    </div>
  );
}
