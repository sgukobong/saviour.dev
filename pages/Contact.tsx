import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import SEO from '../components/SEO';
import { Calendar, MessageSquare, ArrowRight, Zap, Shield, Globe, Cpu } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase.from('messages').insert([form]);
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full pt-10 pb-32">
      <SEO 
        title="Technical Inquiry & Booking"
        description="Book a technical consultation or send a project inquiry to Saviour Ukobong regarding AI systems and Full-Stack applications."
      />
      
      {/* Header Section */}
      <div className="mb-24">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-6 block font-black">● Get in Touch</span>
        <h1 className="text-section-title leading-tight text-black">
          Let’s build <br/>something <span className="italic font-serif font-light text-slate-500">intelligent.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left: Technical Booking */}
        <div className="lg:col-span-6 space-y-12">
            <div className="bg-black text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                            <Cpu className="w-8 h-8 text-white" />
                        </div>
                        <span className="bg-white/10 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">30 Min Session</span>
                    </div>
                    
                    <h2 className="text-4xl font-black mb-6 tracking-tighter">AI & Systems Architecture</h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                        A focused 30-minute technical session to audit your AI implementation, refine your application logic, or architect intelligent systems using modern full-stack frameworks and IBM Watson.
                    </p>
                    
                    <div className="space-y-4 mb-12">
                        <div className="flex items-center gap-4 text-sm font-bold">
                            <Zap className="w-4 h-4 text-white" /> 
                            <span>AI & Logic Optimization</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold">
                            <Shield className="w-4 h-4 text-white" /> 
                            <span>Full Implementation Blueprint</span>
                        </div>
                    </div>

                    <a 
                        href="https://calendly.com/sgukobong" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all shadow-xl group/btn"
                    >
                        Book Technical Session 
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-8 rounded-[2.5rem] bg-slate-100 border border-black/5 flex flex-col justify-center">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 font-black">Direct Email</h4>
                    <a href="mailto:hello@saviour.dev" className="text-lg font-black text-black hover:underline underline-offset-4">hello@saviour.dev</a>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-slate-100 border border-black/5 flex flex-col justify-center">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 font-black">WhatsApp</h4>
                    <a href="https://wa.me/2348069107294" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-black hover:underline underline-offset-4">+234 806 910 7294</a>
                </div>
            </div>
        </div>

        {/* Right: Quick Inquiry Form */}
        <div className="lg:col-span-6">
            <div className="bg-white border-2 border-black/5 p-12 rounded-[3.5rem] shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                    <MessageSquare className="w-6 h-6 text-black" />
                    <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-black font-black">Project Scoping</h3>
                </div>

                {status === 'success' ? (
                    <div className="py-20 text-center animate-fade-in">
                        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                            <Shield className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black text-black mb-4">Inquiry Logged</h3>
                        <p className="text-slate-700 font-medium mb-10">Your requirements are currently being indexed. I'll get back to you within 24 hours.</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="text-[10px] font-black uppercase tracking-widest text-black underline underline-offset-8"
                        >
                            Submit Another Request
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-4 font-black">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-black/5 rounded-2xl px-8 py-5 text-black font-bold focus:border-black outline-none transition-all placeholder:text-slate-400"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-4 font-black">Work Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-black/5 rounded-2xl px-8 py-5 text-black font-bold focus:border-black outline-none transition-all placeholder:text-slate-400"
                                    placeholder="email@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-4 font-black">Technical Scope</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-black/5 rounded-3xl px-8 py-6 text-black font-bold focus:border-black outline-none transition-all placeholder:text-slate-400 resize-none"
                                    placeholder="Describe your stack or the AI problem you're looking to solve..."
                                />
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full h-20 bg-black text-white font-black rounded-2xl hover:scale-[1.01] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
                        >
                            {status === 'submitting' ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Send Technical Inquiry 
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
      </div>

      {/* Specialty Pillars Section */}
      <div className="mt-40 pt-24 border-t-2 border-black/5 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
         <div>
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-6 h-6 text-black" />
            </div>
            <h4 className="text-xl font-black mb-3">AI Integration</h4>
            <p className="text-slate-600 font-medium">Expertise in IBM Watson services for cognitive analysis, chatbots, and NLU pipelines.</p>
         </div>
         <div>
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6 text-black" />
            </div>
            <h4 className="text-xl font-black mb-3">Modern Stack</h4>
            <p className="text-slate-600 font-medium">Building responsive, high-performance applications with React, Node.js, and Java.</p>
         </div>
         <div>
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-6 h-6 text-black" />
            </div>
            <h4 className="text-xl font-black mb-3">System Design</h4>
            <p className="text-slate-600 font-medium">Architecting reliable backend logic and microservices that prioritize data integrity and scale.</p>
         </div>
      </div>
    </div>
  );
};

export default Contact;