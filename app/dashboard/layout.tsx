import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-neutral-50 dark:bg-black flex flex-col pt-16 font-sans overflow-hidden">
        <DashboardNavbar />
        
        {/* Main Content Area - Fixed height for GraphView */}
        <main className="flex-1 w-full relative">
            {children}
        </main>
    </div>
  );
}
