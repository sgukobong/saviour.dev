import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { PaymentRecord } from '../types';
import { initiatePayment } from '../services/flutterwave';
import jsPDF from 'jspdf';

const Payments: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    client_name: '',
    client_email: '',
    service_name: '',
    description: '',
    amount: '',
    currency: 'NGN' as 'NGN' | 'USD',
  });
  const [status, setStatus] = useState<'idle' | 'generating' | 'ready_to_pay' | 'success' | 'failed'>('idle');
  const [paymentRecord, setPaymentRecord] = useState<PaymentRecord | null>(null);

  // Handle "Payment Links" - Pre-fill form from URL
  useEffect(() => {
    const params = {
      client_name: searchParams.get('client_name') || '',
      client_email: searchParams.get('client_email') || '',
      service_name: searchParams.get('service_name') || '',
      description: searchParams.get('description') || '',
      amount: searchParams.get('amount') || '',
      currency: (searchParams.get('currency') as 'NGN' | 'USD') || 'NGN',
    };

    // Only update if there are actual params to avoid overwriting user typing if re-renders occur
    if (params.service_name || params.amount || params.client_name) {
      setForm(prev => ({ ...prev, ...params }));
    }
  }, [searchParams]);

  const generateInvoiceNumber = () => {
    const date = new Date();
    const prefix = 'SU-INV';
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}-${random}`;
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
         // Update existing record if user clicked 'Edit' then 'Generate' again
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
        // Insert new record
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
      alert('Failed to generate invoice. Please check your connection.');
      setStatus('idle');
    }
  };

  const handleEdit = () => {
    setStatus('idle');
  };

  const handleCopyLink = () => {
    const params = new URLSearchParams({
        client_name: form.client_name,
        client_email: form.client_email,
        service_name: form.service_name,
        description: form.description,
        amount: form.amount,
        currency: form.currency
    });
    const url = `${window.location.origin}/#/pay?${params.toString()}`;
    navigator.clipboard.writeText(url);
    alert('Smart Payment Link copied to clipboard! You can send this to the client.');
  };

  const handleReset = () => {
    setPaymentRecord(null);
    setForm({
        client_name: '',
        client_email: '',
        service_name: '',
        description: '',
        amount: '',
        currency: 'NGN',
    });
    setStatus('idle');
  };

  const handleDownloadPDF = () => {
    if (!paymentRecord) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(12, 12, 12); // #0c0c0c
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('INVOICE', 160, 25);
    doc.setFontSize(14);
    doc.text('Saviour Ukobong', 20, 25);

    // Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Invoice #: ${paymentRecord.invoice_number}`, 160, 55);
    doc.text(`Date: ${new Date(paymentRecord.created_at).toLocaleDateString()}`, 160, 60);

    doc.text('Bill To:', 20, 55);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(paymentRecord.client_name, 20, 62);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(paymentRecord.client_email, 20, 68);

    // Line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 80, 190, 80);

    // Item Details
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('DESCRIPTION', 20, 90);
    doc.text('AMOUNT', 160, 90);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(paymentRecord.service_name, 20, 100);
    doc.setFontSize(10);
    doc.text(paymentRecord.description || '', 20, 106);
    
    doc.setFontSize(12);
    doc.text(`${paymentRecord.currency} ${paymentRecord.amount.toLocaleString()}`, 160, 100);

    // Total
    doc.line(20, 140, 190, 140);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL:', 130, 155);
    doc.text(`${paymentRecord.currency} ${paymentRecord.amount.toLocaleString()}`, 160, 155);

    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for your business. Payment is due upon receipt.', 20, 180);

    doc.save(`Invoice_${paymentRecord.invoice_number}.pdf`);
  };

  const handlePayNow = () => {
    if (!paymentRecord) return;

    initiatePayment(
      {
        tx_ref: `${paymentRecord.invoice_number}-${Date.now()}`,
        amount: paymentRecord.amount,
        currency: paymentRecord.currency,
        description: `Payment for ${paymentRecord.service_name}`,
        customer: {
          email: paymentRecord.client_email,
          name: paymentRecord.client_name,
        },
      },
      async (data: any) => {
        // Success Callback
        if (data.status === 'successful') {
          // Update DB
          await supabase
            .from('payments')
            .update({ status: 'paid', payment_reference: data.tx_ref })
            .eq('id', paymentRecord.id);
          
          setStatus('success');
          setPaymentRecord({ ...paymentRecord, status: 'paid', payment_reference: data.tx_ref });
        } else {
          setStatus('failed');
          alert('Payment was not successful. Please try again.');
        }
      },
      () => {
        // Closed without payment
        console.log('Payment modal closed');
      }
    );
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden pt-10 px-4">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Payments & Invoicing</h1>
        <p className="text-slate-400 text-center mb-12">Securely generate an invoice and settle payments for services.</p>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="mb-8 p-6 bg-neon-cyan/10 border border-neon-cyan rounded-2xl flex flex-col items-center text-center animate-fade-in">
            <div className="w-12 h-12 bg-neon-cyan text-black rounded-full flex items-center justify-center mb-4">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Payment Successful</h3>
            <p className="text-slate-300">Thank you, {paymentRecord?.client_name}. Your payment has been received.</p>
            <p className="text-sm text-slate-500 font-mono mt-2">Ref: {paymentRecord?.payment_reference}</p>
            <div className="flex gap-4 mt-6">
                <button onClick={handleDownloadPDF} className="text-neon-cyan underline hover:text-white transition-colors">Download Receipt</button>
                <button onClick={handleReset} className="text-slate-400 hover:text-white transition-colors">Start New Payment</button>
            </div>
          </div>
        )}

        {/* Invoice Generator Form */}
        {status === 'idle' || status === 'generating' ? (
          <div className="bg-cosmic-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
            <form onSubmit={handleGenerateInvoice} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Client Name</label>
                  <input
                    type="text"
                    name="client_name"
                    required
                    value={form.client_name}
                    onChange={handleChange}
                    className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none"
                    placeholder="Company or Individual Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    name="client_email"
                    required
                    value={form.client_email}
                    onChange={handleChange}
                    className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none"
                    placeholder="billing@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Service / Package</label>
                <input
                  type="text"
                  name="service_name"
                  required
                  value={form.service_name}
                  onChange={handleChange}
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none"
                  placeholder="e.g. EdTech Consultation, Web App Development"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none resize-none"
                  placeholder="Brief details about the work..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Amount</label>
                   <input
                    type="number"
                    name="amount"
                    required
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                   <label className="block text-xs font-mono text-neon-cyan mb-2 uppercase tracking-widest">Currency</label>
                   <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan transition-colors focus:outline-none appearance-none"
                  >
                    <option value="NGN">NGN (Naira)</option>
                    <option value="USD">USD (Dollar)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'generating'}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neon-cyan transition-colors shadow-lg mt-4 disabled:opacity-50"
              >
                {status === 'generating' ? 'Processing...' : (paymentRecord ? 'Update Invoice & Proceed' : 'Generate Invoice & Proceed')}
              </button>

            </form>
          </div>
        ) : null}

        {/* Pay Now Section */}
        {status === 'ready_to_pay' && paymentRecord && (
           <div className="bg-cosmic-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-white/10 pb-6 flex justify-between items-start">
                 <div>
                    <h2 className="text-xl font-bold text-white">{paymentRecord.service_name}</h2>
                    <p className="text-slate-400 text-sm mt-1">Invoice #{paymentRecord.invoice_number}</p>
                 </div>
                 <div className="text-right">
                    <div className="text-2xl font-bold text-neon-cyan">{paymentRecord.currency} {paymentRecord.amount.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Total Due</div>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Client:</span>
                    <span className="text-white">{paymentRecord.client_name}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Date:</span>
                    <span className="text-white">{new Date(paymentRecord.created_at).toLocaleDateString()}</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                 <button 
                    onClick={handleDownloadPDF}
                    className="py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors flex items-center justify-center gap-2"
                 >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download PDF
                 </button>
                 <button 
                    onClick={handlePayNow}
                    className="py-3 px-6 rounded-xl bg-neon-cyan text-black font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)] flex items-center justify-center gap-2"
                 >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Pay Now
                 </button>
              </div>

              {/* Utility Actions */}
              <div className="flex justify-center gap-6 mt-2 pt-4 border-t border-white/5">
                 <button 
                   onClick={handleCopyLink} 
                   className="flex items-center gap-2 text-sm text-slate-400 hover:text-neon-cyan transition-colors"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                   Copy Smart Link
                 </button>
                 <button 
                   onClick={handleEdit} 
                   className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                   Edit Invoice
                 </button>
                 <button 
                   onClick={handleReset} 
                   className="flex items-center gap-2 text-sm text-slate-500 hover:text-neon-ember transition-colors"
                 >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    Start Over
                 </button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default Payments;