import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { PaymentRecord } from '../types';

const ClientPortal: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [invoices, setInvoices] = useState<PaymentRecord[]>([]);
  const [viewState, setViewState] = useState<'login' | 'dashboard'>('login');

  // Check auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
          setViewState('dashboard');
          fetchClientData(session.user.email);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
          setViewState('dashboard');
          fetchClientData(session.user.email);
      } else {
          setViewState('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchClientData = async (userEmail: string | undefined) => {
      if (!userEmail) return;
      const { data } = await supabase
        .from('payments')
        .select('*')
        .eq('client_email', userEmail)
        .order('created_at', { ascending: false });
      
      if (data) setInvoices(data as PaymentRecord[]);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');
      
      const { error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
              emailRedirectTo: window.location.href, // Redirect back here
          },
      });

      setLoading(false);
      if (error) {
          setMessage('Error: ' + error.message);
      } else {
          setMessage('Check your email for the login link!');
      }
  };

  const handleSignOut = async () => {
      await supabase.auth.signOut();
  };

  if (viewState === 'login') {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
              <div className="w-full max-w-md bg-cosmic-900/80 border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-[40px]"></div>
                  
                  <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
                  <p className="text-slate-400 mb-8">Access your project invoices and documents securely.</p>

                  {message ? (
                      <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded-xl text-center mb-6">
                          {message}
                      </div>
                  ) : (
                      <form onSubmit={handleMagicLink} className="space-y-4">
                          <div>
                              <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Email Address</label>
                              <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors"
                                placeholder="you@company.com"
                              />
                          </div>
                          <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-neon-cyan transition-colors disabled:opacity-50"
                          >
                             {loading ? 'Sending Link...' : 'Send Magic Link'}
                          </button>
                      </form>
                  )}
              </div>
          </div>
      );
  }

  // Dashboard View
  return (
      <div className="max-w-5xl mx-auto pt-4">
          <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
              <div>
                  <h1 className="text-3xl font-bold">Welcome Back</h1>
                  <p className="text-slate-400 mt-1">{session?.user?.email}</p>
              </div>
              <button onClick={handleSignOut} className="text-sm text-slate-500 hover:text-white">Sign Out</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sidebar / Stats */}
              <div className="space-y-6">
                  <div className="bg-cosmic-900 border border-white/10 p-6 rounded-2xl">
                      <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Open Invoices</h3>
                      <div className="text-3xl font-bold text-white">
                          {invoices.filter(i => i.status === 'pending').length}
                      </div>
                  </div>
                  <div className="bg-neon-cyan/5 border border-neon-cyan/20 p-6 rounded-2xl">
                      <h3 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-2">Need Help?</h3>
                      <p className="text-sm text-slate-300 mb-4">Have questions about a project or billing?</p>
                      <a href="mailto:sgukobong@gmail.com" className="text-sm font-bold text-white hover:underline">Contact Support &rarr;</a>
                  </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-6">Your Invoices</h2>
                  
                  {invoices.length === 0 ? (
                      <div className="text-center py-12 border border-white/5 border-dashed rounded-2xl text-slate-500">
                          No invoices found for this account.
                      </div>
                  ) : (
                      <div className="space-y-4">
                          {invoices.map(inv => (
                              <div key={inv.id} className="bg-cosmic-900/50 border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-colors">
                                  <div>
                                      <div className="flex items-center gap-3 mb-1">
                                          <span className="font-bold text-white">{inv.service_name}</span>
                                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                              inv.status === 'paid' ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-yellow-500/20 text-yellow-500'
                                          }`}>
                                              {inv.status}
                                          </span>
                                      </div>
                                      <div className="text-sm text-slate-400">INV: {inv.invoice_number} • {new Date(inv.created_at).toLocaleDateString()}</div>
                                  </div>

                                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                      <div className="text-right">
                                          <div className="font-mono text-white">{inv.currency} {inv.amount.toLocaleString()}</div>
                                      </div>
                                      {inv.status === 'pending' && (
                                          <a 
                                            href={`/#/pay?invoice=${inv.invoice_number}&amount=${inv.amount}&service_name=${encodeURIComponent(inv.service_name)}&client_email=${inv.client_email}`}
                                            className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-neon-cyan transition-colors"
                                          >
                                              Pay Now
                                          </a>
                                      )}
                                      {inv.status === 'paid' && (
                                          <button className="text-slate-500 text-xs hover:text-white flex items-center gap-1">
                                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                              Receipt
                                          </button>
                                      )}
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

export default ClientPortal;