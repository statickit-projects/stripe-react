import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStaticKit } from '@statickit/react';
import { createCustomer, createCharge } from '@statickit/functions';

type FormState = 'idle' | 'submitting' | 'succeeded';

const FixedCharge = () => {
  const client = useStaticKit();
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [stripeError, setStripeError] = useState(null);
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    // Tokenize the credit card
    const { error, token } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    setStripeError(error);

    // Bail if tokenization failed
    if (!token) {
      setFormState('idle');
      return;
    }

    // Create the customer in Stripe and attach the tokenized credit card
    const customerResult = await createCustomer(client, {
      email,
      source: token.id
    });

    // Bail if customer creation failed
    if (customerResult.status !== 'ok') {
      setFormState('idle');
      return;
    }

    // Charge the customer
    const { status } = await createCharge(client, {
      amount: 2500,
      customerToken: customerResult.customerToken
    });

    setFormState(status === 'ok' ? 'succeeded' : 'idle');
  };

  if (formState === 'succeeded') {
    return (
      <p className="px-6 py-12 border border-gray-800 rounded-lg text-center text-gray-500 font-bold">
        Charge succeeded! 👍
      </p>
    );
  }

  const isSubmitting = formState === 'submitting';
  const buttonText = isSubmitting ? 'Submitting...' : 'Pay $25';

  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-4">
        <label htmlFor="email" className="input-wrapper">
          <div className="w-24 text-white font-semibold">Email</div>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-grow bg-transparent placeholder-gray-600 focus:outline-none"
            placeholder="jane@example.com"
            required
          />
        </label>
      </div>
      <div className="pb-4">
        <CardElement
          onChange={e => setStripeError(e.error)}
          options={{
            style: {
              base: {
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                color: '#fff',
                '::placeholder': {
                  color: '#718096'
                }
              }
            }
          }}
        />

        {stripeError && (
          <div className="pt-2 font-bold text-sm text-red-600">
            {stripeError.message}
          </div>
        )}
      </div>

      <button type="submit" className="btn" disabled={isSubmitting}>
        {buttonText}
      </button>
    </form>
  );
};

export default FixedCharge;
