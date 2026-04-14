import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowRight, Cake, Ruler, Weight, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './BodyMetricsSetup.css';

const BodyMetricsSetup = () => {
    const { userProfile, updateProfile } = useApp();
    const [step, setStep] = useState(1);
    const [gender, setGender] = useState(userProfile?.gender || '');
    const [age, setAge] = useState(userProfile?.age || '');
    const [height, setHeight] = useState(userProfile?.height || '');
    const [weight, setWeight] = useState(userProfile?.weight || '');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [goal, setGoal] = useState(userProfile?.goal || '');

    const calculateBMI = () => {
        if (!height || !weight || !age) return;
        const hInMeters = height / 100;
        const calculatedBmi = (weight / (hInMeters * hInMeters)).toFixed(1);
        setBmi(calculatedBmi);

        let category = '';
        if (calculatedBmi < 18.5) category = 'Thin';
        else if (calculatedBmi >= 18.5 && calculatedBmi <= 25) category = 'Normal';
        else if (calculatedBmi > 25 && calculatedBmi <= 30) category = 'Overweight';
        else category = 'Obese';

        setBmiCategory(category);
        setStep(3);
    };

    const handleSave = async () => {
        try {
            await updateProfile({
                gender,
                age: Number(age),
                height: Number(height),
                weight: Number(weight),
                bmi: Number(bmi),
                bmiCategory,
                goal
            });
            // App.jsx will automatically re-evaluate the redirect once the profile updates
        } catch (err) {
            console.error('Failed to save onboarding data', err);
        }
    };

    return (
        <div className="body-setup-wrapper fade-in">
            <div className="body-setup-container glass-card">
                <div className="setup-header">
                    <h2>Body Metrics Setup</h2>
                    <p>Let's calibrate FitformaX for you.</p>
                </div>

                <div className="setup-progress">
                    <div className={`progress-step-item ${step >= 1 ? 'active' : ''}`}>
                        <div className="progress-dot-wrapper">
                            <div className="progress-dot" />
                        </div>
                        <span className="progress-label">Gender</span>
                    </div>
                    <div className={`progress-step-item ${step >= 2 ? 'active' : ''}`}>
                        <div className="progress-dot-wrapper">
                            <div className="progress-dot" />
                        </div>
                        <span className="progress-label">Details</span>
                    </div>
                    <div className={`progress-step-item ${step >= 3 ? 'active' : ''}`}>
                        <div className="progress-dot-wrapper">
                            <div className="progress-dot" />
                        </div>
                        <span className="progress-label">Result</span>
                    </div>
                    <div className={`progress-step-item ${step >= 4 ? 'active' : ''}`}>
                        <div className="progress-dot-wrapper">
                            <div className="progress-dot" />
                        </div>
                        <span className="progress-label">Goal</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="setup-step"
                        >
                            <h3>What is your gender?</h3>
                            <div className="gender-cards">
                                <div 
                                    className={`gender-card ${gender === 'male' ? 'selected' : ''}`}
                                    onClick={() => setGender('male')}
                                >
                                    <div className="gender-icon male">
                                        <img src="/male_avatar.png" alt="Male" className="avatar-img" />
                                    </div>
                                    <span>Male</span>
                                </div>
                                <div 
                                    className={`gender-card ${gender === 'female' ? 'selected' : ''}`}
                                    onClick={() => setGender('female')}
                                >
                                    <div className="gender-icon female">
                                        <img src="/female_avatar.png" alt="Female" className="avatar-img" />
                                    </div>
                                    <span>Female</span>
                                </div>
                            </div>
                            <button 
                                className="btn-premium primary full-width"
                                disabled={!gender}
                                onClick={() => setStep(2)}
                            >
                                Continue <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="setup-step"
                        >
                            <h3>Physical Details</h3>
                            <p className="step-subtitle" style={{color: 'var(--text-secondary)'}}>Required to accurately calculate your BMI.</p>
                            
                            <div className="metrics-grid">
                                <div className="input-group">
                                    <label><Cake size={14} /> Age (years)</label>
                                    <input 
                                        type="number" 
                                        value={age} 
                                        onChange={(e) => setAge(e.target.value)} 
                                        placeholder="0"
                                        className="fx-input-premium"
                                    />
                                </div>
                                <div className="input-group">
                                    <label><Ruler size={14} /> Height (cm)</label>
                                    <input 
                                        type="number" 
                                        value={height} 
                                        onChange={(e) => setHeight(e.target.value)} 
                                        placeholder="0"
                                        className="fx-input-premium"
                                    />
                                </div>
                                <div className="input-group full">
                                    <label><Weight size={14} /> Weight (kg)</label>
                                    <input 
                                        type="number" 
                                        value={weight} 
                                        onChange={(e) => setWeight(e.target.value)} 
                                        placeholder="0"
                                        className="fx-input-premium"
                                    />
                                </div>
                            </div>
                            
                            <div className="step-actions">
                                <button className="btn-premium secondary" onClick={() => setStep(1)}>Back</button>
                                <button 
                                    className="btn-premium primary"
                                    disabled={!age || !height || !weight}
                                    onClick={calculateBMI}
                                >
                                    Calculate BMI <Activity size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="setup-step"
                        >
                             <h3>Analysis Complete</h3>
                             <p className="step-subtitle">Based on your physical profile.</p>

                             <div className="bmi-result-card">
                                 <div className="bmi-visual">
                                     <div className="bmi-number-gradient">{bmi}</div>
                                     <div className="bmi-label-small">BMI SCORE</div>
                                 </div>
                                 <div className={`bmi-category-badge ${bmiCategory.toLowerCase()}`}>
                                     {bmiCategory}
                                 </div>
                             </div>
                             
                             <div className="bmi-info-box">
                                 <Info size={16} />
                                 <p>Your ideal BMI range is 18.5 - 25.0. This score helps us tailor your workout intensity and meal plans.</p>
                             </div>

                             <div className="step-actions">
                                <button className="btn-premium secondary" onClick={() => setStep(2)}>Back</button>
                                <button className="btn-premium primary" onClick={() => setStep(4)}>
                                    Define Goal <ArrowRight size={18} />
                                </button>
                             </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="setup-step"
                        >
                            <h3>What is your goal?</h3>
                            <p className="step-subtitle">This helps us personalize your workouts.</p>
                            
                            <div className="goal-grid-onboarding">
                                {[
                                    { id: 'Fat Loss', icon: '🔥', desc: 'Burn fat, stay lean' },
                                    { id: 'Muscle Gain', icon: '💪', desc: 'Build size & strength' },
                                    { id: 'Performance', icon: '⚡', desc: 'Agility & speed' }
                                ].map(g => (
                                    <div 
                                        key={g.id} 
                                        className={`goal-card-setup ${goal === g.id ? 'active' : ''}`}
                                        onClick={() => setGoal(g.id)}
                                    >
                                        <span className="goal-icon-setup">{g.icon}</span>
                                        <div className="goal-txt-setup">
                                            <h4>{g.id}</h4>
                                            <p>{g.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="step-actions">
                                <button className="btn-premium secondary" onClick={() => setStep(3)}>Back</button>
                                <button 
                                    className="btn-premium primary pulse"
                                    disabled={!goal}
                                    onClick={handleSave}
                                >
                                    Finish Setup <div className="fx-spinner-small" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BodyMetricsSetup;
