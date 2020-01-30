import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import GitHub from './GitHub';

const Nav = () => {
  return (
    <header className="flex pt-4 px-4 bg-gray-900 border-b border-gray-800">
      <div className="w-8">
        <a href="https://statickit.com" className="text-white">
          <Logo />
        </a>
      </div>
      <div className="flex-grow text-center">
        <h1 className="pb-5 text-gray-100 font-bold">Stripe React Examples</h1>
        <div className="-mb-px flex justify-center">
          <Link href="/">
            <a className="mx-px px-4 py-3 border-b-2 border-indigo-600 hover:border-indigo-500 text-gray-300 hover:text-gray-200">
              Charges
            </a>
          </Link>

          <Link href="/">
            <a className="mx-px px-4 py-3 border-b-2 border-transparent text-gray-300 hover:text-gray-200">
              Subscriptions
            </a>
          </Link>
        </div>
      </div>
      <div className="w-8">
        <a
          href="https://github.com/statickit-projects/stripe-react"
          className="text-gray-400 hover:text-gray-200"
        >
          <GitHub />
        </a>
      </div>
    </header>
  );
};

export default Nav;
