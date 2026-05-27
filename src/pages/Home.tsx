import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section - Optimized for Mobile & Bottom-Left alignment */}
      <section className="min-h-[92vh] flex items-end justify-start relative overflow-hidden bg-white px-6 md:px-113 pb-22 md:pb-144">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Engineering Background" 
            className="w-full h-full object-cover opacity-55 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.92)_0%,rgba(246,248,251,0.72)_44%,rgba(238,240,255,0.42)_100%)]"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ghost-white to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl z-10 text-left w-full pt-144"
        >
          {/* Identity Tag - Scaled for mobile */}
          <span className="section-kicker mb-6 md:mb-10 block">
            AI Product Engineer building intelligent systems
          </span>
          
          {/* Headline - Responsive typography */}
          <h1 className="text-[34px] sm:text-[48px] md:text-[80px] font-w350 tracking-normal text-midnight-ink leading-[1.1] mb-10 md:mb-14 drop-shadow-sm">
            Building the next generation of AI-native products.
          </h1>
          
          {/* Core Service Areas - Stacked on small mobile */}
          <div className="flex flex-wrap gap-4 md:gap-6 mb-14 md:mb-22">
            <Link to="/skills" className="tag-pill uppercase tracking-[0.16em] hover:border-future-blue/20 border border-transparent">SaaS Development</Link>
            <Link to="/skills" className="tag-pill uppercase tracking-[0.16em] bg-soft-mint text-signal-green hover:border-signal-green/20 border border-transparent">AI Automation</Link>
            <Link to="/skills" className="tag-pill uppercase tracking-[0.16em] bg-soft-amber text-signal-amber hover:border-signal-amber/20 border border-transparent">Systems Design</Link>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-start justify-start gap-10">
            <Link to="/projects" className="btn-pill bg-midnight-ink text-white hover:bg-future-blue flex items-center gap-4 md:gap-6 group">
              View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
        
        {/* Architecture Detail - Hidden on smaller tablets/mobile */}
        <div className="absolute top-1/2 right-113 -translate-y-1/2 hidden xl:flex flex-col items-end gap-4 opacity-20">
           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-midnight-ink rotate-90 origin-right translate-y-22">Engineering Focus</span>
           <div className="w-px h-144 bg-midnight-ink mt-22"></div>
        </div>
      </section>

      {/* positioning Section - Adjusted grid for mobile */}
      <section className="py-94 md:py-144 px-6 md:px-12 bg-ghost-white border-t border-midnight-ink/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 md:mb-22 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="section-kicker mb-5 block">Operating Model</span>
              <h2 className="text-[24px] md:text-display font-w350 text-midnight-ink max-w-xl leading-tight">A sharper path from product problem to reliable AI system.</h2>
            </div>
            <div className="accent-line"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-midnight-ink/10 border border-midnight-ink/10">
            {[
              { num: '01', title: 'Product-First AI', desc: 'Building software where AI drives core functionality and value, going far beyond simple API wrappers.', accent: 'text-future-blue bg-soft-lavender' },
              { num: '02', title: 'Scalable Architecture', desc: 'Engineering reliable backends and intuitive interfaces designed to handle high-stakes enterprise complexity.', accent: 'text-signal-green bg-soft-mint' },
              { num: '03', title: 'Technical Leadership', desc: 'Bridging the gap between engineering rigor and business impact through rapid, high-fidelity iteration.', accent: 'text-signal-amber bg-soft-amber' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="surface-panel p-8 md:p-11 flex flex-col gap-6 md:gap-10"
              >
                <span className={`w-fit rounded-lg px-3 py-2 text-[10px] md:text-caption font-bold tracking-widest uppercase ${item.accent}`}>{item.num}. Approach</span>
                <h3 className="text-[16px] md:text-heading-lg font-w350 text-midnight-ink">{item.title}</h3>
                <p className="text-slate-comment text-caption leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-94 md:py-144 px-6 md:px-12 bg-canvas border-y border-midnight-ink/5">
        <div className="max-w-[1440px] mx-auto flex justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="section-kicker mb-6 md:mb-11 block">Engineering Philosophy</span>
            <h2 className="text-[22px] md:text-display font-w350 mb-6 md:mb-11 leading-tight text-midnight-ink">Clarity and Precision.</h2>
            <p className="text-slate-comment font-regular text-[16px] md:text-heading-lg leading-relaxed">
              I believe in building systems that are as intuitive as they are powerful. My focus is on creating tools that solve real human problems through clean code and thoughtful design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action - Responsive padding */}
      <section className="py-94 md:py-144 px-6 md:px-12 bg-midnight-ink text-ghost-white">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-11 text-center md:text-left">
           <h2 className="text-[22px] md:text-display font-w350">Have a project in mind?</h2>
           <Link to="/contact" className="btn-pill bg-white text-midnight-ink hover:bg-future-blue hover:text-white flex items-center gap-4 md:gap-6 group">
             Let's Talk <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
