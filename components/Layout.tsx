import React from 'react';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </main>
      <footer className="px-4 pb-8 pt-2 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        Plateforme de coordination, de suivi et de compte rendu.
      </footer>
    </div>
  );
};

export default Layout;
