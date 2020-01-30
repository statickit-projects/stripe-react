import React from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';

const Home = () => (
  <div>
    <Head>
      <title>Stripe React Examples</title>
    </Head>

    <Nav />

    <main className="py-24 px-6">
      <div className="p-4 mx-auto max-w-xl border border-gray-800 rounded-lg">
        {/* TODO: implement form */}
      </div>
    </main>
  </div>
);

export default Home;
