import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error.message);
      alert(`Payment failed: ${error.message}`);
    } else {
      console.log('Payment method:', paymentMethod);
      alert('Payment successful!'); // Backend handling would go here
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Complete Your Payment</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <CardElement options={{ style: { base: { fontSize: '18px', color: '#333' } } }} />
        <button type="submit" disabled={!stripe} style={{ marginTop: '20px' }}>
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
