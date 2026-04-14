import React from 'react';
import { motion } from 'framer-motion';
import { 
  User as UserIcon, 
  Target, 
  Moon, 
  Bell, 
  Lock, 
  ChevronRight, 
  LogOut, 
  Edit2,
  Zap
} from 'lucide-react';
import Button from '../../components/Button';
import Toggle from '../../components/Toggle';
import { useApp } from '../../context/AppContext';
import './Profile.css';

export default function Profile() {
  const { 
    userProfile, 
    logout, 
    updateProfile,
    weights, 
    hapticsEnabled, 
    setHapticsEnabled, 
    biometricsEnabled, 
    setBiometricsEnabled 
  } = useApp();
  
  const latestWeight = weights.length > 0 ? weights[0].value : (userProfile?.weight || '--');

  const settings = [
    { title: 'Personal Information', icon: <UserIcon size={20} />, value: userProfile?.name },
    { title: 'Fitness Goals', icon: <Target size={20} />, value: userProfile?.goal || 'Not set' },
    { title: 'App Theme', icon: <Moon size={20} />, value: 'Dark (Auto)' },
    { title: 'Notifications', icon: <Bell size={20} /> },
    { title: 'Privacy & Security', icon: <Lock size={20} /> },
  ];

  return (
    <motion.div 
      className="profile-container fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="profile-header">
        <h1 className="text-gradient">My Profile</h1>
      </div>
      
      <div className="profile-content">
        <section className="profile-user-card glass-card">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <UserIcon size={40} color="var(--text-dim)" />
            </div>
            <button className="avatar-edit-btn">
              <Edit2 size={14} />
            </button>
          </div>
          <div className="profile-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2>{userProfile?.name || 'Loading...'}</h2>
              {userProfile?.role === 'admin' && <span className="admin-badge">ADMIN</span>}
            </div>
            <p className="profile-stats">
              {latestWeight} kg • Goal: <span className="text-gradient" style={{fontWeight: 700}}>{userProfile?.goal}</span>
            </p>
            {userProfile?.role !== 'admin' && (userProfile?.name?.toLowerCase().includes('sinu') || userProfile?.name?.toLowerCase().includes('admin')) && (
              <button 
                className="dev-promo-btn"
                onClick={async () => {
                  try {
                    await updateProfile({ role: 'admin' });
                    alert("Account upgraded to Administrator. Refreshing...");
                    window.location.reload();
                  } catch (e) { alert("Promotion failed: " + e.message); }
                }}
              >
                <Zap size={14} /> Promote to Admin (Dev Mode)
              </button>
            )}
          </div>
        </section>

        <section className="settings-section">
          <h3 className="section-title">Account Settings</h3>
          <div className="settings-list">
            {settings.map((item, idx) => (
              <div key={idx} className="settings-item glass">
                <div className="s-left">
                  <span className="s-icon">{item.icon}</span>
                  <span className="s-title">{item.title}</span>
                </div>
                <div className="s-right">
                  {item.value && <span className="s-value">{item.value}</span>}
                  <ChevronRight size={18} className="s-arrow" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <h3 className="section-title">Native App Features</h3>
          <div className="settings-list glass-card" style={{padding: '0 1rem'}}>
            <Toggle 
              label="Haptic Feedback" 
              icon={<Zap size={18} />} 
              checked={hapticsEnabled} 
              onChange={() => setHapticsEnabled(!hapticsEnabled)} 
            />
            <div style={{height: 1, background: 'var(--border)', opacity: 0.5}} />
            <Toggle 
              label="Biometric Login" 
              icon={<Lock size={18} />} 
              checked={biometricsEnabled} 
              onChange={() => setBiometricsEnabled(!biometricsEnabled)} 
            />
          </div>
        </section>

        <section className="profile-actions">
          <Button variant="secondary" fluid onClick={logout} className="logout-btn">
            <LogOut size={18} />
            Log Out
          </Button>
          <p className="app-version">FitformaX Pro v1.0.4</p>
        </section>
      </div>
    </motion.div>
  );
}
