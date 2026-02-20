
import React, { Suspense, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingChat from './components/FloatingChat';
import ManagementModal from './components/ManagementModal';
import { ShieldCheck } from 'lucide-react';

// Lazy load pages for performance (Code Splitting)
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Publications = React.lazy(() => import('./pages/Publications'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const ClientPortal = React.lazy(() => import('./pages/ClientPortal'));
const ClientDashboard = React.lazy(() => import('./pages/ClientDashboard'));
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
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

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
              <Route path="/dashboard" element={<ClientDashboard />} />
              <Route path="/now" element={<Now />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pay" element={<Payments />} />
              <Route path="/admin/posts" element={<AdminPosts />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
            </Routes>
          </Suspense>
        </main>
        
        <FloatingChat />
        
        <footer className="py-24 border-t border-black/5 relative overflow-hidden bg-white">
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
                 <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black tracking-tighter mb-2">saviour.dev</h3>
                    <p className="text-slate-400 text-sm font-medium">Engineering intelligent systems for the African context.</p>
                 </div>
                 
                 <div className="flex gap-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Social</span>
                        <a href="https://www.linkedin.com/in/sgukobong/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors text-sm font-bold">LinkedIn</a>
                        <a href="https://github.com/sgukobong" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors text-sm font-bold">GitHub</a>
                    </div>
                 </div>
              </div>

              <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <p>© {new Date().getFullYear()} Saviour Ukobong. All rights reserved.</p>
                
                <div className="flex items-center gap-8">
                    <button 
                      onClick={() => setIsAdminModalOpen(true)}
                      className="flex items-center gap-2 hover:text-brand-indigo transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" /> Admin Command
                    </button>
                    <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full"></div>
                    <span>System Status: Optimal</span>
                </div>
              </div>
           </div>
        </footer>

        <ManagementModal 
          isOpen={isAdminModalOpen} 
          onClose={() => setIsAdminModalOpen(false)} 
        />
      </div>
    </HashRouter>
  );
};

export default App;
