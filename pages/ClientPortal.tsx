import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { PaymentRecord } from '../types';
import { initiatePayment } from '../services/flutterwave';
import PayPalButton from '../components/PayPalButton';
import SEO from '../components/SEO';
import jsPDF from 'jspdf';
import { Coffee, Video, FileText, Search, ArrowRight, ShieldCheck, CheckCircle2, Globe, Zap } from 'lucide-react';

const MOCK_DATA: PaymentRecord[] = [
  {
    id: 'demo-1',
    client_name: 'Demo Client',
    client_email: 'demo@example.com',
    service_name: 'AI Strategy Consultation',
    description: 'Quarterly strategy session for offline-first architecture.',
    amount: 250,
    currency: 'USD',
    invoice_number: 'INV-2025-014',
    status: 'pending',
    created_at: new Date().toISOString()
  }
];

const ClientPortal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [lookupValue, setLookupValue] = useState('');
  const [lookupType, setLookupType] = useState<'invoice' | 'email'>('invoice');
  const [invoices, setInvoices] = useState<PaymentRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true); 
  const [error, setError] = useState('');
  const [showLookupManual, setShowLookupManual] = useState(false);

  // Global Currency State
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [coffeeAmount, setCoffeeAmount] = useState<number>(5);
  const [isPayingQuick, setIsPayingQuick] = useState(false);

  // Constants based on currency
  const consultationRate = currency === 'USD' ? 50 : 50000;
  const coffeeOptions = currency === 'USD' ? [5, 15, 25] : [5000, 15000, 25000];
  const symbol = currency === 'USD' ? '$' : '₦';

  useEffect(() => {
    setCoffeeAmount(coffeeOptions[0]);
  }, [currency]);

  useEffect(() => {
    const invParam = searchParams.get('inv') || searchParams.get('invoice');
    const emailParam = searchParams.get('email');

    if (invParam) {
      performLookup('invoice', invParam, true);
    } else if (emailParam) {
      performLookup('email', emailParam, true);
    }
  }, [searchParams]);

  const performLookup = async (type: 'invoice' | 'email', value: string, isAuto: boolean = false) => {
    if (!value.trim()) return;
    setIsSearching(true);
    setError('');
    
    try {
      const normalizedValue = value.trim().toLowerCase();
      if (normalizedValue === 'inv-2025-014' || normalizedValue === 'demo@example.com') {
        setTimeout(() => {
          setInvoices(MOCK_DATA);
          setIsSearching(false);
          if (isAuto) setShowLookupManual(false);
        }, 600);
        return;
      }

      const queryField = type === 'invoice' ? 'invoice_number' : 'client_email';
      const { data, error: supabaseError } = await supabase
        .from('payments')
        .select('*')
        .eq(queryField, value.trim())
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setInvoices(data || []);
      
      if (!data || data.length === 0) {
        setError(type === 'invoice' ? "We couldn't find that invoice number." : "No invoices found for this email address.");
        setShowLookupManual(true);
      }
    } catch (err: any) {
      console.error(err);
      setError("Unable to retrieve records. Please try a manual search.");
      setShowLookupManual(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(lookupType, lookupValue);
  };

  const handleFlutterwavePay = (invoice: PaymentRecord) => {
    setIsPayingQuick(true);
    initiatePayment(
      {
        tx_ref: invoice.invoice_number + '-' + Date.now(),
        amount: invoice.amount,
        currency: invoice.currency,
        description: invoice.service_name,
        customer: {
          email: invoice.client_email,
          name: invoice.client_name,
        },
      },
      async (data: any) => {
        if (data.status === 'successful') {
           await supabase.from('payments').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', invoice.id);
           performLookup('invoice', invoice.invoice_number, true);
        }
        setIsPayingQuick(false);
      }
    );
  };

  const handleQuickPay = (type: 'consultation' | 'coffee', amount: number) => {
    if (currency === 'USD') {
      window.open(`https://paypal.me/sgukobong/${amount}USD`, '_blank');
      return;
    }

    const description = type === 'consultation' ? '60-Min Strategy Consultation' : 'Support for Saviour.dev / Free School Africa';
    setIsPayingQuick(true);
    
    initiatePayment(
      {
        tx_ref: `QUICK-${type.toUpperCase()}-${Date.now()}`,
        amount,
        currency: 'NGN',
        description,
        customer: {
          email: 'support@saviour.dev',
          name: 'Direct Client',
        },
      },
      (data: any) => {
        if (data.status === 'successful') {
          alert(`Thank you! Your ${type} payment was successful.`);
          if (type === 'consultation') {
            window.open('https://calendly.com/sgukobong', '_blank');
          }
        }
        setIsPayingQuick(false);
      },
      () => setIsPayingQuick(false)
    );
  };

  const downloadInvoice = (invoice: PaymentRecord) => {
    const doc = new jsPDF();
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(invoice.status === 'paid' ? 'RECEIPT' : 'INVOICE', 150, 25);
    doc.setFontSize(14);
    doc.text('Saviour Ukobong', 20, 25);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoice.invoice_number}`, 150, 55);
    doc.text(`Date: ${new Date(invoice.created_at).toLocaleDateString()}`, 150, 60);
    doc.text('Bill To:', 20, 55);
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.client_name, 20, 62);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.client_email, 20, 68);
    doc.line(20, 80, 190, 80);
    doc.text('DESCRIPTION', 20, 90);
    doc.text('AMOUNT', 160, 90);
    doc.setFontSize(12);
    doc.text(invoice.service_name, 20, 100);
    doc.text(`${invoice.currency} ${invoice.amount.toLocaleString()}`, 160, 100);
    doc.line(20, 140, 190, 140);
    doc.text('TOTAL:', 130, 155);
    doc.text(`${invoice.currency} ${invoice.amount.toLocaleString()}`, 160, 155);
    doc.save(`${invoice.status === 'paid' ? 'Receipt' : 'Invoice'}_${invoice.invoice_number}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto pt-10 px-4 pb-20">
      <SEO 
        title="Services & Client Portal"
        description="Book a consultation, support my work, or manage your invoices directly through the portal."
      />

      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-indigo mb-6 block font-bold">● Client Services</span>
          <h1 className="text-section-title leading-tight text-black">
            {invoices.length > 0 ? (
              <>Billing <span className="text-brand-indigo">Studio</span></>
            ) : (
              <>Work With <span className="italic font-serif text-brand-indigo">Me</span></>
            )}
          </h1>
          <p className="text-slate-800 text-xl font-medium mt-6 leading-relaxed">
            Direct access to consulting, strategic advice, and administrative tools for ongoing projects.
          </p>
        </div>
        
        <div className="bg-white border-2 border-black/5 p-1.5 rounded-full flex items-center shadow-xl shadow-brand-indigo/5">
             <button 
               onClick={() => setCurrency('USD')}
               className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currency === 'USD' ? 'bg-brand-indigo text-white shadow-lg' : 'text-slate-500 hover:text-black'}`}
             >
               USD ($)
             </button>
             <button 
               onClick={() => setCurrency('NGN')}
               className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currency === 'NGN' ? 'bg-brand-indigo text-white shadow-lg' : 'text-slate-500 hover:text-black'}`}
             >
               NGN (₦)
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-8 space-y-12">
          
          {!showLookupManual && invoices.length === 0 && !isSearching && (
            <div 
              onClick={() => setShowLookupManual(true)}
              className="group cursor-pointer p-10 rounded-[3rem] bg-brand-indigo/5 border-2 border-dashed border-brand-indigo/20 flex items-center justify-between hover:border-brand-indigo/40 hover:bg-brand-indigo/10 transition-all"
            >
               <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-brand-indigo/10 shadow-sm group-hover:scale-110 transition-transform">
                     <Search className="w-7 h-7 text-brand-indigo" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-black">Returning Client?</h3>
                    <p className="text-slate-700 font-medium">Search for your invoice or billing history.</p>
                  </div>
               </div>
               <ArrowRight className="w-8 h-8 text-brand-indigo group-hover:translate-x-2 transition-all" />
            </div>
          )}

          {(showLookupManual || isSearching) && invoices.length === 0 && (
             <div className="bg-white border border-brand-indigo/10 p-12 rounded-[3.5rem] shadow-2xl shadow-brand-indigo/5 animate-fade-in">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xs font-mono text-brand-indigo uppercase tracking-widest font-black flex items-center gap-3">
                        <Search className="w-5 h-5" /> Invoice Search
                    </h2>
                    <button onClick={() => setShowLookupManual(false)} className="text-[10px] font-mono text-slate-400 hover:text-brand-indigo uppercase tracking-widest font-bold border-b border-transparent hover:border-brand-indigo transition-all">Cancel Search</button>
                </div>

                <div className="flex gap-4 mb-10 bg-slate-50 p-2 rounded-2xl w-fit">
                    <button 
                        onClick={() => { setLookupType('invoice'); setLookupValue(''); setError(''); }}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${lookupType === 'invoice' ? 'bg-brand-indigo text-white shadow-md' : 'text-slate-500 hover:text-brand-indigo'}`}
                    >
                        Invoice Number
                    </button>
                    <button 
                        onClick={() => { setLookupType('email'); setLookupValue(''); setError(''); }}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${lookupType === 'email' ? 'bg-brand-indigo text-white shadow-md' : 'text-slate-500 hover:text-brand-indigo'}`}
                    >
                        Client Email
                    </button>
                </div>

                <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input 
                        type={lookupType === 'email' ? 'email' : 'text'}
                        required
                        value={lookupValue}
                        onChange={(e) => setLookupValue(e.target.value)}
                        placeholder={lookupType === 'invoice' ? "INV-2025-XXX" : "you@company.com"}
                        className="flex-grow bg-slate-50 border-2 border-black/5 rounded-2xl px-8 py-5 text-black font-bold focus:border-brand-indigo focus:bg-white outline-none transition-all placeholder:text-slate-400"
                    />
                    <button 
                        type="submit"
                        disabled={isSearching}
                        className="h-16 px-10 bg-black text-white font-black rounded-2xl hover:bg-brand-indigo transition-all shadow-xl whitespace-nowrap flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isSearching ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Retrieve Records'}
                    </button>
                </form>

                {error && (
                    <div className="mt-8 p-6 bg-brand-rose/5 border border-brand-rose/20 text-brand-rose rounded-2xl text-center text-sm font-black animate-shake">
                    {error}
                    </div>
                )}
             </div>
          )}

          {invoices.length > 0 && (
            <div className="space-y-12 animate-fade-in">
              {invoices.map((inv) => (
                <div key={inv.id} className="bg-white border border-brand-indigo/10 p-12 rounded-[3.5rem] shadow-xl shadow-brand-indigo/5 relative group">
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-8">
                            <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${inv.status === 'paid' ? 'bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20' : 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20 shadow-sm animate-pulse'}`}>
                                {inv.status === 'paid' ? 'Paid & Logged' : 'Awaiting Payment'}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">INV #{inv.invoice_number}</span>
                        </div>
                        <h2 className="text-4xl font-black text-black leading-tight tracking-tight group-hover:text-brand-indigo transition-colors">{inv.service_name}</h2>
                        <p className="text-slate-700 text-xl mt-4 leading-relaxed font-medium">{inv.description}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-5xl md:text-6xl font-black text-brand-indigo tracking-tighter mb-2">{inv.currency === 'USD' ? '$' : '₦'}{inv.amount.toLocaleString()}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{inv.currency} Final Balance</div>
                      </div>
                    </div>
                    
                    {inv.status === 'pending' ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t-2 border-black/5">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-indigo/5 flex items-center justify-center border border-brand-indigo/10">
                                    <ShieldCheck className="w-4 h-4 text-brand-indigo" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Card & Bank Transfer</span>
                            </div>
                            <button 
                                onClick={() => handleFlutterwavePay(inv)}
                                className="w-full py-6 bg-black text-white font-black rounded-3xl hover:bg-brand-indigo transition-all flex items-center justify-center gap-4 shadow-xl shadow-brand-indigo/10 group/btn"
                            >
                                Pay via Card <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-violet/5 flex items-center justify-center border border-brand-violet/10">
                                    <Globe className="w-4 h-4 text-brand-violet" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">International Clients</span>
                            </div>
                            <PayPalButton 
                                amount={inv.amount} 
                                currency={inv.currency} 
                                className="!p-0 border-none shadow-none" 
                            />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow py-6 px-10 bg-brand-emerald/5 border-2 border-brand-emerald/10 rounded-[2rem] text-center text-brand-emerald font-black flex items-center justify-center gap-4">
                          <CheckCircle2 className="w-6 h-6" /> Transaction Cleared on {new Date(inv.paid_at || "").toLocaleDateString()}
                        </div>
                        <button 
                          onClick={() => downloadInvoice(inv)}
                          className="py-6 px-10 bg-white border-2 border-black/10 rounded-[2rem] text-black font-black hover:border-brand-indigo transition-all flex items-center justify-center gap-4 shadow-sm"
                        >
                          <FileText className="w-6 h-6" /> Download Receipt
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                 <button onClick={() => { setInvoices([]); setShowLookupManual(true); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand-indigo transition-colors border-b-2 border-transparent hover:border-brand-indigo pb-2">
                    Search Another Invoice
                 </button>
              </div>
            </div>
          )}

          {invoices.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {/* Consultation */}
                 <div className="service-card p-12 rounded-[3.5rem] bg-white border border-brand-indigo/10 group hover:border-brand-indigo shadow-sm hover:shadow-2xl hover:shadow-brand-indigo/5 transition-all duration-500">
                    <div className="w-20 h-20 bg-brand-indigo/5 border border-brand-indigo/10 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-brand-indigo group-hover:text-white transition-all duration-700">
                        <Video className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:text-brand-indigo transition-colors">60-Min Strategy</h3>
                    <p className="text-slate-800 font-medium mb-12 text-lg leading-relaxed">
                        Direct session for EdTech startups, LMS architecture review, or cloud implementation strategy.
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-10 border-t border-black/5">
                        <div className="text-4xl font-black tracking-tighter text-brand-indigo">{symbol}{consultationRate.toLocaleString()}</div>
                        <button 
                            onClick={() => handleQuickPay('consultation', consultationRate)}
                            className="px-8 py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-indigo transition-all shadow-xl shadow-brand-indigo/10"
                        >
                            Book Call
                        </button>
                    </div>
                 </div>

                 {/* Support */}
                 <div className="service-card p-12 rounded-[3.5rem] bg-white border border-brand-amber/10 group hover:border-brand-amber shadow-sm hover:shadow-2xl hover:shadow-brand-amber/5 transition-all duration-500">
                    <div className="w-20 h-20 bg-brand-amber/5 border border-brand-amber/10 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-brand-amber group-hover:text-white transition-all duration-700">
                        <Coffee className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:text-brand-amber transition-colors">Fuel The Mission</h3>
                    <p className="text-slate-800 font-medium mb-12 text-lg leading-relaxed">
                        Support ongoing development for the <span className="text-brand-indigo font-black">Free School for Africa.</span> Your contribution enables offline learning.
                    </p>
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-3 gap-3">
                             {coffeeOptions.map(amt => (
                                 <button 
                                    key={amt} 
                                    onClick={() => setCoffeeAmount(amt)}
                                    className={`py-3 text-[10px] font-black border-2 rounded-xl transition-all ${coffeeAmount === amt ? 'bg-brand-amber text-white border-brand-amber shadow-lg' : 'bg-transparent border-black/5 text-slate-400 hover:border-brand-amber/40 hover:text-brand-amber'}`}
                                 >
                                     {symbol}{amt.toLocaleString()}
                                 </button>
                             ))}
                        </div>
                        <button 
                            onClick={() => handleQuickPay('coffee', coffeeAmount)}
                            className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-amber transition-all shadow-xl shadow-brand-amber/10 flex items-center justify-center gap-3"
                        >
                            Support Project <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                 </div>
              </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-10">
            <div className="p-12 rounded-[3.5rem] bg-black text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-violet/30 transition-colors duration-1000"></div>
                <h4 className="text-xs font-mono uppercase tracking-[0.5em] mb-12 text-white/40 font-black">Global Standards</h4>
                <ul className="space-y-8">
                    {[
                        { text: 'Secured SSL Transactions', icon: <ShieldCheck className="w-4 h-4" />, color: 'text-brand-emerald' },
                        { text: 'Instant Digital Receipts', icon: <FileText className="w-4 h-4" />, color: 'text-brand-indigo' },
                        { text: 'Multi-Currency Support', icon: <Globe className="w-4 h-4" />, color: 'text-brand-violet' }
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 group/item">
                            <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 transition-all group-hover/item:bg-white ${item.color}`}>
                                {item.icon}
                            </div>
                            <span className="text-sm font-bold tracking-tight">{item.text}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-16 pt-10 border-t border-white/10">
                    <p className="text-[10px] text-white/30 leading-relaxed font-black uppercase tracking-widest italic">
                        All payments are processed via <span className="text-white/60">Flutterwave</span> or <span className="text-white/60">PayPal</span>. No financial data is stored locally.
                    </p>
                </div>
            </div>

            <div className="p-12 rounded-[3.5rem] bg-slate-50 border border-black/5 hover:border-brand-indigo/30 transition-colors group">
                <h4 className="text-xs font-mono uppercase tracking-[0.3em] mb-6 text-slate-400 font-black group-hover:text-brand-indigo transition-colors">Project Inquiries</h4>
                <p className="text-slate-800 text-lg font-black leading-relaxed mb-8 tracking-tight">
                    Custom builds or enterprise infrastructure?
                </p>
                <Link to="/contact" className="inline-flex items-center gap-3 text-xs font-black text-brand-indigo underline underline-offset-8 decoration-brand-indigo/30 decoration-2 hover:decoration-brand-indigo transition-all uppercase tracking-widest">
                    Start a project <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;