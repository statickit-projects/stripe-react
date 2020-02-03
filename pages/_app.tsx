import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { StaticKitProvider } from '@statickit/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import * as Fathom from 'fathom-client';
import '../style.css';

const stripePromise = loadStripe('pk_test_AEGjmWosrdHvOvnujk0cNHjQ');

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

function App({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load();
      Fathom.setSiteId('ZFEWBXJZ');
      Fathom.trackPageview();
    }
  }, []);

  return (
    <StaticKitProvider site={process.env.siteId}>
      <Elements stripe={stripePromise}>
        <Head>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div className="antialiased bg-gray-900 h-full min-h-screen">
          <Component {...pageProps} />
        </div>
      </Elements>
    </StaticKitProvider>
  );
}

export default App;
