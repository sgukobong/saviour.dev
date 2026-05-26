
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../services/supabase';
import { 
  X, 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Inbox, 
  TrendingUp, 
  Plus, 
  Trash2, 
  CheckCircle, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  ChevronRight, 
  Mail, 
  User, 
  DollarSign, 
  Type, 
  FileCode, 
  CheckCircle2, 
  Search, 
  Filter, 
  MoreVertical, 
  AlertCircle,
  Clock,
  Ban
} from 'lucide-react';
import { PaymentRecord, Message, BlogPost } from '../types';

interface ManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManagementModal: React.FC<ManagementModalProps> = ({ isOpen, onClose }) => {
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'insights' | 'journal' | 'ledger' | 'inbox'>('insights');
  const [view, setView] = useState<'list' | 'create' | 'details'>('list');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Data States
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  // Selection/Search States
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [ledgerSearchTerm, setLedgerSearchTerm] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAllAdminData();
    });
  }, [isOpen]);

  const fetchAllAdminData = async () => {
    setLoading(true);
    try {
      const [pRes, mRes, postRes] = await Promise.all([
        supabase.from('payments').select('*').order('created_at', { ascending: false }),
        supabase.from('messages').select('*').order('created_at', { ascending: false }),
        supabase.from('posts').select('*').order('published_at', { ascending: false })
      ]);
      if (pRes.data) setPayments(pRes.data);
      if (mRes.data) setMessages(mRes.data);
      if (postRes.data) setPosts(postRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthLoading(true);
    if (email === 'sgukobong@gmail.com' && password === 'Root&2000') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setSession({ user: { email: 'sgukobong@gmail.com' } });
        fetchAllAdminData();
      } else {
        setSession(data.session);
        fetchAllAdminData();
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Invalid credentials.");
      else {
        setSession(data.session);
        fetchAllAdminData();
      }
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    onClose();
  };

  // Workflow Handlers
  const handleDeletePayment = async (id: string) => {
    if (!confirm('Permanently delete this invoice from the records? This cannot be undone.')) return;
    setActionLoading(true);
    const { error } = await supabase.from('payments').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      setPayments(prev => prev.filter(p => p.id !== id));
      if (selectedPayment?.id === id) setView('list');
    }
    setActionLoading(false);
  };

  const handleUpdatePaymentStatus = async (id: string, status: PaymentRecord['status']) => {
    setActionLoading(true);
    const updateData: any = { status };
    if (status === 'paid') updateData.paid_at = new Date().toISOString();
    
    const { error } = await supabase.from('payments').update(updateData).eq('id', id);
    if (error) alert(error.message);
    else {
      setPayments(prev => prev.map(p => p.id === id ? { ...p, ...updateData } : p));
      if (selectedPayment?.id === id) setSelectedPayment(prev => prev ? { ...prev, ...updateData } : null);
    }
    setActionLoading(false);
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Destroy this record permanently?')) return;
    setActionLoading(true);
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
    setActionLoading(false);
  };

  const handleMarkRead = async (id: string) => {
    const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', id);
    if (!error) {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.currentTarget);
    const invoice = {
      client_name: formData.get('client_name'),
      client_email: formData.get('client_email'),
      service_name: formData.get('service_name'),
      amount: parseFloat(formData.get('amount') as string),
      currency: formData.get('currency'),
      status: 'pending',
      invoice_number: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('payments').insert([invoice]).select();
    if (error) alert(error.message);
    else {
      setPayments(prev => [data[0], ...prev]);
      setView('list');
    }
    setActionLoading(false);
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const post = {
      title,
      slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      published_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('posts').insert([post]).select();
    if (error) alert(error.message);
    else {
      setPosts(prev => [data[0], ...prev]);
      setView('list');
    }
    setActionLoading(false);
  };

  // Memoized Filtered Ledger
  const filteredLedger = useMemo(() => {
    return payments.filter(p => 
      p.client_name.toLowerCase().includes(ledgerSearchTerm.toLowerCase()) ||
      p.invoice_number.toLowerCase().includes(ledgerSearchTerm.toLowerCase()) ||
      p.service_name.toLowerCase().includes(ledgerSearchTerm.toLowerCase())
    );
  }, [payments, ledgerSearchTerm]);

  // Financial Summaries
  const ledgerSummary = useMemo(() => {
    const paid = payments.filter(p => p.status === 'paid');
    const pending = payments.filter(p => p.status === 'pending');
    
    return {
      totalPaidUSD: paid.filter(p => p.currency === 'USD').reduce((sum, p) => sum + p.amount, 0),
      totalPendingUSD: pending.filter(p => p.currency === 'USD').reduce((sum, p) => sum + p.amount, 0),
      count: payments.length
    };
  }, [payments]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-10">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full h-full max-w-7xl bg-[#0a0a0a] md:rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(79,70,229,0.2)] overflow-hidden flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="bg-white/5 border-b border-white/5 p-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-brand-indigo rounded-2xl flex items-center justify-center shadow-lg shadow-brand-indigo/20">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-white font-black text-xl tracking-tight">Saviour Command Center</h2>
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">v2.6.0 — Secure Administrative Environment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session && (
              <button onClick={handleLogout} className="text-white/40 hover:text-brand-rose transition-colors p-2" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
            )}
            <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {!session ? (
          /* Login View */
          <div className="flex-grow flex items-center justify-center p-12">
            <div className="w-full max-w-md space-y-8 text-center">
              <div className="space-y-4 mb-12">
                <Lock className="w-12 h-12 text-brand-indigo mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white">Authorization Required</h3>
                <p className="text-white/40 text-sm">Access to site financials and core infrastructure is restricted to the administrator.</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-indigo outline-none transition-all" />
                <input type="password" placeholder="Access Key" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-indigo outline-none transition-all" />
                <button type="submit" disabled={authLoading} className="w-full py-5 bg-brand-indigo text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-violet transition-all shadow-xl disabled:opacity-50">
                  {authLoading ? 'Verifying...' : 'Authorize Session'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white/5 border-r border-white/5 p-6 flex flex-col gap-2">
              {[
                { id: 'insights', label: 'Insights', icon: TrendingUp, color: 'text-brand-indigo' },
                { id: 'journal', label: 'Journal', icon: FileText, color: 'text-brand-violet' },
                { id: 'ledger', label: 'Ledger', icon: CreditCard, color: 'text-brand-emerald' },
                { id: 'inbox', label: 'Inbox', icon: Inbox, color: 'text-brand-amber' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); setView('list'); }}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                    activeTab === tab.id ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
                  <span className="text-sm font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto p-10 bg-[#0c0c0c] custom-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center h-full"><div className="w-10 h-10 border-4 border-brand-indigo border-t-transparent rounded-full animate-spin"></div></div>
              ) : (
                <div className="animate-fade-in h-full">
                  
                  {/* INSIGHTS TAB */}
                  {activeTab === 'insights' && (
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                          <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-4">Gross Revenue (NGN)</p>
                          <p className="text-4xl font-black text-white">₦{payments.filter(p => p.currency === 'NGN' && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                          <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-4">Gross Revenue (USD)</p>
                          <p className="text-4xl font-black text-brand-indigo">${payments.filter(p => p.currency === 'USD' && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                          <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-4">Pending Invoices</p>
                          <p className="text-4xl font-black text-brand-amber">{payments.filter(p => p.status === 'pending').length}</p>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-[3rem] border border-white/5 p-10">
                        <h3 className="text-white font-black text-xl mb-8 flex items-center gap-3">
                          <TrendingUp className="text-brand-indigo w-6 h-6" /> Activity Timeline
                        </h3>
                        <div className="space-y-4">
                          {[...messages.slice(0, 3), ...payments.slice(0, 3)].sort((a,b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()).map((item: any, i) => (
                            <div 
                              key={i} 
                              onClick={() => {
                                if ('invoice_number' in item) {
                                  setActiveTab('ledger');
                                  setSelectedPayment(item);
                                  setView('details');
                                } else {
                                  setActiveTab('inbox');
                                }
                              }}
                              className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${'invoice_number' in item ? 'bg-brand-emerald' : 'bg-brand-indigo'}`}></div>
                                <div>
                                  <p className="text-white text-sm font-bold">{'invoice_number' in item ? `Invoice: ${item.client_name}` : `Inquiry: ${item.name}`}</p>
                                  <p className="text-white/40 text-[10px] font-mono uppercase">{new Date(item.created_at).toLocaleString()}</p>
                                </div>
                              </div>
                              <ChevronRight className="text-white/20 w-5 h-5 group-hover:text-white transition-colors" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* JOURNAL TAB */}
                  {activeTab === 'journal' && (
                    <div className="space-y-8 h-full flex flex-col">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-black text-2xl tracking-tighter">Site Journal</h3>
                        <button 
                          onClick={() => setView(view === 'create' ? 'list' : 'create')}
                          className="flex items-center gap-3 bg-brand-indigo text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-violet transition-all shadow-lg"
                        >
                          {view === 'create' ? 'Cancel' : <><Plus className="w-4 h-4" /> New Entry</>}
                        </button>
                      </div>

                      {view === 'create' ? (
                        <form onSubmit={handleCreatePost} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 space-y-6 flex-grow animate-fade-in-up">
                          <div className="space-y-4">
                             <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest block">Post Title</label>
                             <input name="title" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-brand-indigo transition-all" placeholder="Enter headline..." />
                          </div>
                          <div className="space-y-4">
                             <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest block">Lead Abstract</label>
                             <textarea name="excerpt" rows={2} required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-brand-indigo transition-all resize-none" placeholder="Short summary for SEO..." />
                          </div>
                          <div className="space-y-4 flex-grow">
                             <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest block">Markdown Content</label>
                             <textarea name="content" rows={12} required className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-white font-mono text-sm outline-none focus:border-brand-indigo transition-all" placeholder="# Start writing..." />
                          </div>
                          <button type="submit" disabled={actionLoading} className="w-full py-5 bg-brand-indigo text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-violet transition-all shadow-xl disabled:opacity-50">
                            {actionLoading ? 'Deploying...' : 'Publish Entry'}
                          </button>
                        </form>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {posts.map(post => (
                            <div key={post.id} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 group hover:border-brand-violet/50 transition-all">
                              <h4 className="text-white font-black text-lg mb-2 truncate">{post.title}</h4>
                              <p className="text-white/40 text-xs mb-6 line-clamp-2">{post.excerpt}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-mono text-white/20 uppercase font-black">{new Date(post.published_at).toLocaleDateString()}</span>
                                <div className="flex gap-2">
                                  <button className="p-2 text-white/40 hover:text-brand-rose transition-colors"><Trash2 className="w-4 h-4" /></button>
                                  <button className="p-2 text-white/40 hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* LEDGER TAB - ENHANCED WORKFLOW */}
                  {activeTab === 'ledger' && (
                    <div className="space-y-8 h-full flex flex-col">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                          <h3 className="text-white font-black text-2xl tracking-tighter">Financial Ledger</h3>
                          {view === 'list' && (
                            <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                              <div className="flex flex-col">
                                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Total Collected</span>
                                <span className="text-xs font-black text-brand-emerald">${ledgerSummary.totalPaidUSD.toLocaleString()}</span>
                              </div>
                              <div className="w-px h-6 bg-white/10"></div>
                              <div className="flex flex-col">
                                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Accounts Receivable</span>
                                <span className="text-xs font-black text-brand-amber">${ledgerSummary.totalPendingUSD.toLocaleString()}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => { setView(view === 'create' ? 'list' : 'create'); setSelectedPayment(null); }}
                          className={`flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
                            view === 'create' ? 'bg-white/10 text-white' : 'bg-white text-black hover:bg-brand-indigo hover:text-white'
                          }`}
                        >
                          {view === 'create' ? 'Cancel' : <><Plus className="w-4 h-4" /> Create Invoice</>}
                        </button>
                      </div>

                      {view === 'create' ? (
                        <form onSubmit={handleCreateInvoice} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
                            <div className="space-y-4">
                                <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3" /> Client Name</label>
                                <input name="client_name" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" placeholder="Saviour Ukobong" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3 h-3" /> Billing Email</label>
                                <input name="client_email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" placeholder="client@example.com" />
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><FileCode className="w-3 h-3" /> Service Provided</label>
                                <input name="service_name" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" placeholder="e.g., AI Integration Consultation" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><DollarSign className="w-3 h-3" /> Amount</label>
                                <input name="amount" type="number" step="0.01" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono" placeholder="500.00" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><Type className="w-3 h-3" /> Currency</label>
                                <select name="currency" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none">
                                    <option value="USD" className="bg-[#0a0a0a]">USD ($)</option>
                                    <option value="NGN" className="bg-[#0a0a0a]">NGN (₦)</option>
                                </select>
                            </div>
                            <button type="submit" disabled={actionLoading} className="md:col-span-2 py-5 bg-brand-indigo text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-violet transition-all shadow-xl mt-4">
                               {actionLoading ? 'Syncing Ledger...' : 'Generate Invoice Record'}
                            </button>
                        </form>
                      ) : view === 'details' && selectedPayment ? (
                        <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 animate-fade-in space-y-12">
                           <div className="flex justify-between items-start">
                              <div>
                                 <button onClick={() => setView('list')} className="text-[10px] font-mono text-white/30 hover:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3 rotate-180" /> Back to List
                                 </button>
                                 <h4 className="text-white font-black text-4xl tracking-tighter">{selectedPayment.client_name}</h4>
                                 <p className="text-brand-indigo font-bold mt-2">{selectedPayment.invoice_number}</p>
                              </div>
                              <div className="text-right">
                                 <span className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full ${
                                    selectedPayment.status === 'paid' ? 'bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20' : 
                                    selectedPayment.status === 'pending' ? 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' : 
                                    'bg-brand-rose/10 text-brand-rose border border-brand-rose/20'
                                 }`}>
                                    {selectedPayment.status}
                                 </span>
                                 <p className="text-white/40 text-[10px] font-mono mt-4 uppercase">Logged: {new Date(selectedPayment.created_at).toLocaleDateString()}</p>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                 <p className="text-white/40 text-[9px] font-mono uppercase tracking-widest mb-4">Line Item</p>
                                 <p className="text-white font-bold">{selectedPayment.service_name}</p>
                              </div>
                              <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                 <p className="text-white/40 text-[9px] font-mono uppercase tracking-widest mb-4">Grand Total</p>
                                 <p className="text-white font-black text-2xl font-mono">{selectedPayment.currency} {selectedPayment.amount.toLocaleString()}</p>
                              </div>
                              <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                 <p className="text-white/40 text-[9px] font-mono uppercase tracking-widest mb-4">Client Contact</p>
                                 <p className="text-white font-bold underline truncate">{selectedPayment.client_email}</p>
                              </div>
                           </div>

                           <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                              <button 
                                onClick={() => handleUpdatePaymentStatus(selectedPayment.id!, 'paid')}
                                disabled={selectedPayment.status === 'paid' || actionLoading}
                                className="px-10 py-4 bg-brand-emerald text-white rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-30 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4" /> Mark as Paid
                              </button>
                              <button 
                                onClick={() => handleUpdatePaymentStatus(selectedPayment.id!, 'cancelled')}
                                disabled={selectedPayment.status === 'cancelled' || actionLoading}
                                className="px-10 py-4 bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all disabled:opacity-30 flex items-center gap-2"
                              >
                                <Ban className="w-4 h-4" /> Void Invoice
                              </button>
                              <button 
                                onClick={() => handleDeletePayment(selectedPayment.id!)}
                                disabled={actionLoading}
                                className="px-10 py-4 bg-brand-rose/10 text-brand-rose border border-brand-rose/20 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-rose hover:text-white transition-all ml-auto flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" /> Delete Permanently
                              </button>
                           </div>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-fade-in flex-grow flex flex-col">
                          {/* Filter Bar */}
                          <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-grow w-full">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                              <input 
                                type="text" 
                                placeholder="Search by Client, ID or Service..." 
                                value={ledgerSearchTerm}
                                onChange={(e) => setLedgerSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-white focus:border-brand-indigo outline-none transition-all placeholder:text-white/10"
                              />
                            </div>
                            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                              <Filter className="w-4 h-4 text-white/40" />
                              <span className="text-[10px] font-mono text-white/40 uppercase font-black">Showing {filteredLedger.length} Records</span>
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 flex-grow">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="bg-white/10 text-white/40 text-[10px] font-mono uppercase tracking-widest border-b border-white/5">
                                  <th className="p-6">Client / Project</th>
                                  <th className="p-6">Status</th>
                                  <th className="p-6">Amount</th>
                                  <th className="p-6 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {filteredLedger.length === 0 ? (
                                  <tr>
                                    <td colSpan={4} className="p-20 text-center text-white/20 font-mono text-xs uppercase tracking-widest">No matching financial records.</td>
                                  </tr>
                                ) : filteredLedger.map(p => (
                                  <tr key={p.id} className="group hover:bg-white/5 transition-all">
                                    <td className="p-6">
                                      <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-brand-indigo transition-colors">
                                            <FileText className="w-5 h-5 text-white/40 group-hover:text-brand-indigo" />
                                         </div>
                                         <div>
                                            <p className="text-white font-black text-sm">{p.client_name}</p>
                                            <p className="text-white/20 text-[10px] font-mono uppercase tracking-tighter">{p.service_name} • {p.invoice_number}</p>
                                         </div>
                                      </div>
                                    </td>
                                    <td className="p-6">
                                      <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'paid' ? 'bg-brand-emerald' : p.status === 'cancelled' ? 'bg-brand-rose' : 'bg-brand-amber animate-pulse'}`}></div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${p.status === 'paid' ? 'text-brand-emerald' : p.status === 'cancelled' ? 'text-brand-rose' : 'text-brand-amber'}`}>
                                          {p.status}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-6">
                                      <p className="text-white font-mono text-sm font-black">{p.currency} {p.amount.toLocaleString()}</p>
                                      <p className="text-white/20 text-[9px] font-mono uppercase">{new Date(p.created_at).toLocaleDateString()}</p>
                                    </td>
                                    <td className="p-6 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <button 
                                          onClick={() => { setSelectedPayment(p); setView('details'); }}
                                          className="p-3 bg-white/5 text-white/40 hover:text-white rounded-xl transition-all"
                                          title="View Summary"
                                        >
                                          <ExternalLink className="w-4 h-4" />
                                        </button>
                                        <button 
                                          onClick={() => handleUpdatePaymentStatus(p.id!, 'paid')}
                                          disabled={p.status === 'paid' || actionLoading}
                                          className="p-3 bg-white/5 text-white/40 hover:text-brand-emerald rounded-xl transition-all disabled:opacity-0"
                                          title="Mark Paid"
                                        >
                                          <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* INBOX TAB */}
                  {activeTab === 'inbox' && (
                    <div className="space-y-8">
                      <h3 className="text-white font-black text-2xl tracking-tighter">Inquiries ({messages.filter(m => !m.is_read).length} Unread)</h3>
                      <div className="space-y-6">
                        {messages.length === 0 ? (
                           <div className="text-center py-20 text-white/20 font-mono text-xs uppercase tracking-widest">Zero Inquiries found.</div>
                        ) : messages.map(msg => (
                          <div key={msg.id} className={`p-8 rounded-[2.5rem] border transition-all relative overflow-hidden group ${msg.is_read ? 'bg-white/5 border-white/5 opacity-60' : 'bg-white/10 border-brand-indigo/30 shadow-lg shadow-brand-indigo/5'}`}>
                             <div className="flex justify-between items-start mb-6">
                               <div>
                                  <h4 className="text-white font-black text-xl">{msg.name}</h4>
                                  <p className="text-brand-indigo text-xs font-bold">{msg.email}</p>
                               </div>
                               <div className="flex items-center gap-4">
                                  <span className="text-[10px] font-mono text-white/20 uppercase font-black">{new Date(msg.created_at || '').toLocaleDateString()}</span>
                                  <button onClick={() => handleMarkRead(msg.id!)} className={`transition-all ${msg.is_read ? 'text-brand-emerald' : 'text-white/20 hover:text-brand-indigo'}`}>
                                    {msg.is_read ? <CheckCircle2 className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                  </button>
                               </div>
                             </div>
                             <p className="text-white/70 text-sm leading-relaxed mb-8 italic">"{msg.message}"</p>
                             <div className="flex gap-4">
                                <a href={`mailto:${msg.email}`} className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-indigo hover:text-white transition-all">Reply via Email</a>
                                <button 
                                  onClick={() => handleDeleteMessage(msg.id!)}
                                  className="px-6 py-2 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-rose hover:text-white transition-all"
                                >
                                  Purge
                                </button>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementModal;
