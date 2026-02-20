import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const links = [
    { name: 'About Me', path: '/about' },
    { name: 'Portfolio', path: '/projects' },
    { name: 'Services', path: '/portal' },
    { name: 'Blog', path: '/blog' },
  ];

  const handleCtaClick = () => {
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/contact');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-12 flex justify-between items-center ${scrolled ? 'bg-white/95 backdrop-blur-xl py-4 border-b border-brand-indigo/10 shadow-sm' : ''}`}>
      <Link to="/" className="text-2xl font-black tracking-tighter flex items-center group">
        <span className="text-black group-hover:text-brand-indigo transition-colors">saviour</span>
        <span className="text-brand-indigo/40 group-hover:text-brand-indigo transition-colors">.dev</span>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm font-bold transition-all relative group ${location.pathname === link.path ? 'text-brand-indigo' : 'text-slate-500 hover:text-black'}`}
          >
            {link.name}
            <span className={`absolute -bottom-2 left-0 h-0.5 bg-brand-indigo transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        ))}
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleCtaClick}
            className={`text-xs font-black px-10 py-3.5 rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-widest ${
              session 
              ? 'bg-brand-indigo text-white shadow-brand-indigo/10 hover:bg-brand-violet' 
              : 'bg-black text-white hover:bg-brand-indigo shadow-brand-indigo/10'
            }`}
          >
            {session ? 'Dashboard ↗' : 'Book ↗'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;