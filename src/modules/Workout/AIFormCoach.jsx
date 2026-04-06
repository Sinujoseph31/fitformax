import React, { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import { X, Volume2, VolumeX, Activity } from 'lucide-react';
import './AIFormCoach.css';

const AIFormCoach = ({ exercise, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [feedback, setFeedback] = useState('Position yourself in view');
  const [reps, setReps] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(true);
  
  // State for tracking exercise progress
  const stateRef = useRef({
    stage: 'up',
    counter: 0,
    lastFeedbackTime: 0
  });

  const speak = (text) => {
    if (!isAudioEnabled) return;
    const now = Date.now();
    if (now - stateRef.current.lastFeedbackTime < 2000) return; // Throttling speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
    stateRef.current.lastFeedbackTime = now;
  };

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const onResults = (results) => {
      if (!canvasRef.current || !videoRef.current) return;
      
      setIsModelLoading(false);
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw video frame to canvas
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.poseLandmarks) {
        // Draw the skeleton
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
        drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 1, radius: 3 });

        // Logic for form analysis
        analyzeForm(results.poseLandmarks);
      }
      canvasCtx.restore();
    };

    pose.onResults(onResults);

    let camera = null;
    if (videoRef.current) {
      camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => {
      if (camera) camera.stop();
      pose.close();
    };
  }, []);

  const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
  };

  const analyzeForm = (landmarks) => {
    const name = exercise.name.toLowerCase();
    
    if (name.includes('squat')) {
      handleSquat(landmarks);
    } else if (name.includes('push')) {
      handlePushup(landmarks);
    } else {
      setFeedback('Form analysis coming soon for this exercise!');
    }
  };

  const handleSquat = (landmarks) => {
    // 23: left_hip, 25: left_knee, 27: left_ankle
    const hip = landmarks[23];
    const knee = landmarks[25];
    const ankle = landmarks[27];

    if (!hip || !knee || !ankle) return;

    const angle = calculateAngle(hip, knee, ankle);

    // Rep counting and feedback
    if (angle > 160) {
      if (stateRef.current.stage === 'down') {
        stateRef.current.counter++;
        setReps(stateRef.current.counter);
        speak(`${stateRef.current.counter} reps`);
      }
      stateRef.current.stage = 'up';
      setFeedback('Lower your hips');
    }
    
    if (angle < 95) {
      if (stateRef.current.stage === 'up') {
        setFeedback('Great depth!');
      }
      stateRef.current.stage = 'down';
    }
  };

  const handlePushup = (landmarks) => {
    // 11: left_shoulder, 13: left_elbow, 15: left_wrist
    const shoulder = landmarks[11];
    const elbow = landmarks[13];
    const wrist = landmarks[15];

    if (!shoulder || !elbow || !wrist) return;

    const angle = calculateAngle(shoulder, elbow, wrist);

    if (angle > 160) {
      if (stateRef.current.stage === 'down') {
        stateRef.current.counter++;
        setReps(stateRef.current.counter);
        speak(`${stateRef.current.counter} reps`);
      }
      stateRef.current.stage = 'up';
      setFeedback('Go lower for full range');
    }

    if (angle < 90) {
      if (stateRef.current.stage === 'up') {
        setFeedback('Push back up!');
      }
      stateRef.current.stage = 'down';
    }
  };

  return (
    <div className="ai-coach-overlay">
      <div className="coach-container">
        <div className="coach-header">
          <div className="coach-title">
            <Activity className="pulse-icon" />
            <span>AI FORM COACH: {exercise.name}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="video-viewport">
          <video ref={videoRef} className="hidden-video" playsInline muted />
          <canvas ref={canvasRef} className="render-canvas" width="640" height="480" />
          
          {isModelLoading && (
            <div className="model-loader">
              <div className="spinner"></div>
              <span>Initializing Vision AI...</span>
            </div>
          )}

          <div className="hud-overlay">
            <div className="hud-stats">
              <div className="stat-box">
                <span className="stat-label">REPS</span>
                <span className="stat-value">{reps}</span>
              </div>
              <div className="stat-box feedback-glow">
                <span className="stat-label">LIVE FEEDBACK</span>
                <span className="stat-value feedback-text">{feedback}</span>
              </div>
            </div>
            
            <button 
              className="audio-toggle"
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            >
              {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>

        <div className="coach-instructions">
          <p>Place your camera so your <strong>full body</strong> is visible from the side.</p>
        </div>
      </div>
    </div>
  );
};

export default AIFormCoach;
