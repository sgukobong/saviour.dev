import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { PaymentRecord } from '../types';
import { Link } from 'react-router-dom';

const AdminPayments: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchPayments();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchPayments();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setPayments(data as PaymentRecord[]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
  };

  const totalRevenueNGN = payments
    .filter(p => p.status === 'paid' && p.currency === 'NGN')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalRevenueUSD = payments
    .filter(p => p.status === 'paid' && p.currency === 'USD')
    .reduce((sum, p) => sum + p.amount, 0);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-cosmic-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neon-cyan transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-4">
      <div className="flex justify-between items-center mb-10">
        <div>
           <h1 className="text-3xl font-bold">Financials</h1>
           <div className="flex gap-4 mt-4">
             <Link to="/admin/posts" className="text-sm text-slate-400 hover:text-white">Content Admin</Link>
             <span className="text-slate-600">|</span>
             <span className="text-sm text-neon-cyan">Payments Admin</span>
           </div>
        </div>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="text-sm text-slate-400 hover:text-white border border-white/10 px-4 py-2 rounded-full transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-cosmic-900 border border-white/10 p-6 rounded-2xl">
           <h3 className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-2">Total Revenue (NGN)</h3>
           <div className="text-3xl font-bold text-white">₦ {totalRevenueNGN.toLocaleString()}</div>
        </div>
        <div className="bg-cosmic-900 border border-white/10 p-6 rounded-2xl">
           <h3 className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-2">Total Revenue (USD)</h3>
           <div className="text-3xl font-bold text-neon-cyan">$ {totalRevenueUSD.toLocaleString()}</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-cosmic-900/50 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-xs text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
                <th className="p-4">Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Service</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Invoice #</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 text-sm whitespace-nowrap">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-white font-medium">
                    <div>{p.client_name}</div>
                    <div className="text-xs text-slate-500">{p.client_email}</div>
                  </td>
                  <td className="p-4 text-slate-300 text-sm">{p.service_name}</td>
                  <td className="p-4 text-white font-mono">
                    {p.currency} {p.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      p.status === 'paid' 
                        ? 'bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20' 
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {p.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-500 font-mono">{p.invoice_number}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;