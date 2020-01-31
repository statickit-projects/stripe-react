import React from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';
import BasicChargeForm from '../components/BasicChargeForm';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Stripe React Examples</title>
      </Head>

      <Nav />

      <main className="py-12 px-6">
        <div className="mx-auto max-w-xl">
          <p className="pb-6 text-gray-500">
            This is a simple form that accepts a credit card and creates a
            payment using the Stripe Charges API. The server-side part is
            handled by StaticKit functions, so no custom server code is
            required!
          </p>
          <p className="pb-6 text-gray-500">
            To test out what a successful charge looks like, use the card number{' '}
            <code className="px-2 py-px mx-1 rounded-full bg-gray-800 text-sm whitespace-no-wrap">
              4242 4242 4242 4242
            </code>
            with any MM / YY, CVV, and ZIP.
          </p>
          <div className="pb-4">
            <BasicChargeForm />
          </div>
          <p>
            <a
              href="https://github.com/statickit-projects/stripe-react/blob/master/components/BasicChargeForm.tsx"
              className="text-indigo-600 font-bold"
              target="_blank"
            >
              Check out the{' '}
              <code className="px-2 py-px mx-1 text-indigo-500 rounded-full bg-gray-800 text-sm whitespace-no-wrap">
                BasicChargeForm
              </code>{' '}
              component to see the source &rarr;
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
