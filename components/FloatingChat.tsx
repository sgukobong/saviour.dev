import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/gemini';
import { supabase } from '../services/supabase';
import { ChatMessage } from '../types';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi there. I have access to Saviour's database. Ask me about his projects, writing, or skills.", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contextData, setContextData] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Load RAG Context on mount
  useEffect(() => {
    const fetchContext = async () => {
      // Fetch Projects
      const { data: projects } = await supabase.from('projects').select('title, description, tags');
      // Fetch Posts (Native)
      const { data: posts } = await supabase.from('posts').select('title, excerpt');
      
      let contextString = "";
      
      if (projects) {
        contextString += "\n[PROJECTS]:\n" + projects.map(p => `- ${p.title}: ${p.description} (Tags: ${p.tags.join(', ')})`).join('\n');
      }
      
      if (posts) {
        contextString += "\n[BLOG POSTS]:\n" + posts.map(p => `- ${p.title}: ${p.excerpt}`).join('\n');
      }

      setContextData(contextString);
    };
    
    fetchContext();

    const initialX = window.innerWidth - 350; 
    const initialY = window.innerHeight - 550;
    setPosition({ x: Math.max(20, initialX), y: Math.max(20, initialY) });
  }, []);

  const toggleChat = () => {
      setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Pass contextData to Gemini
    const responseText = await chatWithGemini(messages, input, contextData);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chatWindowRef.current) return;
    setIsDragging(true);
    const rect = chatWindowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const hasBookingLink = (text: string) => text.includes('calendly.com/sgukobong');

  if (!isOpen) {
      return (
          <button 
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-neon-cyan text-black rounded-full shadow-[0_0_20px_rgba(0,234,255,0.4)] flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-300 animate-float"
            aria-label="Open AI Chat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </button>
      );
  }

  return (
    <div 
      ref={chatWindowRef}
      style={{ left: position.x, top: position.y }}
      className="fixed z-[60] w-[90vw] md:w-[380px] h-[500px] flex flex-col bg-cosmic-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in"
    >
      <div 
        onMouseDown={handleMouseDown}
        className="bg-cosmic-900/90 border-b border-white/5 p-3 flex justify-between items-center cursor-move select-none"
      >
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_#00d4ff]"></div>
            <span className="font-mono text-xs uppercase tracking-widest text-white">Smart Assistant (RAG Active)</span>
         </div>
         <button 
            onClick={toggleChat}
            className="text-slate-400 hover:text-white transition-colors p-1"
         >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>
         </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
         {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
               <div className={`max-w-[85%] p-3 text-sm rounded-2xl leading-relaxed ${
                   msg.role === 'user'
                   ? 'bg-neon-cyan/10 border border-neon-cyan/20 text-white rounded-tr-sm'
                   : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-sm'
               }`}>
                  {msg.text}
               </div>
               
               {msg.role === 'model' && hasBookingLink(msg.text) && (
                 <a 
                   href="https://calendly.com/sgukobong" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="mt-2 ml-1 inline-flex items-center gap-2 bg-neon-cyan text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-white transition-colors shadow-lg animate-fade-in"
                 >
                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   Book a Slot
                 </a>
               )}
            </div>
         ))}
         {isTyping && (
             <div className="flex justify-start">
                 <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-sm flex gap-1">
                     <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce delay-100"></span>
                     <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce delay-200"></span>
                 </div>
             </div>
         )}
         <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 bg-cosmic-900/50 border-t border-white/5">
          <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my work..."
                className="w-full bg-black/40 border border-white/10 rounded-full pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 focus:bg-black/60 transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-neon-cyan text-black rounded-full hover:bg-white transition-colors disabled:opacity-0 disabled:scale-0 transform duration-200"
              >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
          </div>
      </form>
    </div>
  );
};

export default FloatingChat;