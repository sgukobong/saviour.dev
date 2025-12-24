import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (shape1Ref.current) {
        // Moves slightly down as you scroll down
        shape1Ref.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      if (shape2Ref.current) {
        // Moves slightly up/slower as you scroll down for depth
        shape2Ref.current.style.transform = `translateY(${-scrollY * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-20 md:py-0 relative overflow-hidden">
      <SEO 
        title="AI Developer & Offline-First Engineer"
        description="Saviour Ukobong is an AI developer and EdTech engineer in Nigeria specializing in offline-first mobile apps, Moodle systems, and 2G-friendly technology solutions for Africa."
        keywords={['AI developer Nigeria', 'Offline-first engineer', 'EdTech Africa', 'Moodle Developer', 'Gemini AI', 'React', 'Supabase']}
      />
      
      {/* Background Ambience - Parallax */}
      <div 
        ref={shape1Ref}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10 will-change-transform opacity-50"
      ></div>
      <div 
        ref={shape2Ref}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-ember/5 rounded-full blur-[100px] pointer-events-none -z-10 will-change-transform opacity-30"
      ></div>

      <div className="max-w-4xl relative z-10 px-2 md:px-0">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs md:text-sm font-medium mb-10 animate-float backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
          </span>
          Available for AI & EdTech Projects
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8">
          Hi, I’m <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">Saviour.</span>
        </h1>

        {/* Subheadline */}
        <h2 className="text-2xl md:text-4xl lg:text-[42px] font-medium text-slate-200 leading-[1.2] tracking-tight mb-8">
          I create tools that make life easier for Africans — <span className="text-slate-500">even with poor network and unreliable electricity.</span>
        </h2>

        {/* Supporting Paragraph */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
          From offline-first learning platforms to AI coaching tools and everyday apps, I build software that keeps working when the lights go out.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-5 items-center">
          <Link 
            to="/projects"
            className="group relative px-8 py-4 bg-white text-black font-semibold text-lg rounded-full hover:bg-neon-cyan transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] flex items-center gap-2"
          >
            See Projects
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link 
            to="/contact"
            className="group px-8 py-4 bg-transparent border border-white/10 text-white font-semibold text-lg rounded-full hover:border-white/30 hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
          >
            Let’s Talk
            <span className="w-2 h-2 rounded-full bg-neon-ember group-hover:animate-pulse"></span>
          </Link>
        </div>
      </div>

      {/* Tech Stack Strip */}
      <div className="mt-32 border-t border-white/5 pt-10">
        <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-6">Powering Resilient Systems With</p>
        <div className="flex flex-wrap gap-x-12 gap-y-4 items-center text-slate-500 font-mono text-sm uppercase tracking-wider opacity-70">
          <span className="hover:text-neon-cyan transition-colors cursor-default">Next.js 14</span>
          <span className="hover:text-neon-cyan transition-colors cursor-default">Supabase</span>
          <span className="hover:text-neon-cyan transition-colors cursor-default">Gemini AI</span>
          <span className="hover:text-neon-cyan transition-colors cursor-default">Offline-First PWA</span>
          <span className="hover:text-neon-cyan transition-colors cursor-default">Moodle</span>
          <span className="hover:text-neon-cyan transition-colors cursor-default">Edge Computing</span>
        </div>
      </div>
      
    </div>
  );
};

export default Home;