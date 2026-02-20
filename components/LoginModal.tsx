
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { X, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      onSuccess();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-[0_25px_100px_rgba(79,70,229,0.25)] border border-brand-indigo/10 animate-fade-in-up">
        <div className="bg-brand-indigo p-10 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 mb-8">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter">Client Hub</h2>
          <p className="text-white/60 text-sm mt-2 font-medium">Access your workflow & communication log.</p>
        </div>

        <div className="p-10">
          {error && (
            <div className="mb-8 p-4 bg-brand-rose/5 border border-brand-rose/10 text-brand-rose text-xs font-black rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-8 py-4 text-black font-bold focus:border-brand-indigo outline-none transition-all"
                  placeholder="client@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-8 py-4 text-black font-bold focus:border-brand-indigo outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-indigo transition-all shadow-xl shadow-brand-indigo/10 flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {loading ? 'Validating...' : <>Enter Dashboard <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed px-4">
              Membership is currently invitation-only for active clients. Contact Saviour for access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
