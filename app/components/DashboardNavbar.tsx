"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Network, Package, FileText, Printer, LogOut, Bell } from 'lucide-react';
import WorkspaceSwitcher from './WorkspaceSwitcher';

const navItems = [
    { name: 'Explorar', href: '/dashboard', icon: Network },
    { name: 'Inventário', href: '/dashboard/inventory', icon: Package },
    { name: 'Logs', href: '/dashboard/logs', icon: FileText },
    { name: 'Impressão', href: '/dashboard/print', icon: Printer },
];

export default function DashboardNavbar() {
    const pathname = usePathname();

    const handleLogout = () => {
        document.cookie = "auth_token=; path=/; max-age=0";
        window.location.href = "/login";
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-16 border-b border-neutral-200/50 dark:border-white/5 bg-white/80 dark:bg-black/60 backdrop-blur-xl z-50 flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-black dark:bg-purple-600 rounded-lg flex items-center justify-center">
                   <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="h-6 w-px bg-neutral-200 dark:bg-white/10 mx-2"></div>
                <WorkspaceSwitcher />
            </div>

            <nav className="hidden md:flex items-center gap-1 bg-neutral-100/50 dark:bg-white/5 p-1 rounded-full border border-neutral-200/50 dark:border-white/5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                isActive 
                                    ? 'bg-white dark:bg-purple-600 text-black dark:text-white shadow-sm' 
                                    : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/5'
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="flex items-center gap-3">
                <button className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
                </button>
                <div className="h-6 w-px bg-neutral-200 dark:bg-white/10"></div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-purple-900 dark:to-purple-700 rounded-full flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-purple-100 border border-white/20">
                        MU
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        title="Sair"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
