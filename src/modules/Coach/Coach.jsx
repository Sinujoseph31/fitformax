import React, { useState, useEffect, useRef } from 'react';
import './Coach.css';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';
import { apiCall } from '../../utils/api';

const STARTER_PROMPTS = [
  "How is my weight progress?",
  "Give me a diet tip for today",
  "Workout idea for muscle gain",
  "I'm feeling a bit lazy today"
];

export default function Coach() {
  const { userProfile } = useApp();
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi ${userProfile?.name || 'there'}! I'm your FitformaX AI Coach. Ready to crush your ${userProfile?.goal || 'fitness'} goals today?`, isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg = { id: Date.now(), text: messageText, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await apiCall('/ai/chat', 'POST', { message: messageText });
      const aiMsg = { id: Date.now() + 1, text: response.reply, isUser: false };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Coach Error:', error);
      const errorMsg = { id: Date.now() + 1, text: "Sorry, I'm having a bit of trouble connecting to the brain center. Try again in a moment!", isUser: false };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fx-coach-container fade-in">
      <Header title="AI Coach" showBack={false} />
      
      <div className="fx-coach-messages">
        {messages.map(m => (
          <div key={m.id} className={`fx-coach-bubble-wrapper ${m.isUser ? 'user' : 'ai'}`}>
            <div className="fx-coach-bubble">
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="fx-coach-bubble-wrapper ai">
            <div className="fx-coach-bubble typing">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length < 3 && !isTyping && (
        <div className="fx-coach-starters">
          {STARTER_PROMPTS.map((p, idx) => (
            <button key={idx} className="fx-starter-btn" onClick={() => handleSend(p)}>
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="fx-coach-input-area">
        <div className="fx-input-wrapper">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Talk to your coach..." 
            className="fx-coach-input"
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
          />
          <button 
            className={`fx-send-btn ${input.trim() ? 'active' : ''}`} 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
