import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Dumbbell, 
  TrendingUp, 
  MessageSquare, 
  BookOpen,
  Utensils,
  Settings 
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={24} />, label: 'Dashboard' },
    { path: '/workout', icon: <Dumbbell size={24} />, label: 'Workout' },
    { path: '/exercises', icon: <BookOpen size={24} />, label: 'Library' },
    { path: '/meal', icon: <Utensils size={24} />, label: 'Meals' },
    { path: '/track', icon: <TrendingUp size={24} />, label: 'Progress' },
    { path: '/coach', icon: <MessageSquare size={24} />, label: 'AI Coach' },
    { path: '/profile', icon: <User size={24} />, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav mobile-only glass">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Desktop Sidebar Navigation */}
      <aside className="desktop-sidebar desktop-only glass">
        <div className="sidebar-header">
          <h1 className="text-gradient">FitformaX</h1>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
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
        </div>
      </aside>
    </>
  );
};

export default Navbar;
