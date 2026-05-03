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

    const initialX = window.innerWidth - 440; 
    const initialY = window.innerHeight - 660;
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
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
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
    
    const cleanText = text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') 
        .replace(/[*_#`]/g, '') 
        .replace(/\n+/g, '. '); 

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0; 
    utterance.pitch = 1.0; 
    
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
    } catch (err) {}
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

    const responseText = await chatWithGemini(messages, textToSend, contextData);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);

    logMessageToSupabase('model', responseText);
    speakResponse(responseText);
  };

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

    const handleMouseUp = () => setIsDragging(false);

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
            className="fixed bottom-10 right-10 z-[60] w-16 h-16 bg-brand-indigo text-white rounded-full shadow-2xl shadow-brand-indigo/30 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
            aria-label="Open AI Chat"
          >
            <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </button>
      );
  }

  return (
    <div 
      ref={chatWindowRef}
      style={{ left: position.x, top: position.y }}
      className="fixed z-[60] w-[90vw] md:w-[400px] h-[600px] flex flex-col bg-white border border-brand-indigo/10 rounded-3xl shadow-[0_20px_60px_rgba(79,70,229,0.15)] overflow-hidden animate-fade-in"
    >
      <div 
        onMouseDown={handleMouseDown}
        className="bg-brand-indigo p-5 flex justify-between items-center cursor-move select-none"
      >
         <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isSpeaking ? 'bg-white animate-pulse shadow-[0_0_8px_white]' : 'bg-white'}`}></div>
            <div className="flex flex-col">
                <span className="font-bold text-xs uppercase tracking-widest text-white">Studio Assistant</span>
                {isSpeaking && <span className="text-[10px] text-white/70 font-black animate-pulse uppercase tracking-wider">Speaking</span>}
            </div>
         </div>
         <div className="flex items-center gap-2">
             <button 
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors p-2"
                aria-label="Close Chat"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-cosmic-950">
         {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
               <div className={`max-w-[85%] p-4 text-sm font-semibold rounded-2xl leading-relaxed ${
                   msg.role === 'user'
                   ? 'bg-brand-indigo text-white rounded-tr-sm shadow-md'
                   : 'bg-white text-slate-800 border border-brand-indigo/10 rounded-tl-sm shadow-sm'
               }`}>
                  <Markdown
                    components={{
                        a: ({ node, ...props }) => {
                            const isInternal = props.href?.startsWith('/');
                            return (
                                <a
                                    {...props}
                                    className="text-brand-indigo underline font-black hover:text-brand-violet transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        if (isInternal && props.href) {
                                            e.preventDefault();
                                            navigate(props.href);
                                        }
                                    }}
                                />
                            );
                        },
                        p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />
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
                   className="mt-3 inline-flex items-center gap-2 bg-brand-indigo text-white px-5 py-2.5 rounded-full text-xs font-black hover:bg-brand-violet transition-colors shadow-lg"
                 >
                   Book a Slot ↗
                 </a>
               )}
            </div>
         ))}
         {isTyping && (
             <div className="flex justify-start">
                 <div className="bg-white border border-brand-indigo/10 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 shadow-sm">
                     <span className="w-2 h-2 bg-brand-indigo rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-brand-violet rounded-full animate-bounce delay-100"></span>
                     <span className="w-2 h-2 bg-brand-emerald rounded-full animate-bounce delay-200"></span>
                 </div>
             </div>
         )}
         <div ref={messagesEndRef} />
      </div>

      <div className="p-5 bg-white border-t border-brand-indigo/10">
        <form onSubmit={handleSubmit} className="relative flex gap-3 items-center">
            <button 
                type="button"
                aria-label="Toggle voice input"
                aria-pressed={isListening}
                onClick={toggleListening}
                className={`p-3.5 rounded-full transition-all duration-300 ${
                    isListening 
                    ? 'bg-brand-rose text-white animate-pulse shadow-lg shadow-brand-rose/20' 
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-brand-indigo hover:text-brand-indigo'
                }`}
            >
                {isListening ? (
                     <div className="flex gap-1 items-center justify-center w-5 h-5">
                        <span className="w-1.5 h-3 bg-white rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-5 bg-white rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-3 bg-white rounded-full animate-bounce delay-150"></span>
                     </div>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                )}
            </button>

            <div className="relative flex-grow">
                <input 
                    type="text" id="chat-message-input" aria-label="Type your message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Type your message..."}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-full pl-5 pr-14 py-3.5 text-sm text-black font-bold focus:outline-none focus:border-brand-indigo focus:bg-white transition-all placeholder:text-slate-400"
                />
                <button 
                    type="submit" aria-label="Send message"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-brand-indigo text-white rounded-full hover:bg-brand-violet transition-colors disabled:opacity-0 shadow-md"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default FloatingChat;