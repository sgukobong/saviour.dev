import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingChat from './components/FloatingChat';

// Lazy load pages for performance (Code Splitting)
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Publications = React.lazy(() => import('./pages/Publications'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const ClientPortal = React.lazy(() => import('./pages/ClientPortal'));
const Now = React.lazy(() => import('./pages/Now'));
const Contact = React.lazy(() => import('./pages/Contact'));
const AdminPosts = React.lazy(() => import('./pages/AdminPosts'));
const AdminPayments = React.lazy(() => import('./pages/AdminPayments'));
const Payments = React.lazy(() => import('./pages/Payments'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
       <span className="w-2 h-2 bg-neon-cyan rounded-full animate-ping"></span>
       <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">Loading...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-cosmic-950 text-white selection:bg-neon-cyan selection:text-black relative">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full z-10 relative">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/portal" element={<ClientPortal />} />
              <Route path="/now" element={<Now />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pay" element={<Payments />} />
              <Route path="/admin/posts" element={<AdminPosts />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
            </Routes>
          </Suspense>
        </main>
        
        <FloatingChat />
        
        <footer className="py-12 border-t border-white/5 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
           <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} Saviour Ukobong.</p>
            
            <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/sgukobong/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://github.com/sgukobong" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://x.com/sgukobong" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="X (Twitter)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
            </div>
           </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;