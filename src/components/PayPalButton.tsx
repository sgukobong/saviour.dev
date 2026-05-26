import React from 'react';

interface PayPalButtonProps {
  amount?: number | string;
  currency?: string;
  className?: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, currency, className = "" }) => {
  // Construct paypal.me link. 
  // format: https://paypal.me/username/amountCurrency
  const baseUrl = "https://paypal.me/sgukobong";
  const paypalLink = amount ? `${baseUrl}/${amount}${currency || 'USD'}` : baseUrl;

  return (
    <div className={`group relative bg-white border-2 border-black/5 p-8 rounded-[2.5rem] hover:border-black transition-all duration-500 shadow-sm ${className}`}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-black/5">
                <svg className="w-6 h-6 text-[#003087]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.32a.641.641 0 0 1 .633-.54h7.19c4.248 0 6.64 2.11 6.07 5.76-.36 2.304-1.745 3.868-4.116 3.868h-1.928a.524.524 0 0 0-.518.441l-.946 6.002a.526.526 0 0 1-.518.441h-3.64l.946-6.002a.524.524 0 0 0-.518-.441H4.496l.946-6.002a.526.526 0 0 1 .518-.441h3.64l.946-6.002a.524.524 0 0 0-.518-.441z"/>
                </svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-black">Pay via PayPal</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">International Transfer</p>
            </div>
          </div>
          <span className="bg-black text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">Global</span>
        </div>

        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          The preferred method for clients outside Africa. Fast, secure, and supports most major global currencies.
        </p>

        <a
          href={paypalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-6 rounded-2xl bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl"
          aria-label="Pay with PayPal"
        >
          <span>Complete with PayPal</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <div className="flex justify-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Secured by PayPal Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default PayPalButton;