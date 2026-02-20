
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import SEO from '../components/SEO';
import { WorkflowItem, CommunicationLog } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Workflow, 
  ChevronRight, 
  Download, 
  Zap, 
  LayoutDashboard,
  Calendar,
  LogOut
} from 'lucide-react';

const MOCK_WORKFLOW: WorkflowItem[] = [
  { id: '1', title: 'Discovery & Audit', status: 'completed', description: 'Technical scoping of AI integration points.', date: 'Jan 10' },
  { id: '2', title: 'Workflow Architecture', status: 'completed', description: 'Visual mapping of Zapier & Make logic.', date: 'Jan 15' },
  { id: '3', title: 'Core Logic Build', status: 'active', description: 'Building custom Python hooks and SaaS integration.', date: 'Feb 1' },
  { id: '4', title: 'Deployment & Scaling', status: 'pending', description: 'Final cloud deployment and performance audit.' }
];

const MOCK_COMMUNICATION: CommunicationLog[] = [
  { id: '1', subject: 'Q1 AI Roadmap Refinement', excerpt: 'Following our last session, I have adjusted the latency targets for the model...', date: '3h ago', type: 'strategy' },
  { id: '2', subject: 'Production Sync - Milestone 2', excerpt: 'The core automation logic is now live in the staging environment.', date: '2 days ago', type: 'update' },
  { id: '3', subject: 'Invoice INV-2025-014 Issued', excerpt: 'Please review the attached statement for the current development sprint.', date: '1 week ago', type: 'billing' }
];

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/');
      setSession(session);
      setLoading(false);
    });
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return null;

  return (
    <div className="w-full pt-10 pb-32">
      <SEO title="Client Hub — Dashboard" description="Track your project workflow and communication log with Saviour Ukobong." />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-brand-indigo/10 text-brand-indigo px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-indigo/20">
                Active Client
             </span>
             <span className="text-slate-400 text-sm font-medium">Hello, {session?.user?.email?.split('@')[0]}</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Project <span className="text-brand-indigo">Hub</span></h1>
        </div>
        
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 text-xs font-black text-slate-400 hover:text-brand-rose transition-colors"
        >
          <LogOut className="w-4 h-4" /> Terminate Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Workflow Timeline */}
        <div className="lg:col-span-8 space-y-12">
          <div className="bg-white border border-brand-indigo/10 p-12 rounded-[3.5rem] shadow-xl shadow-brand-indigo/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center gap-4 mb-12">
               <Workflow className="w-6 h-6 text-brand-indigo" />
               <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-black font-black">Project Workflow</h2>
            </div>

            <div className="space-y-12">
              {MOCK_WORKFLOW.map((item, idx) => (
                <div key={item.id} className="relative flex gap-10">
                  {/* Timeline logic */}
                  {idx !== MOCK_WORKFLOW.length - 1 && (
                    <div className="absolute left-6 top-10 bottom-[-48px] w-0.5 bg-slate-100"></div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 transition-all border ${
                    item.status === 'completed' ? 'bg-brand-emerald text-white border-brand-emerald' : 
                    item.status === 'active' ? 'bg-brand-indigo text-white border-brand-indigo shadow-[0_0_15px_rgba(79,70,229,0.3)]' : 
                    'bg-white text-slate-300 border-slate-200'
                  }`}>
                    {item.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>

                  <div className="flex-grow pt-1">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className={`text-xl font-black ${item.status === 'pending' ? 'text-slate-400' : 'text-black'}`}>{item.title}</h3>
                       {item.date && <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">{item.date}</span>}
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
             <div className="p-10 rounded-[2.5rem] bg-black text-white shadow-2xl group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/20 blur-3xl rounded-full"></div>
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-8 font-black">Quick Action</h4>
                <p className="text-xl font-black mb-10 leading-tight">Request a technical strategy review for current sprint.</p>
                <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest bg-brand-indigo text-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all">
                   Submit Sync Request <ChevronRight className="w-4 h-4" />
                </button>
             </div>
             
             <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 flex flex-col justify-between hover:border-brand-indigo transition-colors cursor-pointer group">
                <div>
                   <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-6 font-black group-hover:text-brand-indigo transition-colors">Documents</h4>
                   <p className="text-xl font-black text-black tracking-tight mb-4">Project Blueprint & API Specs v2.4</p>
                </div>
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-indigo border-b border-brand-indigo pb-1 w-fit">
                   <Download className="w-4 h-4" /> Download Archive
                </button>
             </div>
          </div>
        </div>

        {/* Right: Communication Feed */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-slate-50 border border-black/5 p-12 rounded-[3.5rem] shadow-sm">
            <div className="flex items-center gap-4 mb-12">
               <MessageSquare className="w-6 h-6 text-brand-indigo" />
               <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-black font-black">Strategic Feed</h2>
            </div>

            <div className="space-y-6">
              {MOCK_COMMUNICATION.map(log => (
                <div key={log.id} className="p-6 bg-white rounded-3xl border border-black/5 hover:border-brand-indigo/30 transition-all cursor-pointer group shadow-sm">
                   <div className="flex justify-between items-center mb-3">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-md ${
                        log.type === 'strategy' ? 'bg-brand-violet/10 text-brand-violet' :
                        log.type === 'billing' ? 'bg-brand-amber/10 text-brand-amber' : 'bg-brand-indigo/10 text-brand-indigo'
                      }`}>
                         {log.type}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 font-bold">{log.date}</span>
                   </div>
                   <h4 className="text-md font-black text-black group-hover:text-brand-indigo transition-colors mb-2 tracking-tight">{log.subject}</h4>
                   <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 italic">{log.excerpt}</p>
                </div>
              ))}
              
              <button className="w-full py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors border-2 border-dashed border-black/5 rounded-2xl">
                 View Historical Logs
              </button>
            </div>
          </div>

          <div className="p-12 rounded-[3.5rem] bg-brand-indigo text-white shadow-xl shadow-brand-indigo/10 relative overflow-hidden">
             <Zap className="w-8 h-8 mb-8 text-white/50" />
             <h3 className="text-2xl font-black mb-4 tracking-tight">Active Billing</h3>
             <p className="text-white/60 text-sm font-medium mb-10">Access your digital ledger to settle invoices and download receipts.</p>
             <button 
                onClick={() => navigate('/portal')}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-lg"
             >
                Open Ledger ↗
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
