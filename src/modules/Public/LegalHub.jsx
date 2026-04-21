import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, ChevronLeft, Zap, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './LegalHub.css';

const LegalHub = () => {
  const location = useLocation();
  const isPrivacy = location.pathname === '/privacy';
  const isTerms = location.pathname === '/terms';

  return (
    <div className="legal-wrap fade-in">
      {/* Mini Nav */}
      <nav className="legal-nav">
        <Link to="/" className="back-link"><ChevronLeft size={20} /> Back to Hub</Link>
        <div className="legal-logo">
          <Zap className="logo-icon" />
          <span>FitformaX Governance</span>
        </div>
      </nav>

      <div className="legal-container">
        <aside className="legal-sidebar">
          <div className="sidebar-group">
            <h5>Governance Nodes</h5>
            <Link to="/privacy" className={`sidebar-link ${isPrivacy ? 'active' : ''}`}>
              <Shield size={18} /> Privacy Policy
            </Link>
            <Link to="/terms" className={`sidebar-link ${isTerms ? 'active' : ''}`}>
              <FileText size={18} /> Terms of Service
            </Link>
          </div>
          <div className="sidebar-group">
            <h5>Support Sectors</h5>
            <Link to="/contact" className="sidebar-link">
              <Mail size={18} /> Contact Support
            </Link>
          </div>
        </aside>

        <main className="legal-content">
          {isPrivacy && (
            <article className="legal-article">
              <h1>Privacy Policy</h1>
              <p className="last-updated">Last Calibration: April 20, 2026</p>
              
              <section>
                <h2>1. Data Autonomy</h2>
                <p>FitformaX operates on a 'Data Autonomy' principle. Your biological metrics, training protocols, and nutritional logs are treated as sovereign assets. We do not sell or lease your metadata to third-party entities.</p>
              </section>

              <section>
                <h2>2. Institutional Security</h2>
                <p>All biological profiles are encrypted through our neural-security layer. Access to your metadata is limited to authorized FitformaX systems for the sole purpose of protocol optimization.</p>
              </section>

              <section>
                <h2>3. Tracking Disclosures</h2>
                <p>We utilize essential telemetry to improve training interface performance. This includes diagnostic logs to ensure the 'Luminous-Pristine' interface operates without latency.</p>
              </section>

              <section>
                <h2>4. Right to Purge</h2>
                <p>Under our 'Tactical Deletion' protocol, users maintain the right to irreversibly purge their entire biological profile and training history through the Settings module.</p>
              </section>
            </article>
          )}

          {isTerms && (
            <article className="legal-article">
              <h1>Terms of Service</h1>
              <p className="last-updated">Last Calibration: April 20, 2026</p>
              
              <section>
                <h2>1. Agreement to Training Protocols</h2>
                <p>By accessing the FitformaX ecosystem, you agree to comply with our institutional training standards and metabolic safety guidelines.</p>
              </section>

              <section>
                <h2>2. Biological Integrity</h2>
                <p>Users are responsible for the accuracy of their baseline biological data. Incorrect data inputs may result in sub-optimal protocol engineering for which FitformaX holds no liability.</p>
              </section>

              <section>
                <h2>3. Proprietary Intelligence</h2>
                <p>The Neural-Nutrition engine, Tactical training hierarchies, and 'Luminous-Pristine' interface are proprietary assets of FitformaX.</p>
              </section>
            </article>
          )}
        </main>
      </div>

      <footer className="legal-footer">
        <p>© 2026 fitnessformaX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LegalHub;
