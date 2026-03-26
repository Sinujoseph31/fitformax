import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, ImageIcon, History } from 'lucide-react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import SliderUI from '../../components/SliderUI';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';
import './Progress.css';

export default function Progress() {
  const { photos, addPhoto, loading } = useApp();
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      await addPhoto(formData);
    }
  };

  // Get before (oldest) and after (newest) photos
  const beforePhoto = photos.length > 0 ? photos[photos.length - 1] : null;
  const afterPhoto = photos.length > 0 ? photos[0] : null;

  return (
    <motion.div 
      className="progress-container fade-in"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="page-header">
        <h1 className="text-gradient">Visual Progress</h1>
        <p>Track your physical transformation over time.</p>
      </header>

      <div className="progress-grid">
        {/* Transformation Slider */}
        <section className="transformation-hero">
          <div className="section-title">
            <History size={18} />
            <span>Before & After</span>
          </div>
          <SliderUI 
            beforeImage={beforePhoto?.url} 
            afterImage={afterPhoto?.url}
            beforeDate={beforePhoto ? new Date(beforePhoto.timestamp).toLocaleDateString() : null}
            afterDate={afterPhoto ? new Date(afterPhoto.timestamp).toLocaleDateString() : null}
          />
        </section>

        {/* Gallery Section */}
        <section className="gallery-section">
          <div className="section-header">
            <div className="header-left">
              <ImageIcon size={20} />
              <h3>Photo History</h3>
            </div>
            <Button 
              className="upload-btn"
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
            >
              <Plus size={18} />
              <span>{loading ? 'Uploading...' : 'Add Photo'}</span>
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="photo-grid">
            {photos.length === 0 && !loading && (
              <div className="empty-gallery glass">
                <Camera size={48} color="var(--text-dim)" />
                <p>Your transformation gallery is empty.</p>
                <small>Upload your first photo to start tracking.</small>
              </div>
            )}
            
            {photos.map((photo, idx) => (
              <motion.div 
                key={photo._id || photo.id} 
                className="photo-card glass"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={photo.url} className="photo-img" alt="Progress" />
                <div className="photo-overlay">
                  <span className="photo-date">
                    {new Date(photo.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
