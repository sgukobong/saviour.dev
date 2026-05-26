import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-220 px-4 md:px-12 bg-white border-t border-midnight-ink/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-22 mb-144">
          <div className="max-w-md">
            <h3 className="text-heading-lg font-w350 mb-10 tracking-tight text-midnight-ink uppercase">saviour.dev</h3>
            <p className="text-slate-comment text-caption leading-relaxed mb-14 max-w-xs">
              AI Systems Engineer identity platform. Communicating technical authority, product thinking, and AI-native engineering capability.
            </p>
          </div>
          
          <div className="flex gap-22 md:gap-34">
            <div className="flex flex-col gap-6">
              <span className="text-caption font-bold uppercase tracking-[0.2em] text-midnight-ink/40">Navigation</span>
              <Link to="/about" className="nav-link text-caption uppercase tracking-widest">About</Link>
              <Link to="/projects" className="nav-link text-caption uppercase tracking-widest">Projects</Link>
              <Link to="/experience" className="nav-link text-caption uppercase tracking-widest">Experience</Link>
              <Link to="/skills" className="nav-link text-caption uppercase tracking-widest">Skills</Link>
            </div>
            
            <div className="flex flex-col gap-6">
              <span className="text-caption font-bold uppercase tracking-[0.2em] text-midnight-ink/40">Social</span>
              <a href="https://linkedin.com/in/sgukobong" target="_blank" rel="noopener noreferrer" className="nav-link text-caption uppercase tracking-widest">LinkedIn</a>
              <a href="https://github.com/sgukobong" target="_blank" rel="noopener noreferrer" className="nav-link text-caption uppercase tracking-widest">GitHub</a>
              <a href="https://wa.me/your-whatsapp" target="_blank" rel="noopener noreferrer" className="nav-link text-caption uppercase tracking-widest">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="pt-11 border-t border-midnight-ink/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-comment text-[10px] uppercase tracking-[0.3em]">
          <p>© {new Date().getFullYear()} Saviour Ukobong. Precision Engineered.</p>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-future-blue rounded-full animate-pulse"></span>
              <span className="text-midnight-ink/40">System Status: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
