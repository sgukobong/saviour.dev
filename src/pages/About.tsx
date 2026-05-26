import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-ghost-white min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-22 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-caption font-bold uppercase tracking-[0.2em] text-future-blue mb-10 block">
              Professional Summary
            </span>
            <h1 className="text-display font-w350 mb-11 text-midnight-ink leading-tight">
              AI Product Engineer specializing in building intelligent SaaS products and automated workflows.
            </h1>
            
            <div className="space-y-11 text-slate-comment font-regular text-heading-lg leading-relaxed max-w-3xl">
              <p>
                I specialize in building production-ready applications using <span className="text-midnight-ink">React, TypeScript, and Firebase</span>, with a deep focus on integrating modern AI APIs like <span className="text-midnight-ink">Gemini, OpenAI, and Claude</span>. My goal is to architect systems that don't just use AI, but are fundamentally improved by it.
              </p>
              <p>
                With a background in both educational technology and computational systems, I bring a unique perspective to product engineering. I focus on creating <span className="text-future-blue italic">user-centric solutions</span> that solve real operational challenges, particularly in mobile-first and emerging-market environments.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-canvas rounded-lg overflow-hidden border border-midnight-ink/5">
              <img 
                src="/about-image.png" 
                alt="Saviour Ukobong" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-34 h-px bg-future-blue/30 hidden md:block"></div>
            <div className="absolute -bottom-6 -right-6 h-34 w-px bg-future-blue/30 hidden md:block"></div>
          </motion.div>
        </div>
      </section>

      {/* Experience & Education Grid */}
      <section className="bg-canvas py-144 px-4 md:px-12 border-y border-midnight-ink/5 mt-94">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-22">
          <div>
            <h2 className="text-heading-lg font-w350 mb-14 text-midnight-ink uppercase tracking-widest">Education</h2>
            <div className="space-y-11">
              <div className="flex gap-6">
                <span className="text-future-blue font-w350 text-caption">2018—2022</span>
                <div>
                  <h4 className="text-caption font-bold text-midnight-ink mb-1 uppercase tracking-widest">M.Ed – Educational Technology</h4>
                  <p className="text-caption text-slate-comment leading-relaxed">National Open University of Nigeria</p>
                  <p className="text-[10px] text-slate-comment italic">Digital learning systems & instructional technology.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="text-future-blue font-w350 text-caption">2011—2016</span>
                <div>
                  <h4 className="text-caption font-bold text-midnight-ink mb-1 uppercase tracking-widest">B.Sc (Ed) – Statistics / Computer Science</h4>
                  <p className="text-caption text-slate-comment leading-relaxed">Computational systems & analytical problem-solving.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-11 rounded-lg border border-midnight-ink/5 shadow-sm self-start">
             <h2 className="text-heading-lg font-w350 mb-10 text-midnight-ink uppercase tracking-widest text-center md:text-left">Certifications</h2>
             <div className="grid grid-cols-2 gap-6">
                <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">IBM AI Developer</div>
                <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">Google Project Management</div>
                <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">IBM Software Developer</div>
                <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">Software Developer (3MTT)</div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-94 px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <h2 className="text-heading-lg font-w350 mb-14 text-midnight-ink uppercase tracking-widest">How I Build</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-11">
          {[
            { title: 'Product Thinking', desc: 'Focusing on the end-user journey and business value before writing a single line of code.' },
            { title: 'Rapid Iteration', desc: 'Moving quickly from prototype to production with a focus on feedback and refinement.' },
            { title: 'Technical Rigor', desc: 'Ensuring every system is architected for scale, reliability, and maintainability.' }
          ].map((s, i) => (
            <div key={i} className="p-8 border border-midnight-ink/5 bg-white">
              <h4 className="text-caption font-bold text-midnight-ink mb-4 uppercase tracking-widest">{s.title}</h4>
              <p className="text-caption text-slate-comment leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
