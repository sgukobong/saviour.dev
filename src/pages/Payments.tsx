import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { PaymentRecord } from '../types';
import { initiatePayment } from '../services/flutterwave';
import PayPalButton from '../components/PayPalButton';
import jsPDF from 'jspdf';

const Payments: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    client_name: '',
    client_email: '',
    service_name: '',
    description: '',
    amount: '',
    currency: 'USD' as 'NGN' | 'USD',
  });
  const [status, setStatus] = useState<'idle' | 'generating' | 'ready_to_pay' | 'success' | 'failed'>('idle');
  const [paymentRecord, setPaymentRecord] = useState<PaymentRecord | null>(null);

  useEffect(() => {
    const params = {
      client_name: searchParams.get('client_name') || '',
      client_email: searchParams.get('client_email') || '',
      service_name: searchParams.get('service_name') || '',
      description: searchParams.get('description') || '',
      amount: searchParams.get('amount') || '',
      currency: (searchParams.get('currency') as 'NGN' | 'USD') || 'USD',
    };

    if (params.service_name || params.amount || params.client_name) {
      setForm(prev => ({ ...prev, ...params }));
    }
  }, [searchParams]);

  const generateInvoiceNumber = () => {
    const date = new Date();
    const prefix = 'INV';
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}${random}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('generating');

    try {
      let data: PaymentRecord | null = null;
      let error = null;

      if (paymentRecord) {
         const res = await supabase
          .from('payments')
          .update({
            client_name: form.client_name,
            client_email: form.client_email,
            service_name: form.service_name,
            description: form.description,
            amount: parseFloat(form.amount),
            currency: form.currency,
          })
          .eq('id', paymentRecord.id)
          .select()
          .single();
         data = res.data as PaymentRecord;
         error = res.error;
      } else {
        const invNum = generateInvoiceNumber();
        const newPayment = {
            client_name: form.client_name,
            client_email: form.client_email,
            service_name: form.service_name,
            description: form.description,
            amount: parseFloat(form.amount),
            currency: form.currency,
            invoice_number: invNum,
            status: 'pending',
        };
        const res = await supabase.from('payments').insert([newPayment]).select().single();
        data = res.data as PaymentRecord;
        error = res.error;
      }

      if (error) throw error;

      setPaymentRecord(data);
      setStatus('ready_to_pay');
    } catch (err: any) {
      console.error(err);
      alert('Failed to generate record. Please check your Supabase connection.');
      setStatus('idle');
    }
  };

  const handleEdit = () => {
    setStatus('idle');
  };

  const handleCopyPortalLink = () => {
    if (!paymentRecord) return;
    const url = `${window.location.origin}/#/portal?inv=${paymentRecord.invoice_number}`;
    navigator.clipboard.writeText(url);
    alert('Direct Payment Portal Link copied! Send this to the client for frictionless checkout.');
  };

  const handleReset = () => {
    setPaymentRecord(null);
    setForm({
        client_name: '',
        client_email: '',
        service_name: '',
        description: '',
        amount: '',
        currency: 'USD',
    });
    setStatus('idle');
  };

  const handleDownloadPDF = () => {
    if (!paymentRecord) return;
    const doc = new jsPDF();
    doc.setFillColor(12, 12, 12);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('INVOICE', 160, 25);
    doc.setFontSize(14);
    doc.text('Saviour Ukobong', 20, 25);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Invoice #: ${paymentRecord.invoice_number}`, 160, 55);
    doc.text(`Date: ${new Date(paymentRecord.created_at).toLocaleDateString()}`, 160, 60);
    doc.text('Bill To:', 20, 55);
    doc.setFont('helvetica', 'bold');
    doc.text(paymentRecord.client_name, 20, 62);
    doc.setFont('helvetica', 'normal');
    doc.text(paymentRecord.client_email, 20, 68);
    doc.line(20, 80, 190, 80);
    doc.text('DESCRIPTION', 20, 90);
    doc.text('AMOUNT', 160, 90);
    doc.setFontSize(12);
    doc.text(paymentRecord.service_name, 20, 100);
    doc.text(`${paymentRecord.currency} ${paymentRecord.amount.toLocaleString()}`, 160, 100);
    doc.line(20, 140, 190, 140);
    doc.text('TOTAL:', 130, 155);
    doc.text(`${paymentRecord.currency} ${paymentRecord.amount.toLocaleString()}`, 160, 155);
    doc.save(`Invoice_${paymentRecord.invoice_number}.pdf`);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden pt-10 px-4">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Invoicing System</h1>
        <p className="text-slate-400 text-center mb-12">Create a payment record to share with your client.</p>

        {status === 'success' && (
          <div className="mb-8 p-6 bg-neon-cyan/10 border border-neon-cyan rounded-2xl flex flex-col items-center text-center animate-fade-in">
            <div className="w-12 h-12 bg-neon-cyan text-black rounded-full flex items-center justify-center mb-4">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Payment Logged</h3>
            <p className="text-slate-300">Invoice {paymentRecord?.invoice_number} has been settled.</p>
            <div className="flex gap-4 mt-6">
                <button onClick={handleDownloadPDF} className="text-neon-cyan underline hover:text-white transition-colors">Download Receipt</button>
                <button onClick={handleReset} className="text-slate-400 hover:text-white transition-colors">Generate New</button>
            </div>
          </div>
        )}

        {status === 'idle' || status === 'generating' ? (
          <div className="bg-cosmic-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
            <form onSubmit={handleGenerateInvoice} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Client Name</label>
                  <input type="text" name="client_name" required value={form.client_name} onChange={handleChange} className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors" placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Client Email</label>
                  <input type="email" name="client_email" required value={form.client_email} onChange={handleChange} className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors" placeholder="email@client.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Service Name</label>
                <input type="text" name="service_name" required value={form.service_name} onChange={handleChange} className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors" placeholder="e.g. Website Audit" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Amount</label>
                   <input type="number" name="amount" required value={form.amount} onChange={handleChange} className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors" placeholder="0.00" />
                </div>
                <div>
                   <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Currency</label>
                   <select name="currency" value={form.currency} onChange={handleChange} className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors appearance-none">
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={status === 'generating'} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neon-cyan transition-all shadow-lg mt-4 disabled:opacity-50">
                {status === 'generating' ? 'Syncing...' : 'Save & Prepare Invoice'}
              </button>
            </form>
          </div>
        ) : null}

        {status === 'ready_to_pay' && paymentRecord && (
           <div className="space-y-6 animate-fade-in">
             <div className="bg-cosmic-900 border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col gap-6">
                <div className="flex justify-between items-start border-b border-white/5 pb-6">
                   <div>
                      <h2 className="text-xl font-bold">{paymentRecord.service_name}</h2>
                      <p className="text-slate-500 text-sm">Invoice #{paymentRecord.invoice_number}</p>
                   </div>
                   <div className="text-right">
                      <div className="text-2xl font-bold text-neon-cyan">{paymentRecord.currency === 'USD' ? '$' : '₦'} {paymentRecord.amount.toLocaleString()}</div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <button onClick={handleCopyPortalLink} className="py-3 px-6 rounded-xl bg-neon-cyan text-black font-bold hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                      Copy Direct Link
                   </button>
                   <button onClick={handleDownloadPDF} className="py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 text-white transition-all flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Get PDF
                   </button>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <PayPalButton amount={paymentRecord.amount} currency={paymentRecord.currency} />
                </div>
             </div>

             <div className="flex justify-center gap-4">
                <button onClick={handleEdit} className="text-sm text-slate-500 hover:text-white">Edit Details</button>
                <span className="text-slate-700">|</span>
                <button onClick={handleReset} className="text-sm text-slate-500 hover:text-white">Start Over</button>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Payments;