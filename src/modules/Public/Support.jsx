import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Zap, ChevronLeft, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Support.css';

const Support = () => {
  return (
    <div className="support-wrap fade-in">
       {/* Navigation Hub */}
       <nav className="legal-nav">
        <Link to="/" className="back-link"><ChevronLeft size={20} /> Back to Hub</Link>
        <div className="legal-logo">
          <Zap className="logo-icon" />
          <span>FitformaX Support</span>
        </div>
      </nav>

      <div className="support-container">
        {/* About Section */}
        <section className="about-sector">
          <div className="badge">Our Mission</div>
          <h1>About fitnessformaX</h1>
          <p className="about-lead">
            FitformaX is an elite training ecosystem engineered to bridge the gap between raw biological data and tactical physical execution. 
          </p>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon"><Globe size={24} /></div>
              <h3>Global Performance</h3>
              <p>Scaling high-fidelity training protocols for athletes and titans worldwide.</p>
            </div>
            <div className="about-card">
              <div className="about-icon"><Shield size={24} /></div>
              <h3>Data Governance</h3>
              <p>We prioritize biological integrity through sovereign metadata encryption.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-sector">
          <div className="contact-grid">
            <div className="contact-intel">
              <div className="badge">Direct Line</div>
              <h2>Contact Support</h2>
              <p>Our tactical support team is ready to assist with protocol optimization and system synchronization.</p>
              
              <div className="contact-methods">
                <div className="method">
                  <Mail className="m-icon" />
                  <div className="m-intel">
                    <span>Email Protocol</span>
                    <strong>support@fitnessformax.com</strong>
                  </div>
                </div>
                <div className="method">
                  <Phone className="m-icon" />
                  <div className="m-intel">
                    <span>Emergency Frequency</span>
                    <strong>+1 (888) TITAN-FX</strong>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-field">
                <label>Callsign / Name</label>
                <input type="text" placeholder="Enter your name" className="fx-input" />
              </div>
              <div className="input-field">
                <label>Encryption / Email</label>
                <input type="email" placeholder="agent@mission.com" className="fx-input" />
              </div>
              <div className="input-field">
                <label>Message Content</label>
                <textarea placeholder="Describe your challenge..." className="fx-input" rows="5"></textarea>
              </div>
              <button className="fx-btn-primary full-width">
                Dispatch Message <Send size={18} />
              </button>
            </form>
          </div>
        </section>
      </div>

      <footer className="legal-footer">
        <p>© 2026 fitnessformaX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Support;
