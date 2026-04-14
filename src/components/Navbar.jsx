import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  User,
  Dumbbell,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Utensils,
  Shield,
  Settings,
  X,
  LogOut
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { userProfile, logout } = useApp();
  const location = useLocation();
  const [showMore, setShowMore] = React.useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const allItems = [
    { path: '/', icon: <LayoutDashboard size={24} />, label: 'Dashboard' },
    { path: '/workout', icon: <Dumbbell size={24} />, label: 'Workout' },
    { path: '/meal', icon: <Utensils size={24} />, label: 'Diet' },
    { path: '/exercises', icon: <BookOpen size={24} />, label: 'Library' },
    { path: '/coach', icon: <MessageSquare size={24} />, label: 'Coach' },
    { path: '/diets', icon: <BookOpen size={24} />, label: 'Diets' },
    { path: '/workouts', icon: <Dumbbell size={24} />, label: 'Workouts' },
    { path: '/track', icon: <TrendingUp size={24} />, label: 'Progress' },
    { path: '/composition', icon: <User size={24} />, label: 'Metrics' },
    { path: '/profile', icon: <User size={24} />, label: 'Profile' },
    ...(userProfile?.role === 'admin' ? [{ path: '/admin', icon: <Shield size={24} />, label: 'Admin' }] : []),
  ];

  // Mobile prioritized items
  const mainMobileItems = allItems.slice(0, 4);
  const moreMobileItems = allItems.slice(4);

  const isMoreActive = moreMobileItems.some(item => location.pathname === item.path);

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav mobile-only glass">
        {mainMobileItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button
          className={`nav-item ${showMore || isMoreActive ? 'active' : ''}`}
          onClick={() => setShowMore(!showMore)}
        >
          <Settings size={24} />
          <span>More</span>
        </button>

        {/* Mobile More Drawer */}
        <AnimatePresence>
          {showMore && (
            <>
              <motion.div
                className="more-menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMore(false)}
              />
              <motion.div
                className="more-menu-drawer glass"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <div className="more-menu-header">
                  <h3>More Options</h3>
                  <button onClick={() => setShowMore(false)}><X size={20} /></button>
                </div>
                <div className="more-menu-grid">
                  {moreMobileItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="more-menu-item"
                      onClick={() => setShowMore(false)}
                    >
                      <div className="item-icon-circle">{item.icon}</div>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                  
                  {/* Logout button in the grid for mobile */}
                  <button className="more-menu-item logout-btn" onClick={handleLogout}>
                    <div className="item-icon-circle logout-icon">
                      <LogOut size={24} />
                    </div>
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <aside className="desktop-sidebar desktop-only glass">
        <div className="sidebar-header">
          <h1 className="text-gradient">FitformaX</h1>
        </div>

        <nav className="sidebar-nav">
          {allItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/settings" className="sidebar-item">
            <Settings size={24} />
            <span>Settings</span>
          </NavLink>
          <button className="sidebar-item logout-link" onClick={handleLogout} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut size={24} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
