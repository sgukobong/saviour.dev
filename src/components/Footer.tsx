import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-144 md:py-220 px-4 md:px-12 bg-midnight-ink text-white border-t border-midnight-ink/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-22 mb-144">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-10">
              <img src="/brand-mark.svg" alt="" className="w-10 h-10 rounded-xl shrink-0 shadow-[0_10px_25px_rgba(15,16,18,0.25)]" />
              <h3 className="text-heading-lg font-w350 tracking-tight text-white uppercase">saviour.dev</h3>
            </div>
            <div className="accent-line mb-10"></div>
            <p className="text-white/65 text-caption leading-relaxed mb-14 max-w-xs">
              AI Product Engineer identity platform. Architecting intelligent systems for the African context and global civil action.
            </p>
          </div>

          <div className="flex gap-22 md:gap-34">
            <div className="flex flex-col gap-6">
              <span className="text-caption font-bold uppercase tracking-[0.2em] text-white/40">Navigation</span>
              <Link to="/about" className="text-white/70 hover:text-white text-caption uppercase tracking-widest transition-colors">About</Link>
              <Link to="/projects" className="text-white/70 hover:text-white text-caption uppercase tracking-widest transition-colors">Projects</Link>
              <Link to="/experience" className="text-white/70 hover:text-white text-caption uppercase tracking-widest transition-colors">Experience</Link>
              <Link to="/skills" className="text-white/70 hover:text-white text-caption uppercase tracking-widest transition-colors">Skills</Link>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-caption font-bold uppercase tracking-[0.2em] text-white/40">Social</span>
              <a href="https://linkedin.com/in/sgukobong" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-caption uppercase tracking-widest transition-colors">LinkedIn</a>
              <a href="https://github.com/sgukobong" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-caption uppercase tracking-widest transition-colors">GitHub</a>
              <a href="mailto:sgukobong@gmail.com" className="text-white/70 hover:text-white text-caption uppercase tracking-widest transition-colors">Email</a>
            </div>
          </div>
        </div>

        <div className="pt-11 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/50 text-[10px] uppercase tracking-[0.3em]">
          <p>&copy; {new Date().getFullYear()} Saviour Ukobong. Precision Engineered.</p>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-future-blue rounded-full animate-pulse"></span>
              <span className="text-white/50">Abuja, Nigeria - Remote</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
