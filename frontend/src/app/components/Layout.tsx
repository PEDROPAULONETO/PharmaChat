import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-4 md:p-8 flex justify-center items-start">
        {children}
      </main>
    </div>
  );
};
