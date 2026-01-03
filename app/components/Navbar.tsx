"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Navbar() {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleLoginClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    
    // Simulate a small delay for the animation to be perceived
    await new Promise(resolve => setTimeout(resolve, 800));
    
    router.push('/login');
  };

  return (
    <header className="w-full flex justify-center pt-8 fixed top-0 z-50">
        <nav className="relative flex items-center justify-between px-2 w-[40rem] h-16 bg-white dark:bg-[#130024]/80 border border-black/5 dark:border-purple-500/20 rounded-full shadow-sm backdrop-blur-md">
          {/* Left: Logo */}
          <div className="flex items-center pl-4">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="object-contain"
            />
          </div>

          {/* Center: Navigation Links */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-purple-300/80">
            <Link href="/about" className="hover:text-black dark:hover:text-purple-100 transition-colors">About</Link>
            <Link href="/plans" className="hover:text-black dark:hover:text-purple-100 transition-colors">Plans</Link>
            <Link href="/get-started" className="hover:text-black dark:hover:text-purple-100 transition-colors">Get started</Link>
          </div>

          {/* Right: Login Button */}
          <div className="pr-2">
            <button 
                onClick={handleLoginClick}
                disabled={isNavigating}
                className={`
                    flex items-center justify-center bg-[#1C1C1E] dark:bg-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-medium 
                    hover:bg-black dark:hover:bg-purple-500 transition-all shadow-md active:scale-95 disabled:opacity-90 disabled:cursor-wait
                    ${isNavigating ? 'w-[100px]' : 'w-[88px]'} 
                `}
            >
              {isNavigating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </nav>
      </header>
  );
}
