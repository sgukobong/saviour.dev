import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:hello@saviour.dev?subject=System Audit Request from ${formState.name}&body=${formState.message}`;
  };

  return (
    <div className="flex flex-col w-full bg-ghost-white min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-144"
        >
          <span className="text-caption font-bold uppercase tracking-[0.2em] text-future-blue mb-6 block">
            Initiate Contact
          </span>
          <h1 className="text-display font-w350 text-midnight-ink">
            Request System Audit or Collaboration.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-22">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-heading-lg font-w350 text-slate-comment mb-22 leading-relaxed">
              For high-stakes AI system design, architectural consulting, or premium product engineering, reach out through any of the following channels.
            </p>
            
            <div className="flex flex-col gap-10">
              {[
                { icon: Mail, label: 'Email', value: 'hello@saviour.dev', href: 'mailto:hello@saviour.dev' },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Instant encrypted comms', href: 'https://wa.me/your-whatsapp' },
                { icon: Linkedin, label: 'LinkedIn', value: 'Professional trajectory', href: 'https://linkedin.com/in/sgukobong' }
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-6 group text-midnight-ink hover:text-future-blue transition-all duration-300">
                  <div className="p-4 bg-white border border-midnight-ink/5 rounded-full group-hover:border-future-blue group-hover:shadow-sm transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-caption font-bold block uppercase tracking-widest">{item.label}</span>
                    <span className="text-caption text-slate-comment group-hover:text-midnight-ink transition-colors">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="bg-white border border-midnight-ink/5 p-11 rounded-lg space-y-10 shadow-sm"
          >
            <div className="flex flex-col gap-4">
              <label className="text-caption font-bold uppercase tracking-widest text-midnight-ink">Full Name</label>
              <input 
                type="text" 
                required
                className="bg-ghost-white border-none p-6 text-caption outline-none focus:ring-1 focus:ring-future-blue transition-all duration-300"
                placeholder="Ex. Jane Doe"
                onChange={(e) => setFormState({...formState, name: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-caption font-bold uppercase tracking-widest text-midnight-ink">Corporate Email</label>
              <input 
                type="email" 
                required
                className="bg-ghost-white border-none p-6 text-caption outline-none focus:ring-1 focus:ring-future-blue transition-all duration-300"
                placeholder="jane@company.com"
                onChange={(e) => setFormState({...formState, email: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-caption font-bold uppercase tracking-widest text-midnight-ink">System Brief</label>
              <textarea 
                required
                rows={4}
                className="bg-ghost-white border-none p-6 text-caption outline-none focus:ring-1 focus:ring-future-blue transition-all duration-300 resize-none"
                placeholder="Briefly describe the system or collaboration scope..."
                onChange={(e) => setFormState({...formState, message: e.target.value})}
              />
            </div>
            <button type="submit" className="w-full btn-pill bg-midnight-ink text-white hover:bg-future-blue flex items-center justify-center gap-6 py-6 transition-all">
              Initiate Transmission <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
