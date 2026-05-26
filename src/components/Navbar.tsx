import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Capability', path: '/skills' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-4 md:px-12 flex justify-between items-center ${scrolled ? 'bg-ghost-white/90 backdrop-blur-xl py-4 border-b border-midnight-ink/5' : 'bg-transparent'}`}>
      <Link to="/" className="text-[22px] font-w350 tracking-[-0.04em] flex items-center group">
        <span className="text-midnight-ink">saviour.</span>
        <span className="text-future-blue group-hover:opacity-80 transition-opacity">dev</span>
      </Link>

      <div className="hidden md:flex items-center gap-2 p-1 bg-[rgba(117,117,117,0.05)] rounded-full backdrop-blur-sm border border-midnight-ink/5">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`px-6 py-2 rounded-full text-caption font-bold uppercase tracking-[0.1em] transition-all duration-500 ${
              location.pathname === link.path 
              ? 'bg-white text-future-blue shadow-sm' 
              : 'text-slate-comment hover:text-midnight-ink'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        <Link 
          to="/contact"
          className="btn-pill bg-midnight-ink text-white hover:bg-future-blue text-caption uppercase tracking-widest transition-all duration-500"
        >
          Get in Touch
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
