import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black flex flex-col pt-16 font-sans">
        <DashboardNavbar />
        
        {/* Main Content Area - Occupies remaining height */}
        <main className="flex-1 w-full relative overflow-hidden">
            {children}
        </main>
    </div>
  );
}
