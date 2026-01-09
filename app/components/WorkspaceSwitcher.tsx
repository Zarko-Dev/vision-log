"use client";
import React, { useState } from 'react';
import { ChevronDown, Check, Box } from 'lucide-react';

export default function WorkspaceSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    
    // Fallback static workspace since mocks were deleted
    const currentWorkspace = { id: 'default', name: 'ZarkoDev', icon: Box };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
            >
                <div className="w-6 h-6 bg-black dark:bg-purple-600 rounded-md flex items-center justify-center text-white">
                    <currentWorkspace.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hidden sm:inline">{currentWorkspace.name}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop for closing */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown Container */}
                    <div className="absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] max-w-[280px] sm:w-64 bg-white dark:bg-[#1C1C1E] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 overflow-hidden py-1 animate-in slide-in-from-top-2 duration-200">
                        <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Workspaces</span>
                        </div>
                        
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-3 sm:py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black text-white dark:bg-purple-600">
                                <currentWorkspace.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-medium text-neutral-900 dark:text-white">
                                    {currentWorkspace.name}
                                </div>
                            </div>
                            <Check className="w-4 h-4 text-black dark:text-purple-500" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
