import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Rebuilt for Bottom-Left alignment based on reference image */}
      <section className="min-h-screen flex items-end justify-start relative overflow-hidden bg-white px-6 md:px-113 pb-113 md:pb-144">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
          {/* Spectral Glow Overlay to blend with Augen Pro aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl z-10 text-left"
        >
          {/* Tagline / Identity Tag */}
          <span className="text-caption font-bold uppercase tracking-[0.3em] text-future-blue mb-10 block">
            AI Product Engineer & Systems Architect
          </span>
          
          {/* Main Headline */}
          <h1 className="text-[48px] md:text-[80px] font-w350 tracking-[-0.04em] text-midnight-ink leading-[1.05] mb-14 drop-shadow-sm">
            Beyond Humanware.
          </h1>
          
          {/* Sub-system Indicators */}
          <div className="flex flex-wrap gap-14 mb-22">
            <button className="btn-ghost text-caption uppercase tracking-[0.2em] hover:text-future-blue transition-colors">A¹ Sense</button>
            <button className="btn-ghost text-caption uppercase tracking-[0.2em] hover:text-future-blue transition-colors">B¹ Eye</button>
            <button className="btn-ghost text-caption uppercase tracking-[0.2em] hover:text-future-blue transition-colors">A¹ Neuro</button>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-start justify-start gap-10">
            <Link to="/projects" className="btn-pill bg-midnight-ink text-white hover:bg-future-blue flex items-center gap-6 group">
              Explore Systems <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
        
        {/* Detail from image - repositioned slightly */}
        <div className="absolute top-1/2 right-113 -translate-y-1/2 hidden lg:flex flex-col items-end gap-4 opacity-20">
           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-midnight-ink rotate-90 origin-right translate-y-22">Architecture Layer</span>
           <div className="w-px h-144 bg-midnight-ink mt-22"></div>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-220 px-4 md:px-12 bg-ghost-white border-t border-midnight-ink/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-22">
            {[
              { num: '01', title: 'AI Native Product Thinking', desc: 'Moving beyond wrappers. Building systems where AI is the core architect, not just an add-on.' },
              { num: '02', title: 'Scalable Systems Architecture', desc: 'Engineering high-performance backends and intuitive frontends that handle complexity with grace.' },
              { num: '03', title: 'Product Engineering Lead', desc: 'Bridging the gap between technical rigor and business impact through architectural minimalism.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-10"
              >
                <span className="text-caption font-bold text-future-blue tracking-widest uppercase">{item.num}. Strategy</span>
                <h3 className="text-heading-lg font-w350 text-midnight-ink">{item.title}</h3>
                <p className="text-slate-comment text-caption leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-220 px-4 md:px-12 bg-canvas border-y border-midnight-ink/5">
        <div className="max-w-[1440px] mx-auto flex justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-caption font-bold text-midnight-ink/30 uppercase tracking-[0.3em] mb-11 block">System Objective</span>
            <h2 className="text-display font-w350 mb-11 leading-tight text-midnight-ink">Intellectual Rigor.</h2>
            <p className="text-slate-comment font-regular text-heading-lg leading-relaxed">
              Precision-engineered intelligent systems designed for the future of SaaS and autonomous enterprise workflows. Every element is immaculately placed.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
