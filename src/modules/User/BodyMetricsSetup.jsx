import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowRight, ArrowLeft, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import HoldToCommit from '../../components/HoldToCommit';
import { TitanWheel, TitanRuler } from '../../components/TitanPickers';
import './BodyMetricsSetup.css';

// Focus area hotspots on our generated body map
const FOCUS_AREAS = [
    { id: 'chest', label: 'Chest', top: '25%', left: '50%' },
    { id: 'abs', label: 'Abdominals', top: '45%', left: '50%' },
    { id: 'arms', label: 'Arms', top: '35%', left: '30%' },
    { id: 'legs', label: 'Legs', top: '70%', left: '50%' },
    { id: 'back', label: 'Back', top: '35%', left: '70%' },
];

const BodyMetricsSetup = () => {
    const { userProfile, updateProfile } = useApp();
    const [step, setStep] = useState(1);
    
    // Detailed Bio-Data State (Revamped)
    const [gender, setGender] = useState(userProfile?.gender || '');
    const [goal, setGoal] = useState(userProfile?.goal || '');
    const [focusAreas, setFocusAreas] = useState([]);
    const [age, setAge] = useState(25);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [targetWeight, setTargetWeight] = useState(65);
    
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const toggleFocus = (id) => {
        setFocusAreas(prev => 
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const handleFinalize = async () => {
        setIsAnalyzing(true);
        // Phase 1.3: Simulated AI Analysis Animation
        setTimeout(async () => {
            try {
                await updateProfile({
                    gender,
                    goal,
                    focusAreas,
                    age: Number(age),
                    height: Number(height),
                    weight: Number(weight),
                    targetWeight: Number(targetWeight),
                    bmi: (weight / ((height/100) * (height/100))).toFixed(1),
                    onboarded: true
                });
            } catch (err) {
                console.error('Finalization Error', err);
            } finally {
                setIsAnalyzing(false);
            }
        }, 3000);
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    // Monochrome effect logic
    const grayscaleValue = Math.max(0, 100 - (step * 12));

    return (
        <div className="body-setup-wrapper" style={{ filter: `grayscale(${grayscaleValue}%)`, transition: 'filter 1.2s ease' }}>
            <div className="body-setup-container titan-card">
                
                {/* Global Progress Header */}
                <div className="setup-header">
                    <div className="titan-step-indicator">STEP {step} OF 7</div>
                    <div className="titan-progress-bar">
                        <motion.div 
                            className="titan-progress-fill" 
                            animate={{ width: `${(step / 7) * 100}%` }} 
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {isAnalyzing ? (
                       <motion.div key="analyzing" className="setup-step analysis-mode">
                          <div className="analysis-scanner">
                              <Activity size={80} className="scan-icon" />
                              <div className="scan-line" />
                          </div>
                          <h2>Synthesizing Bio-Plan</h2>
                          <p>Mapping training vectors to your anatomical signature...</p>
                       </motion.div>
                    ) : (
                        <>
                            {/* Step 1: Gender */}
                            {step === 1 && (
                                <motion.div key="s1" className="setup-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <h2>Biological Orientation</h2>
                                    <p className="step-subtitle">Identify your starting physiological baseline.</p>
                                    <div className="gender-grid-v2">
                                        {['male', 'female', 'other'].map(g => (
                                            <div key={g} className={`gender-option-titan ${gender === g ? 'active' : ''}`} onClick={() => setGender(g)}>
                                                <div className="titan-radio-dot" />
                                                <span className="gender-label">{g.toUpperCase()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn-titan primary full-width" disabled={!gender} onClick={nextStep}>Initiate Selection</button>
                                </motion.div>
                            )}

                            {/* Step 2: Goal */}
                            {step === 2 && (
                                <motion.div key="s2" className="setup-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <button className="btn-back" onClick={prevStep}><ArrowLeft size={16} /></button>
                                    <h2>Primary Directive</h2>
                                    <p className="step-subtitle">What is your ultimate physical output?</p>
                                    <div className="goal-selection-v2">
                                        {[
                                            { id: 'gain', label: 'MUSCLE BUILD', desc: 'Hypertrophy & Power focus' },
                                            { id: 'loss', label: 'WEIGHT LOSS', desc: 'Shredding & Metabolic optimization' },
                                            { id: 'performance', label: 'ATHLETIC PEAK', desc: 'Agility, Speed & Endurance' }
                                        ].map(g => (
                                            <div key={g.id} className={`goal-card-titan-v2 ${goal === g.id ? 'active' : ''}`} onClick={() => setGoal(g.id)}>
                                                <div className="titan-radio-dot" />
                                                <div className="goal-text-wrapper">
                                                    <h4>{g.label}</h4>
                                                    <p>{g.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn-titan primary full-width" disabled={!goal} onClick={nextStep}>Secure Choice</button>
                                </motion.div>
                            )}

                            {/* Step 3: Area of Focus */}
                            {step === 3 && (
                                <motion.div key="s3" className="setup-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <button className="btn-back" onClick={prevStep}><ArrowLeft size={16} /></button>
                                    <h2>Target Matrices</h2>
                                    <p className="step-subtitle">Select anatomical zones for precision focus.</p>
                                    <div className="anatomical-map-container">
                                        <img 
                                            src={gender === 'female' ? "/titan_body_map_female.png" : "/titan_body_map_male.png"} 
                                            className="body-map-img" 
                                            alt="Body Map" 
                                        />
                                        {FOCUS_AREAS.map(area => (
                                            <div 
                                                key={area.id} 
                                                className={`map-hotspot ${focusAreas.includes(area.id) ? 'active' : ''}`}
                                                style={{ top: area.top, left: area.left }}
                                                onClick={() => toggleFocus(area.id)}
                                            >
                                                <div className="hotspot-ring" />
                                                <div className="hotspot-center" />
                                                <span className="hotspot-label">{area.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn-titan primary full-width" disabled={focusAreas.length === 0} onClick={nextStep}>Confirm Targets</button>
                                </motion.div>
                            )}

                            {/* Step 4: Age */}
                            {step === 4 && (
                                <motion.div key="s4" className="setup-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <button className="btn-back" onClick={prevStep}><ArrowLeft size={16} /></button>
                                    <h2>Metabolic Chronology</h2>
                                    <p className="step-subtitle">Set your current biological age.</p>
                                    <TitanWheel min={12} max={100} value={age} onChange={setAge} label="Years" />
                                    <button className="btn-titan primary full-width" onClick={nextStep}>Set Age</button>
                                </motion.div>
                            )}

                            {/* Step 5: Height */}
                            {step === 5 && (
                                <motion.div key="s5" className="setup-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <button className="btn-back" onClick={prevStep}><ArrowLeft size={16} /></button>
                                    <h2>Vertical Bio-Signature</h2>
                                    <div className="height-value-v2">{height} <span className="u">CM</span></div>
                                    <TitanRuler min={100} max={250} value={height} onChange={setHeight} />
                                    <button className="btn-titan primary full-width" onClick={nextStep}>Set Height</button>
                                </motion.div>
                            )}

                            {/* Step 6: Weight */}
                            {step === 6 && (
                                <motion.div key="s6" className="setup-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <button className="btn-back" onClick={prevStep}><ArrowLeft size={16} /></button>
                                    <h2>Current Mass</h2>
                                    <p className="step-subtitle">Calibrating starting weight vectors.</p>
                                    <TitanWheel min={30} max={250} value={weight} onChange={setWeight} label="KG" />
                                    <button className="btn-titan primary full-width" onClick={nextStep}>Set Mass</button>
                                </motion.div>
                            )}

                            {/* Step 7: Target Weight & BMI Analysis */}
                            {step === 7 && (
                                <motion.div key="s7" className="setup-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <button className="btn-back" onClick={prevStep}><ArrowLeft size={16} /></button>
                                    <h2>Baseline Analysis</h2>
                                    <p className="step-subtitle">Review your bio-metrics before finalizing.</p>
                                    
                                    <div className="bmi-display-card">
                                        <div className="bmi-value-circle">
                                            <span>BMI</span>
                                            <strong>{(weight / Math.pow(height / 100, 2)).toFixed(1)}</strong>
                                        </div>
                                        <div className="bmi-status-text">
                                            {(() => {
                                                const bmi = (weight / Math.pow(height / 100, 2));
                                                if (bmi < 18.5) return <span style={{ color: "var(--secondary)" }}>Underweight Baseline</span>;
                                                if (bmi < 25) return <span style={{ color: "var(--primary)" }}>Optimal Standard</span>;
                                                if (bmi < 30) return <span style={{ color: "var(--secondary)" }}>Elevated Baseline</span>;
                                                return <span style={{ color: "var(--text-main)" }}>Titan Rebuild Target</span>;
                                            })()}
                                        </div>
                                    </div>

                                    <div className="weight-comparisonv2">
                                        <div className="weight-pill curr">START: {weight} KG</div>
                                        <div className="weight-pill target">GOAL: {targetWeight} KG</div>
                                    </div>
                                    <TitanWheel min={30} max={250} value={targetWeight} onChange={setTargetWeight} label="KG" />
                                    
                                    <div className="finalize-container" style={{ marginTop: '1rem'}}>
                                        <HoldToCommit onComplete={handleFinalize} text="INITIATE EVOLUTION" />
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BodyMetricsSetup;
