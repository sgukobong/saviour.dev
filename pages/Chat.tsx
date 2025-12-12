import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/gemini';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi there. Ask me anything about Saviour’s work, or I can help you book a time to speak with him.", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await chatWithGemini(messages, input);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const hasBookingLink = (text: string) => text.includes('calendly.com/sgukobong');

  return (
    <div className="max-w-2xl mx-auto h-[70vh] flex flex-col relative">
      <div className="absolute inset-0 bg-neon-cyan/5 blur-[100px] -z-10 rounded-full"></div>
      
      <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div 
              className={`max-w-[85%] p-6 rounded-3xl text-[16px] leading-relaxed backdrop-blur-md border ${
                msg.role === 'user' 
                  ? 'bg-neon-cyan/10 border-neon-cyan/20 text-white rounded-tr-sm' 
                  : 'bg-cosmic-800/80 border-white/5 text-slate-300 rounded-tl-sm shadow-lg'
              }`}
            >
              {msg.text}
            </div>

            {msg.role === 'model' && hasBookingLink(msg.text) && (
               <a 
                 href="https://calendly.com/sgukobong" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mt-4 ml-2 inline-flex items-center gap-3 bg-neon-cyan text-black px-6 py-3 rounded-2xl text-sm font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(0,234,255,0.2)] hover:scale-105"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 Book a Consultation
               </a>
             )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-cosmic-800/80 border border-white/5 p-4 rounded-3xl rounded-tl-sm flex gap-2 items-center">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Query the system..."
          className="w-full bg-cosmic-900/50 border border-white/10 rounded-full px-8 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        />
        <button 
          type="submit"
          disabled={isTyping || !input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-neon-cyan text-black rounded-full flex items-center justify-center hover:bg-white transition-colors disabled:opacity-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;