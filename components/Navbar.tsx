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

  const links = [
    { name: 'About Me', path: '/about' },
    { name: 'Portfolio', path: '/projects' },
    { name: 'Services', path: '/portal' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-12 flex justify-between items-center ${scrolled ? 'bg-white/95 backdrop-blur-xl py-4 border-b border-black/10 shadow-sm' : ''}`}>
      <Link to="/" className="text-2xl font-black tracking-tighter flex items-center group">
        <span className="text-black group-hover:text-slate-600 transition-colors">saviour</span>
        <span className="text-black">.dev</span>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm font-bold transition-colors ${location.pathname === link.path ? 'text-black underline underline-offset-8 decoration-2' : 'text-slate-500 hover:text-black'}`}
          >
            {link.name}
          </Link>
        ))}
        <Link 
          to="/contact"
          className="text-xs font-black bg-black text-white px-8 py-3.5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 uppercase tracking-widest"
        >
          Book A Call ↗
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;