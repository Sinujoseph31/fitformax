import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, UploadCloud, Image as ImageIcon, CheckCircle, FileText, Weight, Ruler, Droplets, Target, Zap, Trash2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiCall } from '../../utils/api';
import './BodyComposition.css';

// Sample reference images
import frontMale from '../../assets/samples/front_sample.png';
import sideMale from '../../assets/samples/side_sample.png';
import frontFemale from '../../assets/samples/front_female.png';
import sideFemale from '../../assets/samples/side_female.png';

const BodyComposition = () => {
    const { addPhoto, addWeight, compositions, userProfile, loadAllData } = useApp();
    const [activeTab, setActiveTab] = useState('body'); // 'body', 'receipt', 'manual'
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    
    // Manual Form State
    const [form, setForm] = useState({
        weight: '',
        skeletalMuscle: '',
        bodyFatPercent: '',
        bmi: '',
        waistHipRatio: '',
        waterRate: ''
    });

    const fileInputRef = useRef(null);

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                entryMethod: 'manual',
                weight: Number(form.weight) || undefined,
                skeletalMuscle: Number(form.skeletalMuscle) || undefined,
                bodyFatPercent: Number(form.bodyFatPercent) || undefined,
                bmi: Number(form.bmi) || undefined,
                waistHipRatio: Number(form.waistHipRatio) || undefined,
                waterRate: Number(form.waterRate) || undefined
            };
            
            await apiCall('/composition', 'POST', payload);
            await loadAllData(); // Refresh global state
            
            setSuccessMsg('Body composition logs saved successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
            setForm({ weight: '', skeletalMuscle: '', bodyFatPercent: '', bmi: '', waistHipRatio: '', waterRate: '' });
        } catch (err) {
            console.error('Failed to save manual log', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        
        setDeleteLoading(id);
        try {
            await apiCall(`/composition/${id}`, 'DELETE');
            await loadAllData();
            setSuccessMsg('Entry deleted successfully');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Failed to delete log', err);
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            // 1. Upload to Claudinary via photos route
            const uploadedPhoto = await apiCall('/photos', 'POST', formData, true);
            
            // 2. Register it as a Composition log
            await apiCall('/composition', 'POST', {
                entryMethod: activeTab === 'receipt' ? 'bca_receipt' : 'body_image',
                imageUrl: uploadedPhoto.url
            });

            setSuccessMsg('Image uploaded and saved for reference!');
            setTimeout(() => setSuccessMsg(''), 4000);
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setLoading(false);
        }
    };

    const isFemale = userProfile?.gender?.toLowerCase() === 'female';
    const frontRef = isFemale ? frontFemale : frontMale;
    const sideRef = isFemale ? sideFemale : sideMale;

    // Filter history based on active tab
    const filteredHistory = (compositions || []).filter(log => {
        if (activeTab === 'manual') return log.entryMethod === 'manual';
        if (activeTab === 'receipt') return log.entryMethod === 'bca_receipt';
        if (activeTab === 'body') return log.entryMethod === 'body_image';
        return true;
    });

    return (
        <div className="composition-page fade-in">
            <div className="composition-header">
                <h1>Body Composition Tracker</h1>
                <p className="text-secondary">Log your detailed metrics or upload reference images to track your long-term progress visually.</p>
            </div>

            <div className="composition-tabs">
                <button 
                    className={`comp-tab ${activeTab === 'body' ? 'active' : ''}`}
                    onClick={() => setActiveTab('body')}
                >
                    <ImageIcon size={18} /> Body Image
                </button>
                <button 
                    className={`comp-tab ${activeTab === 'receipt' ? 'active' : ''}`}
                    onClick={() => setActiveTab('receipt')}
                >
                    <FileText size={18} /> BCA Receipt
                </button>
                <button 
                    className={`comp-tab ${activeTab === 'manual' ? 'active' : ''}`}
                    onClick={() => setActiveTab('manual')}
                >
                    <Activity size={18} /> Manual Entry
                </button>
            </div>

            <div className="comp-content">
                <AnimatePresence mode="wait">
                    {/* MANUAL ENTRY */}
                    {activeTab === 'manual' && (
                        <motion.form 
                            key="manual"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleManualSubmit}
                        >
                            <div className="manual-grid">
                                <div className="form-group">
                                    <label><Weight size={14} /> Weight (kg)</label>
                                    <input type="number" step="0.1" className="fx-input-premium" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} placeholder="0.0" required />
                                </div>
                                <div className="form-group">
                                    <label><Zap size={14} /> Body Fat (%)</label>
                                    <input type="number" step="0.1" className="fx-input-premium" value={form.bodyFatPercent} onChange={e => setForm({...form, bodyFatPercent: e.target.value})} placeholder="0.0" />
                                </div>
                                <div className="form-group">
                                    <label><Activity size={14} /> Skeletal Muscle (kg)</label>
                                    <input type="number" step="0.1" className="fx-input-premium" value={form.skeletalMuscle} onChange={e => setForm({...form, skeletalMuscle: e.target.value})} placeholder="0.0" />
                                </div>
                                <div className="form-group">
                                    <label><Target size={14} /> BMI</label>
                                    <input type="number" step="0.1" className="fx-input-premium" value={form.bmi} onChange={e => setForm({...form, bmi: e.target.value})} placeholder="0.0" />
                                </div>
                                <div className="form-group">
                                    <label><Ruler size={14} /> Waist-Hip Ratio</label>
                                    <input type="number" step="0.01" className="fx-input-premium" value={form.waistHipRatio} onChange={e => setForm({...form, waistHipRatio: e.target.value})} placeholder="0.00" />
                                </div>
                                <div className="form-group">
                                    <label><Droplets size={14} /> Water Rate (%)</label>
                                    <input type="number" step="0.1" className="fx-input-premium" value={form.waterRate} onChange={e => setForm({...form, waterRate: e.target.value})} placeholder="0.0" />
                                </div>
                            </div>
                            
                            <button type="submit" className="btn-premium primary pulse" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                                {loading ? 'Saving...' : 'Save Metrics'}
                            </button>
                        </motion.form>
                    )}

                    {/* RECEIPT UPLOAD */}
                    {activeTab === 'receipt' && (
                        <motion.div 
                            key="receipt"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                                <UploadCloud className="upload-icon" />
                                <h3>Upload BCA Receipt</h3>
                                <p className="text-secondary">Capture your Body Composition Analyzer printout and upload it for your records.</p>
                                <button className="btn-select-image" disabled={loading}>
                                    {loading ? 'Uploading...' : 'Select Image'}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* BODY IMAGE UPLOAD */}
                    {activeTab === 'body' && (
                        <motion.div 
                            key="body"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                                <UploadCloud className="upload-icon" />
                                <h3>Upload Physique Image</h3>
                                <p className="text-secondary">A picture is worth a thousand numbers. Track your visual progress over time.</p>
                                <button className="btn-select-image" disabled={loading}>
                                    {loading ? 'Uploading...' : 'Select Image'}
                                </button>
                            </div>

                            <div className="sample-images">
                                <div className="sample-card">
                                    <div className="sample-placeholder">
                                        <img src={frontRef} alt="Front Profile Reference" className="sample-ref-img" />
                                    </div>
                                    <h4>Front Profile</h4>
                                    <p>Stand straight, arms slightly apart.</p>
                                </div>
                                <div className="sample-card">
                                    <div className="sample-placeholder">
                                        <img src={sideRef} alt="Side Profile Reference" className="sample-ref-img" />
                                    </div>
                                    <h4>Side Profile</h4>
                                    <p>Stand naturally, arms down.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Common Hidden File Input */}
                <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />

                {/* Success Message Banner */}
                {successMsg && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card success"
                        style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', color: '#4caf50', padding: '1rem 2rem' }}
                    >
                        <CheckCircle /> <span>{successMsg}</span>
                    </motion.div>
                )}
                {/* RECENT HISTORY SECTION */}
                <div className="recent-history-section">
                    <div className="section-header">
                        <div className="title-with-icon">
                            <Clock size={20} className="icon-blue" />
                            <h3>Recent History</h3>
                        </div>
                        <span className="count-badge">{filteredHistory.length} Entries</span>
                    </div>

                    <div className="history-list">
                        {filteredHistory.length === 0 ? (
                            <div className="empty-history">No {activeTab.replace('_', ' ')} logs yet.</div>
                        ) : (
                            filteredHistory.slice(0, 5).map(log => (
                                <div key={log._id} className="history-item glass-card">
                                    <div className="history-info">
                                        <div className="history-main">
                                            <span className="history-date">
                                                {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="history-method">{log.entryMethod.replace('_', ' ')}</span>
                                        </div>
                                        <div className="history-stats">
                                            {log.weight && <span className="stat-pill"><Weight size={12} /> {log.weight}kg</span>}
                                            {log.bodyFatPercent && <span className="stat-pill"><Zap size={12} /> {log.bodyFatPercent}% Fat</span>}
                                            {log.skeletalMuscle && <span className="stat-pill"><Activity size={12} /> {log.skeletalMuscle}kg Muscle</span>}
                                        </div>
                                    </div>
                                    <button 
                                        className="history-delete-btn" 
                                        onClick={() => handleDelete(log._id)}
                                        disabled={deleteLoading === log._id}
                                        title="Delete Entry"
                                    >
                                        {deleteLoading === log._id ? '...' : <Trash2 size={16} />}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyComposition;
