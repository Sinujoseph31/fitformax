import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User as UserIcon, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiCall } from '../../utils/api';
import './Coach.css';

const STARTER_PROMPTS = [
  "How is my weight progress?",
  "Analyze my current diet",
  "Workout for muscle gain",
  "I'm feeling a bit lazy today"
];

export default function Coach() {
  const { userProfile } = useApp();
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi ${userProfile?.name?.split(' ')[0] || 'there'}! I'm your FitformaX AI Coach. Ready to crush your ${userProfile?.goal || 'fitness'} goals today?`, isUser: false }
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
    if (!messageText.trim() || isTyping) return;

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
      const errorMsg = { 
        id: Date.now() + 1, 
        text: `Coach Error: ${error.message || "I'm having trouble connecting to my brain center."}`, 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="coach-wrapper fade-in">
      <header className="coach-header">
        <div className="coach-identity">
          <div className="coach-avatar">
            <Sparkles size={18} fill="currentColor" />
          </div>
          <div className="coach-status">
            <h3>AI Fitness Coach</h3>
            <span className="status-indicator">
              <span className="status-dot"></span> Online
            </span>
          </div>
        </div>
      </header>

      <div className="chat-viewport">
        <div className="messages-list">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div 
                key={m.id} 
                className={`bubble-row ${m.isUser ? 'user-row' : 'ai-row'}`}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {!m.isUser && (
                  <div className="bubble-avatar ai-avatar">
                    <Sparkles size={14} />
                  </div>
                )}
                <div className={`message-bubble ${m.isUser ? 'user-bubble' : 'ai-bubble glass'}`}>
                  {m.text}
                </div>
                {m.isUser && (
                  <div className="bubble-avatar user-avatar">
                    <UserIcon size={14} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
              className="bubble-row ai-row"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bubble-avatar ai-avatar">
                <Sparkles size={14} />
              </div>
              <div className="message-bubble ai-bubble glass typing-bubble">
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="coach-controls">
        <AnimatePresence>
          {messages.length < 5 && !isTyping && !input && (
            <motion.div 
              className="quick-prompts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {STARTER_PROMPTS.map((p, idx) => (
                <button key={idx} className="prompt-pill glass" onClick={() => handleSend(p)}>
                  {p} <ArrowRight size={14} />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="input-container glass">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Type your fitness question..." 
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
          />
          <button 
            className={`send-button ${input.trim() ? 'active' : ''}`} 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
