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
        <label
          htmlFor="email"
          className="flex p-4 rounded bg-gray-800 shadow-lg text-gray-200 leading-tight"
        >
          <div className="w-24 text-white font-semibold">Email</div>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-grow bg-transparent"
            placeholder="jane@example.com"
            required
          />
        </label>
      </div>

      <div className="pb-4">
        <label
          htmlFor="plan"
          className="flex p-4 rounded bg-gray-800 shadow-lg text-gray-200 leading-tight"
        >
          <div className="w-24 text-white font-semibold">Plan</div>
          <select
            id="plan"
            name="plan"
            value={plan}
            onChange={e => setPlan(e.target.value)}
            className="p-0 flex-grow bg-transparent"
          >
            <option value="plan_00001">Solo ($25/month)</option>
            <option value="plan_00002">Small Team ($50/month)</option>
            <option value="plan_00003">Large Team ($100/month)</option>
          </select>
        </label>
      </div>

      <div className="pb-4">
        <div className="p-4 rounded bg-gray-800 shadow-lg text-gray-200">
          <CardElement
            onChange={e => setStripeError(e.error)}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  fontSmoothing: 'antialiased',
                  color: '#fff'
                }
              }
            }}
          />
        </div>

        {stripeError && (
          <div className="pt-2 font-bold text-sm text-red-600">
            {stripeError.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`${isSubmitting && 'opacity-75'} 
          p-4 bg-purple-600 hover:bg-purple-500 shadow-lg leading-tight text-white font-bold rounded w-full`}
        disabled={isSubmitting}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Subscription;
