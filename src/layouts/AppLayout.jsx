import React from 'react';
import BottomNav from '../components/BottomNav';
import './AppLayout.css';

export default function AppLayout({ children, activeTab, onTabSelect, hideNav = false }) {
  return (
    <div className="fx-app-layout">
      <main className="fx-main-content">
        <div className="container">
          {children}
        </div>
      </main>
      {!hideNav && <BottomNav activeTab={activeTab} onTabSelect={onTabSelect} />}
    </div>
  );
}
