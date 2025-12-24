import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import SEO from '../components/SEO';

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
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-12">
      <SEO 
        title="Contact & Consultation"
        description="Book a consultation with Saviour Ukobong for AI development, EdTech strategy, and offline-first engineering projects."
        keywords={['Contact Developer', 'Hire AI Engineer', 'EdTech Consultation', 'Software Consultant Nigeria']}
      />
      
      {/* Contact Form Section */}
      <div className="relative w-full max-w-xl">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-neon-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative bg-cosmic-900/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <h2 className="text-3xl font-bold text-white mb-2">Let's Connect</h2>
          <p className="text-slate-400 mb-8">Have a project in mind or just want to say hi? I'd love to hear from you.</p>

          {status === 'success' ? (
            <div className="bg-neon-cyan/10 border border-neon-cyan/20 p-8 rounded-2xl text-center">
              <h3 className="text-xl font-medium text-neon-cyan mb-2">Message Received</h3>
              <p className="text-slate-300">Thanks for reaching out! I'll get back to you shortly.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-white underline hover:text-neon-cyan">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">How can I help?</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none resize-none"
                  placeholder="Tell me a bit about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-neon-cyan text-black font-bold py-4 rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)] disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Direct Contact Info */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
         <div className="bg-cosmic-900/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4">Direct Contact</h3>
              <div className="flex flex-col gap-3">
                <a href="mailto:sgukobong@gmail.com" className="text-lg font-medium text-white hover:text-neon-cyan transition-colors flex items-center gap-3 justify-center md:justify-start group">
                    <span className="p-2 rounded-full bg-white/5 group-hover:bg-neon-cyan/10 transition-colors">
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </span>
                    sgukobong@gmail.com
                </a>
                <a href="https://calendly.com/sgukobong" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-neon-cyan transition-colors flex items-center gap-3 justify-center md:justify-start group">
                    <span className="p-2 rounded-full bg-white/5 group-hover:bg-neon-cyan/10 transition-colors">
                       <svg className="w-4 h-4 text-slate-400 group-hover:text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </span>
                    Schedule a Call
                </a>
                <a href="https://wa.me/08069107294" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-[#25D366] transition-colors flex items-center gap-3 justify-center md:justify-start group">
                    <span className="p-2 rounded-full bg-white/5 group-hover:bg-[#25D366]/10 transition-colors">
                       <svg className="w-4 h-4 text-slate-400 group-hover:text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                       </svg>
                    </span>
                    Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4">Connect Online</h3>
                <div className="flex gap-4 justify-center md:justify-start">
                    <a href="https://www.linkedin.com/in/sgukobong/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] text-slate-400 transition-all hover:scale-110">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                    </a>
                    <a href="https://github.com/sgukobong" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 transition-all hover:scale-110">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    </a>
                    <a href="https://x.com/sgukobong" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 transition-all hover:scale-110">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a href="https://www.youtube.com/@sgukobong" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-[#FF0000]/20 hover:text-[#FF0000] text-slate-400 transition-all hover:scale-110">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
                    </a>
                </div>
            </div>
         </div>

         <div className="bg-cosmic-900/50 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 justify-center">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-2">What I Help You Build</h3>
            <ul className="text-base text-slate-300 space-y-4">
               <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_#00eaff]"></span> 
                  Engaging learning experiences
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_#00eaff]"></span> 
                  Practical EdTech strategy for real-world schools & orgs
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_#00eaff]"></span> 
                  LMS setups that simply work (Moodle / OpenEDX)
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_#00eaff]"></span> 
                  AI tutors, training tools & chat assistants
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_#00eaff]"></span> 
                  Smart AI-powered apps
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_#00eaff]"></span> 
                  Fast, reliable web & mobile apps
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_#00eaff]"></span> 
                  Talks & hands-on workshops
               </li>
               <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_#00eaff]"></span> 
                  Tailored solutions for unique problems
               </li>
            </ul>
         </div>
      </div>
    </div>
  );
};

export default Contact;