import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStaticKit } from '@statickit/react';
import { createCustomer, createSubscription } from '@statickit/functions';

type FormState = 'idle' | 'submitting' | 'succeeded';

const Subscription = () => {
  const client = useStaticKit();
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('plan_00001');
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

    // Start the Stripe subscription
    const { status } = await createSubscription(client, {
      customerToken: customerResult.customerToken,
      items: [{ plan }]
    });

    setFormState(status === 'ok' ? 'succeeded' : 'idle');
  };

  if (formState === 'succeeded') {
    return (
      <p className="px-6 py-12 border border-gray-800 rounded-lg text-center text-gray-500 font-bold">
        Subscription started! 👍
      </p>
    );
  }

  const isSubmitting = formState === 'submitting';
  const buttonText = isSubmitting ? 'Submitting...' : 'Subscribe';

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
        <label htmlFor="plan" className="input-wrapper">
          <div className="w-24 text-white font-semibold">Plan</div>
          <div className="relative flex-grow">
            <select
              id="plan"
              name="plan"
              value={plan}
              onChange={e => setPlan(e.target.value)}
              className="block appearance-none w-full bg-transparent pl-0 pt-0 pb-0 pr-8 focus:outline-none"
            >
              <option value="plan_00001">Solo ($25/month)</option>
              <option value="plan_00002">Small Team ($50/month)</option>
              <option value="plan_00003">Large Team ($100/month)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
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

export default Subscription;
