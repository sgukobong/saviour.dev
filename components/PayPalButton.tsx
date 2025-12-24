import React from 'react';

interface PayPalButtonProps {
  amount?: number | string;
  currency?: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, currency }) => {
  // Construct paypal.me link. 
  // format: https://paypal.me/username/amountCurrency
  const baseUrl = "https://paypal.me/sgukobong";
  const paypalLink = amount ? `${baseUrl}/${amount}${currency || 'USD'}` : baseUrl;

  return (
    <div className="group relative bg-cosmic-900/50 border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-[#003087]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.32a.641.641 0 0 1 .633-.54h7.19c4.248 0 6.64 2.11 6.07 5.76-.36 2.304-1.745 3.868-4.116 3.868h-1.928a.524.524 0 0 0-.518.441l-.946 6.002a.526.526 0 0 1-.518.441h-3.64l.946-6.002a.524.524 0 0 0-.518-.441H4.496l.946-6.002a.526.526 0 0 1 .518-.441h3.64l.946-6.002a.524.524 0 0 0-.518-.441z"/>
            </svg>
            Pay via PayPal
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            For international clients outside Africa. Secure payments via PayPal.
          </p>
        </div>

        <a
          href={paypalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-6 rounded-xl bg-transparent border border-[#003087] text-[#003087] font-bold hover:bg-[#003087] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(0,48,135,0.2)]"
          aria-label="Pay with PayPal"
        >
          <span>Pay with PayPal</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PayPalButton;