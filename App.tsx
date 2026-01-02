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
       <span className="w-2 h-2 bg-black rounded-full animate-ping"></span>
       <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">Loading...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-cosmic-950 text-black selection:bg-black selection:text-white relative">
        <Navbar />
        <main className="flex-grow pt-20 pb-20 px-4 md:px-12 max-w-[1440px] mx-auto w-full z-10 relative">
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
        
        <footer className="py-16 border-t border-black/5 relative overflow-hidden bg-white">
           <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-sm">
            <p className="font-medium">© {new Date().getFullYear()} Saviour Ukobong.</p>
            
            <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/sgukobong/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors">
                    LinkedIn
                </a>
                <a href="https://github.com/sgukobong" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors">
                    GitHub
                </a>
                <a href="https://x.com/sgukobong" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors">
                    X
                </a>
            </div>
           </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;