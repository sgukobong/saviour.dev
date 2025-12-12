import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/projects' },
    { name: 'Garden', path: '/blog' },
    { name: 'Portal', path: '/portal' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'translate-y-0' : 'translate-y-0'}`}>
        <div className="max-w-fit mx-auto glass-panel rounded-full px-2 py-2 flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          <Link to="/" className="px-5 py-2 font-bold tracking-tighter text-white hover:text-neon-cyan transition-colors text-ui">
            SU<span className="text-neon-cyan">.</span>
          </Link>

          <div className="hidden md:flex items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-5 py-2 rounded-full text-ui transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact"
              className="ml-2 px-6 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-ui hover:bg-neon-cyan hover:text-black transition-all duration-300"
            >
              Contact
            </Link>
          </div>

          <button 
            className="md:hidden px-4 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-cosmic-950/95 backdrop-blur-xl pt-32 px-6 animate-fade-in md:hidden">
          <div className="flex flex-col space-y-6 text-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-subheading font-light tracking-tight ${
                  isActive(link.path) ? 'text-neon-cyan' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="text-subheading font-light tracking-tight text-neon-cyan"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;