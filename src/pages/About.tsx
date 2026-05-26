import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-ghost-white min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-caption font-bold uppercase tracking-[0.2em] text-future-blue mb-10 block">
            Philosophy & Systems Thinking
          </span>
          <h1 className="text-display font-w350 mb-11 text-midnight-ink leading-tight">
            Engineering as an Architectural Rigor.
          </h1>
          
          <div className="space-y-11 text-slate-comment font-regular text-heading-lg leading-relaxed">
            <p>
              I view software not just as a set of features, but as an interconnected ecosystem of intelligent agents and robust data structures. My approach is rooted in <span className="text-midnight-ink">architectural minimalism</span>—stripping away the unnecessary to reveal the essential.
            </p>
            <p>
              As an AI Product Engineer, I specialize in bridging the gap between advanced machine learning capabilities and intuitive user experiences. I don't just build applications; I design <span className="text-midnight-ink">intelligent systems</span> that evolve with their users.
            </p>
            <p>
              My philosophy is simple: <span className="text-future-blue italic">Complexity is the enemy of reliability.</span> By adhering to strict design tokens and well-defined system objectives, I ensure that every product I lead is both technically superior and aesthetically precise.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Layering with Canvas background */}
      <section className="bg-canvas py-144 px-4 md:px-12 border-y border-midnight-ink/5 mt-94">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-22">
          <div>
            <h2 className="text-heading-lg font-w350 mb-14 text-midnight-ink uppercase tracking-widest">Core Principles</h2>
            <ul className="space-y-11">
              {[
                { title: 'Human-Centric AI', desc: 'Designing AI that augments human capability rather than replacing it.' },
                { title: 'Systemic Integrity', desc: 'Ensuring every component is modular, testable, and purpose-driven.' },
                { title: 'Aesthetic Precision', desc: 'UI as a direct reflection of underlying technical excellence.' }
              ].map((p, i) => (
                <li key={i} className="flex gap-6">
                  <span className="text-future-blue font-w350 text-caption">0{i+1}.</span>
                  <div>
                    <h4 className="text-caption font-bold text-midnight-ink mb-2 uppercase tracking-widest">{p.title}</h4>
                    <p className="text-caption text-slate-comment leading-relaxed max-w-sm">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-11 rounded-lg border border-midnight-ink/5 shadow-sm self-start">
             <h2 className="text-heading-lg font-w350 mb-10 text-midnight-ink uppercase tracking-widest">The Vision</h2>
             <p className="text-caption text-slate-comment leading-relaxed">
               I am building the next generation of SaaS and intelligent systems—platforms that are not only functional but also possess a sense of 'future-forward serenity'. My work is a continuous exploration of how technology can be more human, more intelligent, and more architectural.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
