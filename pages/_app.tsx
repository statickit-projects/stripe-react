import Head from 'next/head';
import { StaticKitProvider } from '@statickit/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_AEGjmWosrdHvOvnujk0cNHjQ');

function App({ Component, pageProps }) {
  return (
    <StaticKitProvider site={process.env.siteId}>
      <Elements stripe={stripePromise}>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link
            href="https://unpkg.com/tailwindcss@1.1.4/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Head>
        <div className="antialiased bg-gray-900 h-full min-h-screen">
          <Component {...pageProps} />
        </div>
      </Elements>
    </StaticKitProvider>
  );
}

export default App;
