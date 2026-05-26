import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section - Optimized for Mobile & Bottom-Left alignment */}
      <section className="min-h-screen flex items-end justify-start relative overflow-hidden bg-white px-6 md:px-113 pb-22 md:pb-144">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Engineering Background" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl z-10 text-left w-full pt-144"
        >
          {/* Identity Tag - Scaled for mobile */}
          <span className="text-[10px] md:text-caption font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-future-blue mb-6 md:mb-10 block">
            AI Product Engineer building intelligent systems
          </span>
          
          {/* Headline - Responsive typography */}
          <h1 className="text-[34px] sm:text-[48px] md:text-[80px] font-w350 tracking-[-0.04em] text-midnight-ink leading-[1.1] mb-10 md:mb-14 drop-shadow-sm">
            Building the next generation of AI-native products.
          </h1>
          
          {/* Core Service Areas - Stacked on small mobile */}
          <div className="flex flex-wrap gap-4 md:gap-14 mb-14 md:mb-22">
            <button className="btn-ghost text-[10px] md:text-caption uppercase tracking-[0.1em] md:tracking-[0.2em] hover:text-future-blue transition-colors">SaaS Development</button>
            <button className="btn-ghost text-[10px] md:text-caption uppercase tracking-[0.1em] md:tracking-[0.2em] hover:text-future-blue transition-colors">AI Automation</button>
            <button className="btn-ghost text-[10px] md:text-caption uppercase tracking-[0.1em] md:tracking-[0.2em] hover:text-future-blue transition-colors">Systems Design</button>
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
      <section className="py-94 md:py-220 px-6 md:px-12 bg-ghost-white border-t border-midnight-ink/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-22">
            {[
              { num: '01', title: 'Product-First AI', desc: 'Building software where AI drives core functionality and value, going far beyond simple API wrappers.' },
              { num: '02', title: 'Scalable Architecture', desc: 'Engineering reliable backends and intuitive interfaces designed to handle high-stakes enterprise complexity.' },
              { num: '03', title: 'Technical Leadership', desc: 'Bridging the gap between engineering rigor and business impact through rapid, high-fidelity iteration.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-6 md:gap-10"
              >
                <span className="text-[10px] md:text-caption font-bold text-future-blue tracking-widest uppercase">{item.num}. Approach</span>
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
      <section className="py-94 md:py-220 px-6 md:px-12 bg-canvas border-y border-midnight-ink/5">
        <div className="max-w-[1440px] mx-auto flex justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-caption font-bold text-midnight-ink/30 uppercase tracking-[0.3em] mb-6 md:mb-11 block">Engineering Philosophy</span>
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
