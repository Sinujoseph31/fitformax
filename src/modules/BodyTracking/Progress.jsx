import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, ImageIcon, History } from 'lucide-react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import SliderUI from '../../components/SliderUI';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import './Progress.css';

export default function Progress() {
  const { photos, compositions, addPhoto, loading } = useApp();
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

  // Format composition data for Recharts, sorting chronological (oldest to newest)
  const chartData = (compositions || [])
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(c => ({
      date: new Date(c.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      bodyFat: c.bodyFatPercent,
      muscle: c.skeletalMuscle
    }))
    // Filter out entries that have neither fat nor muscle info
    .filter(c => c.bodyFat != null || c.muscle != null);

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
        {/* Analytics Charts */}
        {chartData.length > 0 && (
          <section className="analytics-section glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div className="section-title" style={{ marginBottom: '1.5rem' }}>
              <History size={18} />
              <span>Body Composition Trends</span>
            </div>
            
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" />
                  <YAxis yAxisId="left" stroke="#ff0844" />
                  <YAxis yAxisId="right" orientation="right" stroke="#4facfe" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" name="Body Fat (%)" dataKey="bodyFat" stroke="#ff0844" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" name="Muscle Mass (kg)" dataKey="muscle" stroke="#4facfe" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

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
