import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStaticKit } from '@statickit/react';
import { createCharge } from '@statickit/functions';

type FormState = 'idle' | 'submitting' | 'succeeded';

const BasicChargeForm = () => {
  const client = useStaticKit();
  const stripe = useStripe();
  const elements = useElements();

  const [stripeError, setStripeError] = useState(null);
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const { error, token } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    setStripeError(error);

    if (!token) {
      setFormState('idle');
      return;
    }

    const { status } = await createCharge(client, {
      amount: 2500,
      source: token.id
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
  const buttonText = isSubmitting ? 'Submitting...' : 'Charge $25';

  return (
    <form onSubmit={handleSubmit}>
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

export default BasicChargeForm;
