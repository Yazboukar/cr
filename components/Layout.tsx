import React from 'react';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto p-4 flex-1">{children}</main>
      <footer className="py-4 text-center text-sm text-gray-500">MeetingFlow — MVP</footer>
    </div>
  );
};

export default Layout;
