import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { PaymentRecord } from '../types';
import { initiatePayment } from '../services/flutterwave';
import SEO from '../components/SEO';
import jsPDF from 'jspdf';
import PayPalButton from '../components/PayPalButton';

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
  const [hasSearched, setHasSearched] = useState(false);
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
    // Reset coffee amount when currency changes to the first option
    setCoffeeAmount(coffeeOptions[0]);
  }, [currency]);

  useEffect(() => {
    const invParam = searchParams.get('inv') || searchParams.get('invoice');
    const emailParam = searchParams.get('email');

    if (invParam) {
      performLookup('invoice', invParam, true);
    } else if (emailParam) {
      performLookup('email', emailParam, true);
    } else {
      setShowLookupManual(true);
    }
  }, [searchParams]);

  const performLookup = async (type: 'invoice' | 'email', value: string, isAuto: boolean = false) => {
    if (!value.trim()) return;
    setIsSearching(true);
    setError('');
    if (!isAuto) setHasSearched(true);

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
      } else {
        if (isAuto) setShowLookupManual(false);
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

  const handleQuickPay = (type: 'consultation' | 'coffee', amount: number) => {
    if (currency === 'USD') {
      // Redirect to PayPal for USD Quick Pay to avoid Flutterwave NGN conversion confusion
      const desc = type === 'consultation' ? '60-Min Strategy Consultation' : 'Support for Saviour.dev';
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
    doc.setFillColor(12, 12, 12);
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
        title="Client Portal"
        description="View invoices, book consultations, or support Saviour's work."
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {invoices.length > 0 ? 'Review & Pay' : 'Client Payments'}
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          {invoices.length > 0 
            ? 'Verify the details below to complete your payment.' 
            : 'Find your invoice or choose a quick service below.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Pane: Invoice Lookup / Results */}
        <div className="lg:col-span-7 space-y-8">
          
          {isSearching && invoices.length === 0 && (
            <div className="bg-cosmic-900 border border-white/5 p-12 rounded-[2.5rem] animate-pulse">
              <div className="h-8 bg-white/5 rounded-full w-48 mb-6"></div>
              <div className="h-4 bg-white/5 rounded-full w-full mb-10"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-white/5 rounded-xl"></div>
                <div className="h-12 bg-white/5 rounded-xl"></div>
              </div>
            </div>
          )}

          {(showLookupManual || invoices.length === 0) && !isSearching && (
            <div className="bg-cosmic-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl animate-fade-in">
              <h2 className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-6">Find Your Invoice</h2>
              <div className="flex gap-4 mb-8 border-b border-white/5 pb-6">
                <button 
                  onClick={() => { setLookupType('invoice'); setLookupValue(''); setError(''); }}
                  className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${lookupType === 'invoice' ? 'bg-white text-black font-bold' : 'text-slate-500 hover:text-white'}`}
                >
                  Invoice #
                </button>
                <button 
                  onClick={() => { setLookupType('email'); setLookupValue(''); setError(''); }}
                  className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${lookupType === 'email' ? 'bg-white text-black font-bold' : 'text-slate-500 hover:text-white'}`}
                >
                  Billing Email
                </button>
              </div>

              <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type={lookupType === 'email' ? 'email' : 'text'}
                  required
                  value={lookupValue}
                  onChange={(e) => setLookupValue(e.target.value)}
                  placeholder={lookupType === 'invoice' ? "INV-2025-XXX" : "you@company.com"}
                  className="flex-grow bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neon-cyan outline-none transition-all placeholder:text-slate-600"
                />
                <button 
                  type="submit"
                  className="h-14 px-8 bg-white text-black font-bold rounded-2xl hover:bg-neon-cyan transition-all shadow-lg whitespace-nowrap"
                >
                  Continue
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-neon-ember/10 border border-neon-ember/20 text-neon-ember rounded-xl text-center text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {invoices.length > 0 && (
            <div className="space-y-6 animate-fade-in">
              {invoices.map((inv) => (
                <div key={inv.id} className="bg-cosmic-900 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${inv.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                          {inv.status}
                        </span>
                        <h2 className="text-2xl font-bold text-white mt-3">{inv.service_name}</h2>
                        <p className="text-slate-400 text-sm mt-1">{inv.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">{inv.currency === 'USD' ? '$' : '₦'} {inv.amount.toLocaleString()}</div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">Invoice {inv.invoice_number}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      {inv.status === 'pending' ? (
                        <>
                           <button 
                            onClick={() => handleQuickPay('consultation', inv.amount)} // Placeholder logic
                            className="flex-grow bg-white text-black font-bold py-4 rounded-xl hover:bg-neon-cyan transition-all flex items-center justify-center gap-2"
                          >
                            Checkout (Card)
                          </button>
                          {inv.currency === 'USD' && (
                            <a 
                              href={`https://paypal.me/sgukobong/${inv.amount}USD`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-grow py-4 border border-[#003087] text-[#003087] font-bold rounded-xl hover:bg-[#003087] hover:text-white transition-all text-center flex items-center justify-center"
                            >
                              PayPal
                            </a>
                          )}
                        </>
                      ) : (
                        <div className="flex-grow p-4 bg-green-500/5 border border-green-500/20 rounded-xl text-center text-green-500 font-bold">
                          Payment Confirmed
                        </div>
                      )}
                      <button 
                        onClick={() => downloadInvoice(inv)}
                        className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!showLookupManual && (
                <button onClick={() => setShowLookupManual(true)} className="text-[10px] font-mono uppercase tracking-widest text-slate-600 hover:text-white mx-auto block">
                  Search for another record
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Pane: Quick Payments & Support */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Currency Toggle */}
          <div className="bg-cosmic-900 border border-white/10 p-2 rounded-2xl flex items-center gap-1 shadow-inner">
             <button 
               onClick={() => setCurrency('USD')}
               className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${currency === 'USD' ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
             >
               USD ($)
             </button>
             <button 
               onClick={() => setCurrency('NGN')}
               className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${currency === 'NGN' ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
             >
               NGN (₦)
             </button>
          </div>

          {/* Consultation Card */}
          <div className="bg-cosmic-900 border border-white/10 p-8 rounded-[2.5rem] hover:border-neon-cyan/30 transition-all group">
            <div className="w-12 h-12 bg-neon-cyan/10 rounded-2xl flex items-center justify-center mb-6 text-neon-cyan group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Book a Consultation</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Need direct help with your EdTech strategy, Moodle setup, or AI integration? Book a 60-minute session.
            </p>
            <div className="flex items-end justify-between mb-6">
               <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Standard Rate</div>
                  <div className="text-3xl font-bold text-white">{symbol} {consultationRate.toLocaleString()}</div>
               </div>
               <button 
                onClick={() => handleQuickPay('consultation', consultationRate)}
                className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neon-cyan transition-all text-sm"
               >
                Pay & Book
               </button>
            </div>
          </div>

          {/* Coffee / Support Card */}
          <div className="bg-cosmic-900 border border-white/10 p-8 rounded-[2.5rem] hover:border-neon-ember/30 transition-all group">
            <div className="w-12 h-12 bg-neon-ember/10 rounded-2xl flex items-center justify-center mb-6 text-neon-ember group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.707 5.293L13.414 2H10.586L7.293 5.293A1 1 0 007 6v10a2 2 0 002 2h6a2 2 0 002-2V6a1 1 0 00-.293-.707zM12 18V6" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Support My Work</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              I spend hundreds of hours building tools like the <Link to="/now" className="text-neon-cyan hover:underline font-medium">Free School for Africa</Link>. Consider buying me a coffee to keep the servers running.
            </p>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {coffeeOptions.map((amt) => (
                <button 
                  key={amt}
                  onClick={() => setCoffeeAmount(amt)}
                  className={`py-2 rounded-lg text-xs font-mono transition-all border ${coffeeAmount === amt ? 'bg-neon-ember border-neon-ember text-black font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}
                >
                  {symbol}{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
               <input 
                 type="number"
                 placeholder="Custom"
                 value={coffeeAmount}
                 onChange={(e) => setCoffeeAmount(Number(e.target.value))}
                 className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-neon-ember outline-none"
               />
               <button 
                onClick={() => handleQuickPay('coffee', coffeeAmount)}
                className="px-6 py-3 bg-neon-ember text-black font-bold rounded-xl hover:bg-white transition-all text-sm shadow-[0_0_20px_rgba(255,107,61,0.2)]"
               >
                Support
               </button>
            </div>
          </div>

          <div className="p-6 border border-white/5 bg-white/[0.02] rounded-3xl text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              Payments are processed via PayPal for USD or Flutterwave for NGN. Secure, fast, and frictionless.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientPortal;