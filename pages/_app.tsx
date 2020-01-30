import Head from 'next/head';
import { StaticKitProvider } from '@statickit/react';

function App({ Component, pageProps }) {
  return (
    <StaticKitProvider site={process.env.siteId}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://unpkg.com/tailwindcss@^1.1.3/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </StaticKitProvider>
  );
}

export default App;
