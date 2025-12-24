declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

interface PaymentDetails {
  tx_ref: string;
  amount: number;
  currency: 'NGN' | 'USD';
  customer: {
    email: string;
    name: string;
    phone_number?: string;
  };
  description: string;
}

export const initiatePayment = (
  details: PaymentDetails,
  onSuccess: (response: any) => void,
  onClose?: () => void
) => {
  // Support both Next.js and Create React App env naming conventions
  const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY;

  if (!window.FlutterwaveCheckout) {
    alert("Payment gateway is not loaded. Please refresh the page or check your internet connection.");
    return;
  }

  const config = {
    public_key: publicKey || 'FLWPUBK_TEST-SANDBOX', // Safe fallback for testing if env is missing
    tx_ref: details.tx_ref,
    amount: details.amount,
    currency: details.currency,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: details.customer.email,
      name: details.customer.name,
      phone_number: details.customer.phone_number || '',
    },
    customizations: {
      title: 'Saviour Ukobong',
      description: details.description,
      logo: '/images/logo.png', // Local logo asset
    },
    callback: (data: any) => {
      // Flutterwave's callback returns data about the transaction
      onSuccess(data);
    },
    onclose: () => {
      if (onClose) onClose();
    },
  };

  window.FlutterwaveCheckout(config);
};