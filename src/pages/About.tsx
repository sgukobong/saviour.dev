import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Layers3, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      title: 'AI-native delivery',
      desc: 'I build products where AI is embedded in the core workflow, not bolted onto the edges.',
      icon: Cpu,
      accent: 'text-future-blue',
    },
    {
      title: 'Systems thinking',
      desc: 'I move between product logic, frontend UX, backend structure, and operational constraints without losing the thread.',
      icon: Layers3,
      accent: 'text-signal-green',
    },
    {
      title: 'Trust-first execution',
      desc: 'The work has to be reliable, legible, and maintainable for teams that depend on it.',
      icon: ShieldCheck,
      accent: 'text-signal-amber',
    },
  ];

  const buildPrinciples = [
    'Start with the real problem and the real user journey.',
    'Keep the interface calm enough to scan and strong enough to trust.',
    'Ship in small, testable increments with a clear next step.',
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-22 items-start mb-144"
        >
          <div>
            <span className="section-kicker mb-6 block">About</span>
            <h1 className="text-display font-w350 text-midnight-ink leading-tight max-w-2xl">
              AI product engineering, structured around clarity, reliability, and delivery.
            </h1>
            <p className="text-heading-lg font-w350 text-slate-comment mt-8 leading-relaxed max-w-2xl">
              I specialize in production-ready software, automated workflows, and AI-assisted products that are useful in the real world, especially where operational constraints matter.
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              <span className="tag-pill bg-soft-lavender text-future-blue border border-transparent">React / TypeScript</span>
              <span className="tag-pill bg-soft-mint text-signal-green border border-transparent">Firebase / Cloud</span>
              <span className="tag-pill bg-soft-amber text-signal-amber border border-transparent">AI Integration</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px]">
              <div className="aspect-[3/4] md:aspect-[4/5] bg-canvas rounded-lg overflow-hidden border border-midnight-ink/10 shadow-[0_24px_70px_rgba(15,16,18,0.1)]">
                <img
                  src="/about-image.png"
                  alt="Saviour Ukobong"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-16 md:w-22 h-px bg-electric-cyan hidden md:block"></div>
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 h-16 md:h-22 w-px bg-signal-green hidden md:block"></div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-midnight-ink/10 border border-midnight-ink/10 mb-144">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className="bg-white p-8 md:p-10 hover:bg-canvas transition-all duration-500"
            >
              <div className="flex items-start justify-between gap-6 mb-10">
                <div className={`w-12 h-12 rounded-full bg-soft-lavender flex items-center justify-center ${item.accent}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-comment shrink-0 mt-1" />
              </div>
              <h2 className="text-heading-lg font-w350 text-midnight-ink uppercase tracking-widest mb-4">{item.title}</h2>
              <p className="text-caption text-slate-comment leading-relaxed max-w-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-canvas py-94 md:py-144 px-4 md:px-12 border-y border-midnight-ink/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-22 items-start">
          <div>
            <span className="section-kicker mb-6 block">Background</span>
            <h2 className="text-display font-w350 text-midnight-ink leading-tight max-w-xl">
              Built from education, systems work, and applied product delivery.
            </h2>
          </div>

          <div className="grid gap-6">
            <div className="surface-panel rounded-lg p-8 md:p-10">
              <p className="text-slate-comment text-caption md:text-[13px] leading-relaxed">
                I build with React, TypeScript, Firebase, and modern AI APIs such as Gemini, OpenAI, and Claude. My focus is not just on using these tools, but on shaping them into workflows that are dependable and easy for real users to adopt.
              </p>
            </div>

            <div className="surface-panel rounded-lg p-8 md:p-10">
              <p className="text-slate-comment text-caption md:text-[13px] leading-relaxed">
                My background in educational technology and computational systems informs how I approach product design: clear structure, low-friction interactions, and a bias toward practical outcomes over novelty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-94 md:py-144 px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-22">
          <div>
            <span className="section-kicker mb-6 block">How I Work</span>
            <h2 className="text-display font-w350 text-midnight-ink leading-tight">A practical method for useful software.</h2>
          </div>
          <div className="grid gap-px bg-midnight-ink/10 border border-midnight-ink/10">
            {buildPrinciples.map((principle, index) => (
              <div key={principle} className="bg-white p-6 md:p-8 flex items-start gap-5">
                <span className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  index === 0 ? 'bg-soft-lavender text-future-blue' : index === 1 ? 'bg-soft-mint text-signal-green' : 'bg-soft-amber text-signal-amber'
                }`}>
                  0{index + 1}
                </span>
                <p className="text-caption text-slate-comment leading-relaxed max-w-xl">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas py-94 px-4 md:px-12 border-t border-midnight-ink/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-22">
          <div>
            <span className="section-kicker mb-6 block">Education</span>
            <div className="space-y-8 md:space-y-11">
              <div className="flex gap-4 md:gap-6">
                <span className="text-future-blue font-w350 text-[10px] md:text-caption whitespace-nowrap">2018-2022</span>
                <div>
                  <h4 className="text-caption font-bold text-midnight-ink mb-1 uppercase tracking-widest leading-tight">M.Ed - Educational Technology</h4>
                  <p className="text-caption text-slate-comment leading-relaxed">National Open University of Nigeria</p>
                  <p className="text-[10px] text-slate-comment italic">Digital learning systems and instructional technology.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6">
                <span className="text-future-blue font-w350 text-[10px] md:text-caption whitespace-nowrap">2011-2016</span>
                <div>
                  <h4 className="text-caption font-bold text-midnight-ink mb-1 uppercase tracking-widest leading-tight">B.Sc (Ed) - Statistics / Computer Science</h4>
                  <p className="text-caption text-slate-comment leading-relaxed text-balance">Computational systems and analytical problem-solving.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="surface-panel p-8 md:p-11 rounded-lg self-start">
            <span className="section-kicker mb-6 block">Certifications</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-future-blue pl-4 py-2">IBM AI Developer</div>
              <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-signal-green pl-4 py-2">Google Project Mgmt</div>
              <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-electric-cyan pl-4 py-2">IBM Software Dev</div>
              <div className="text-[10px] font-bold text-slate-comment uppercase tracking-widest border-l-2 border-signal-amber pl-4 py-2">Software Dev (3MTT)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
