import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { chatWithGemini } from '../services/gemini';
import { supabase } from '../services/supabase';
import { ChatMessage } from '../types';

// Extend window for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const FloatingChat: React.FC = () => {
  const navigate = useNavigate();
  
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: "Hi there. I’m here if you want to explore Saviour’s work — his apps, his ideas, or his writing. You can type or speak to me.", 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contextData, setContextData] = useState('');

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false); // If true, AI reads responses
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // 1. Initialize RAG Context & Speech Recognition
  useEffect(() => {
    const fetchContext = async () => {
      const { data: projects } = await supabase.from('projects').select('title, description, tags');
      const { data: posts } = await supabase.from('posts').select('title, excerpt');
      
      let contextString = "";
      if (projects) {
        contextString += "\n[PROJECTS]:\n" + projects.map((p: any) => `- ${p.title}: ${p.description} (Tech: ${p.tags.join(', ')})`).join('\n');
      }
      if (posts) {
        contextString += "\n[WRITING]:\n" + posts.map((p: any) => `- ${p.title}: ${p.excerpt}`).join('\n');
      }
      setContextData(contextString);
    };
    
    fetchContext();

    const initialX = window.innerWidth - 350; 
    const initialY = window.innerHeight - 600;
    setPosition({ x: Math.max(20, initialX), y: Math.max(20, initialY) });

    // Setup Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsListening(true);
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Auto-submit on voice input
        handleSubmit(null, transcript); 
      };

      recognitionRef.current.onend = () => setIsListening(false);
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }

    // Load voices
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };
    loadVoices();
    // Chrome requires this event, others load immediately
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
        window.speechSynthesis.cancel();
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      // Stop speaking if listening starts
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      // Auto-enable voice mode if user uses voice input
      setVoiceMode(true); 
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error("Mic start error", e);
      }
    }
  };

  const speakResponse = (text: string) => {
    if (!voiceMode) return;

    window.speechSynthesis.cancel();
    
    // Better Markdown cleaning for speech
    const cleanText = text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links: [Text](url) -> Text
        .replace(/[*_#`]/g, '') // Formatting chars
        .replace(/\n+/g, '. '); // Newlines to pauses

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Warm and Confident Settings
    // Rate: 0.95 (Slightly measured/confident)
    // Pitch: 0.9 (Slightly deeper/warmer)
    utterance.rate = 0.95; 
    utterance.pitch = 0.9; 
    
    const preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
                          voices.find(v => v.name.includes('Microsoft Mark')) || 
                          voices.find(v => v.name.includes('Samantha')) ||
                          voices.find(v => v.lang.startsWith('en'));
                          
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const logMessageToSupabase = async (role: 'user' | 'model', text: string) => {
    try {
      await supabase.from('chat_messages').insert([
        { role, text, timestamp: new Date().toISOString() }
      ]);
    } catch (err) {
      // Silent fail for logs
    }
  };

  const handleSubmit = async (e: React.FormEvent | null, manualInput?: string) => {
    if (e) e.preventDefault();
    const textToSend = manualInput || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    logMessageToSupabase('user', textToSend);

    // Call Gemini
    const responseText = await chatWithGemini(messages, textToSend, contextData);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);

    logMessageToSupabase('model', responseText);
    speakResponse(responseText);
  };

  // Dragging Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chatWindowRef.current) return;
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'A' || target.closest('button')) return;
    
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
      className="fixed z-[60] w-[90vw] md:w-[380px] h-[550px] flex flex-col bg-cosmic-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in"
    >
      <div 
        onMouseDown={handleMouseDown}
        className="bg-cosmic-900/90 border-b border-white/5 p-4 flex justify-between items-center cursor-move select-none"
      >
         <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px] transition-all duration-500 ${isSpeaking ? 'bg-neon-ember shadow-neon-ember animate-pulse' : 'bg-neon-cyan shadow-neon-cyan'}`}></div>
            <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-white">Assistant</span>
                {isSpeaking && <span className="text-[10px] text-neon-ember animate-pulse">Speaking...</span>}
            </div>
         </div>
         <div className="flex items-center gap-2">
             <button 
                onClick={() => {
                  setVoiceMode(!voiceMode);
                  if (voiceMode) window.speechSynthesis.cancel();
                }}
                className={`p-2 rounded-full transition-colors ${voiceMode ? 'text-neon-cyan bg-neon-cyan/10' : 'text-slate-500 hover:text-white'}`}
                title={voiceMode ? "Mute Voice Response" : "Enable Voice Response"}
             >
                {voiceMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                )}
             </button>
             <button 
                onClick={toggleChat}
                className="text-slate-400 hover:text-white transition-colors p-2"
                aria-label="Close Chat"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
         {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
               <div className={`max-w-[85%] p-3 text-sm rounded-2xl leading-relaxed ${
                   msg.role === 'user'
                   ? 'bg-neon-cyan/10 border border-neon-cyan/20 text-white rounded-tr-sm'
                   : `bg-white/5 border border-white/5 text-slate-300 rounded-tl-sm ${isSpeaking && idx === messages.length - 1 ? 'border-neon-ember/30 shadow-[0_0_15px_rgba(255,107,61,0.1)]' : ''}`
               }`}>
                  <Markdown
                    components={{
                        a: ({ node, ...props }) => {
                            const isInternal = props.href?.startsWith('/');
                            return (
                                <a
                                    {...props}
                                    className="text-neon-cyan underline hover:text-white transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        if (isInternal && props.href) {
                                            e.preventDefault();
                                            navigate(props.href);
                                        }
                                    }}
                                    target={!isInternal ? "_blank" : undefined}
                                    rel={!isInternal ? "noopener noreferrer" : undefined}
                                />
                            );
                        },
                        p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0 inline-block" />
                    }}
                  >
                    {msg.text}
                  </Markdown>
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

      <div className="p-3 bg-cosmic-900/50 border-t border-white/5">
        <form onSubmit={handleSubmit} className="relative flex gap-2 items-center">
            {/* Mic Button */}
            <button 
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-full transition-all duration-300 ${
                    isListening 
                    ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse' 
                    : 'bg-white/10 text-slate-400 hover:bg-neon-cyan/20 hover:text-neon-cyan'
                }`}
                title="Speak"
            >
                {isListening ? (
                     <div className="flex gap-0.5 items-center justify-center w-5 h-5">
                        <span className="w-1 h-3 bg-white rounded-full animate-[bounce_1s_infinite]"></span>
                        <span className="w-1 h-5 bg-white rounded-full animate-[bounce_1.2s_infinite]"></span>
                        <span className="w-1 h-3 bg-white rounded-full animate-[bounce_1s_infinite]"></span>
                     </div>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                )}
            </button>

            <div className="relative flex-grow">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Ask me anything..."}
                    className="w-full bg-black/40 border border-white/10 rounded-full pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan/50 focus:bg-black/60 transition-all placeholder:text-slate-600"
                />
                <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-neon-cyan text-black rounded-full hover:bg-white transition-colors disabled:opacity-0 disabled:scale-0 transform duration-200"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default FloatingChat;