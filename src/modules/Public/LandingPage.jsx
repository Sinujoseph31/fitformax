import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Dumbbell, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  Utensils,
  BarChart3,
  MessageSquare,
  HelpCircle,
  FileText,
  Mail,
  Instagram,
  Facebook
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-wrap">
      {/* Navigation Node */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo">
            <Zap className="logo-icon" />
            <span>FitformaX</span>
          </div>
          <div className="nav-links">
            <a href="#why">Why FitformaX?</a>
            <a href="#how">How it Works</a>
            <a href="#faq">FAQ</a>
            <Link to="/login" className="nav-btn-login">Login</Link>
            <Link to="/signup" className="nav-btn-signup">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Sector */}
      <header className="hero-sector">
        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            v2.4 Neural-Training System
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Elite AI Training <br /> for <span>Titans.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A high-fidelity institutional ecosystem engineered to synchronize your <br />
            nutritional intelligence and training protocols. 
          </motion.p>
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/signup" className="hero-btn-primary">
              Initialize Protocol <ArrowRight size={20} />
            </Link>
            <a href="#how" className="hero-btn-secondary">Technical Specs</a>
          </motion.div>
        </div>
      </header>

      {/* Why Choose Section */}
      <section id="why" className="why-section">
        <div className="section-intel">
          <div className="badge">Institutional Edge</div>
          <h2>Why Choose FitformaX?</h2>
          <p>We've eliminated the gap between raw data and tactical execution.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="card-icon"><Utensils /></div>
            <h3>Neural-Nutrition Engine</h3>
            <p>Real-time macro profiling and metabolic tracking synchronized to your training volume.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon"><Activity /></div>
            <h3>Tactical Training Hierarchy</h3>
            <p>Our procedural logic identifies your strength ceilings and engineers protocols to break them.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon"><BarChart3 /></div>
            <h3>Immersive Progress</h3>
            <p>Visualize your ascent through high-fidelity body composition logs and strength metrics.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon"><ShieldCheck /></div>
            <h3>Data Governance</h3>
            <p>Privacy-first architecture ensuring your biological metrics remain secured and private.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="how-section">
        <div className="section-intel">
          <div className="badge">Procedural Logic</div>
          <h2>How it Works</h2>
        </div>

        <div className="steps-container">
          <div className="step-node">
            <div className="step-num">01</div>
            <div className="step-content">
              <h3>Biological Onboarding</h3>
              <p>Initialize your profile with baseline weight, goal metrics, and metabolic status.</p>
            </div>
          </div>
          <div className="step-node">
            <div className="step-num">02</div>
            <div className="step-content">
              <h3>Protocol Selection</h3>
              <p>Choose from our institutional-grade workout libraries or engineer your own custom program.</p>
            </div>
          </div>
          <div className="step-node">
            <div className="step-num">03</div>
            <div className="step-content">
              <h3>Session Execution</h3>
              <p>Execute your protocols with real-time tracking and sync with our neural nutrition hub.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="section-intel">
          <div className="badge">Protocol Intel</div>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-grid">
          <div className="faq-item">
            <h4>Is FitformaX suitable for beginners?</h4>
            <p>Absolutely. Our tactical hierarchy scales from Tier 1 foundations to Tier 3 elite protocols.</p>
          </div>
          <div className="faq-item">
            <h4>Does it sync with wearable devices?</h4>
            <p>We are currently finalizing the synchronization layers for major wearable ecosystems.</p>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="global-footer">
        <div className="footer-top">
          <div className="footer-logo">
            <Zap className="logo-icon" />
            <span>FitformaX</span>
          </div>
          <div className="footer-links-grid">
            <div className="link-col">
              <h5>Platform</h5>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Support</Link>
              <a href="#how">How it Works</a>
            </div>
            <div className="link-col">
              <h5>Governance</h5>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
            <div className="link-col">
              <h5>Connect</h5>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 fitnessformaX. All rights reserved.</p>
          <div className="social-nodes">
            <div className="node"><Mail size={16} /></div>
            <div className="node"><Instagram size={16} /></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
