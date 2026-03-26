import React from 'react';
import Navbar from '../components/Navbar';

export default function AppLayout({ children, hideNav = false }) {
  return (
    <div className="app-container">
      {!hideNav && <Navbar />}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
