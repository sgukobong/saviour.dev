import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-ghost-white min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        {/* Adjusted Grid: Better balance and vertical alignment for "beautiful fit" */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-11 md:gap-22 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="text-caption font-bold uppercase tracking-[0.2em] text-future-blue mb-6 md:mb-10 block">
              Professional Summary
            </span>
            <h1 className="text-[22px] md:text-display font-w350 mb-8 md:mb-11 text-midnight-ink leading-tight">
              AI Product Engineer specializing in building intelligent SaaS products and automated workflows.
            </h1>
            
            <div className="space-y-6 md:space-y-11 text-slate-comment font-regular text-[16px] md:text-heading-lg leading-relaxed max-w-xl">
              <p>
                I specialize in building production-ready applications using <span className="text-midnight-ink font-bold">React, TypeScript, and Firebase</span>, with a deep focus on integrating modern AI APIs like <span className="text-midnight-ink font-bold">Gemini, OpenAI, and Claude</span>. My goal is to architect systems that don't just use AI, but are fundamentally improved by it.
              </p>
              <p>
                With a background in both educational technology and computational systems, I bring a unique perspective to product engineering. I focus on creating <span className="text-future-blue italic">user-centric solutions</span> that solve real operational challenges, particularly in mobile-first and emerging-market environments.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2 mb-11 lg:mb-0"
          >
            {/* Image Container: "Beautifully Fitted" with fixed max-width and precise aspect ratio */}
            <div className="relative w-full max-w-[320px] md:max-w-[400px]">
              <div className="aspect-[3/4] md:aspect-square bg-canvas rounded-lg overflow-hidden border border-midnight-ink/5 shadow-[0_10px_40px_rgba(15,16,18,0.03)]">
                <img 
                  src="/about-image.png" 
                  alt="Saviour Ukobong" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                />
              </div>
              {/* Refined Architectural Accents */}
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-14 md:w-22 h-px bg-future-blue/40 hidden md:block"></div>
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 h-14 md:h-22 w-px bg-future-blue/40 hidden md:block"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience & Education Grid - Responsive Audit */}
      <section className="bg-canvas py-94 md:py-144 px-4 md:px-12 border-y border-midnight-ink/5 mt-94">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-22">
          <div>
            <h2 className="text-[16px] md:text-heading-lg font-w350 mb-10 md:mb-14 text-midnight-ink uppercase tracking-widest">Education</h2>
            <div className="space-y-8 md:space-y-11">
              <div className="flex gap-4 md:gap-6">
                <span className="text-future-blue font-w350 text-[10px] md:text-caption whitespace-nowrap">2018—2022</span>
                <div>
                  <h4 className="text-caption font-bold text-midnight-ink mb-1 uppercase tracking-widest leading-tight">M.Ed – Educational Technology</h4>
                  <p className="text-caption text-slate-comment leading-relaxed">National Open University of Nigeria</p>
                  <p className="text-[10px] text-slate-comment italic">Digital learning systems & instructional technology.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6">
                <span className="text-future-blue font-w350 text-[10px] md:text-caption whitespace-nowrap">2011—2016</span>
                <div>
                  <h4 className="text-caption font-bold text-midnight-ink mb-1 uppercase tracking-widest leading-tight">B.Sc (Ed) – Statistics / Computer Science</h4>
                  <p className="text-caption text-slate-comment leading-relaxed text-balance">Computational systems & analytical problem-solving.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 md:p-11 rounded-lg border border-midnight-ink/5 shadow-sm self-start mt-11 md:mt-0">
             <h2 className="text-[16px] md:text-heading-lg font-w350 mb-8 md:mb-10 text-midnight-ink uppercase tracking-widest">Certifications</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">IBM AI Developer</div>
                <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">Google Project Mgmt</div>
                <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">IBM Software Dev</div>
                <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">Software Dev (3MTT)</div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-94 px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <h2 className="text-[16px] md:text-heading-lg font-w350 mb-10 md:mb-14 text-midnight-ink uppercase tracking-widest">How I Build</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-11">
          {[
            { title: 'Product Thinking', desc: 'Focusing on the end-user journey and business value before writing a single line of code.' },
            { title: 'Rapid Iteration', desc: 'Moving quickly from prototype to production with a focus on feedback and refinement.' },
            { title: 'Technical Rigor', desc: 'Ensuring every system is architected for scale, reliability, and maintainability.' }
          ].map((s, i) => (
            <div key={i} className="p-8 border border-midnight-ink/5 bg-white transition-all duration-300 hover:border-future-blue/20">
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
