import React, { useState } from 'react';
import './AIAssistant.css';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function AIAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi Alex! I'm your FitformaX AI. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input, isUser: true };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, text: "Based on your fat loss goal, I recommend sticking to the 1200 kcal deficit today and ensuring you hit your protein targets.", isUser: false }]);
    }, 1000);
  };

  return (
    <div className="fx-ai-chat">
      <Header 
        title="AI Assistant" 
        rightElement={<Button variant="text" onClick={onClose}>Close</Button>}
      />
      <div className="fx-chat-messages">
        {messages.map(m => (
          <div key={m.id} className={`fx-chat-bubble ${m.isUser ? 'user' : 'ai'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="fx-chat-input-area">
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Ask a fitness question..." 
          className="fx-chat-input"
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
