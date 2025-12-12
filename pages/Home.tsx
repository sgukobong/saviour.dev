import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-[85vh] flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Ambience - Parallax */}
      <div 
        ref={shape1Ref}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10 will-change-transform"
      ></div>
      <div 
        ref={shape2Ref}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10 will-change-transform"
      ></div>

      <div className="space-y-8 max-w-5xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-small font-medium mb-4 animate-float">
          <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
          Available for long-term & short-term projects
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-hero font-medium tracking-tighter leading-[1.05]">
          <span className="block text-white">I'm Saviour.</span>
          <span className="text-slate-500">I create tools that make life easier for Africans</span>
          <span className="block text-gradient-cyan text-3xl md:text-5xl lg:text-6xl mt-2 leading-tight py-1">
            — even in places with poor network and unreliable electricity.
          </span>
        </h1>

        <p className="text-body text-slate-400 max-w-2xl mt-4">
          Learning platforms, work tools, and simple apps <span className="text-white">anyone can use, anytime.</span>
        </p>

        <div className="flex flex-wrap gap-6 mt-12">
          <Link 
            to="/projects"
            className="group relative px-8 py-4 bg-white text-black text-ui rounded-2xl hover:bg-neon-cyan transition-colors shadow-[0_0_30px_rgba(0,234,255,0.2)]"
          >
            Explore My Work
            <span className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-neon-cyan/50 transition-all"></span>
          </Link>
          <Link 
            to="/about"
            className="px-8 py-4 bg-transparent border border-white/20 text-white text-ui rounded-2xl hover:border-neon-cyan hover:text-neon-cyan transition-all"
          >
            Learn More About My Journey
          </Link>
        </div>
      </div>

      {/* Tech Stack Strip */}
      <div className="mt-32 border-t border-white/5 pt-8 flex flex-wrap gap-12 items-center text-slate-500 font-mono text-small uppercase tracking-widest relative z-10">
        <span>Next.js 14</span>
        <span>Supabase</span>
        <span>Gemini AI</span>
        <span>Offline-First</span>
        <span>LearnDash</span>
        <span>Moodle</span>
      </div>
    </div>
  );
};

export default Home;