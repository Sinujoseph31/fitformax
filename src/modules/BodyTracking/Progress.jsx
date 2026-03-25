import React, { useRef } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import SliderUI from '../../components/SliderUI';
import './Progress.css';
import { useApp } from '../../context/AppContext';

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

  return (
    <div className="fx-progress animate-fade-in">
      <Header title="Progress" subtitle="Visual transformation" />
      
      <div className="progress-content">
        <SliderUI />
        
        <div className="gallery-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <h3>Gallery</h3>
            <button 
              className="fx-btn fx-btn-text" 
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
            >
              {loading ? 'UPLOADING...' : '+ ADD PHOTO'}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="photo-grid">
            {photos.length === 0 && !loading && <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No photos uploaded yet.</p>}
            {photos.map(photo => (
              <div key={photo._id || photo.id} className="photo-item">
                <img src={photo.url} className="photo-real" alt="Progress" />
                <span className="photo-date">{new Date(photo.timestamp).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
