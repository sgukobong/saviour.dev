import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Capability', path: '/skills' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-12 ${scrolled || menuOpen ? 'bg-white/85 backdrop-blur-xl border-b border-midnight-ink/10 shadow-[0_12px_40px_rgba(15,16,18,0.05)]' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between py-4 md:py-6">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Saviour.dev home">
          <img src="/brand-mark.svg" alt="" className="w-9 h-9 rounded-xl shrink-0 shadow-[0_10px_25px_rgba(15,16,18,0.08)]" />
          <span className="text-[22px] font-w350 tracking-normal">
            <span className="text-midnight-ink">saviour.</span>
            <span className="text-future-blue group-hover:opacity-80 transition-opacity">dev</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 p-1 bg-white/70 rounded-full backdrop-blur-sm border border-midnight-ink/10 shadow-[0_10px_30px_rgba(15,16,18,0.04)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-6 py-2 rounded-full text-caption font-bold uppercase tracking-[0.1em] transition-all duration-500 ${
                location.pathname === link.path 
                ? 'bg-soft-lavender text-future-blue shadow-sm' 
                : 'text-slate-comment hover:text-midnight-ink'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <Link 
            to="/contact"
            className="btn-pill bg-midnight-ink text-white hover:bg-future-blue text-caption uppercase tracking-widest transition-all duration-500 shadow-[0_14px_35px_rgba(0,95,204,0.14)]"
          >
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden w-11 h-11 rounded-full bg-white/90 border border-midnight-ink/10 flex items-center justify-center text-midnight-ink shadow-[0_10px_30px_rgba(15,16,18,0.06)]"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[420px] pb-6' : 'max-h-0'}`}>
        <div className="grid gap-2 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center justify-between border border-midnight-ink/10 bg-white px-5 py-4 text-caption font-bold uppercase tracking-[0.16em] ${
                location.pathname === link.path ? 'text-future-blue' : 'text-midnight-ink'
              }`}
            >
              {link.name}
              <span className="text-slate-comment">0{navLinks.indexOf(link) + 1}</span>
            </Link>
          ))}
          <Link to="/contact" className="btn-pill bg-midnight-ink text-white hover:bg-future-blue text-caption uppercase tracking-widest mt-2 py-4">
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
