import React from 'react';
import GraphBackground from '../components/GraphBackground';

export default function DashboardPage() {
    return (
        <div className="w-full h-full relative">
            <GraphBackground />
            
            {/* Overlay controls or info could go here */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Explorar</h1>
                <p className="text-neutral-500 dark:text-gray-400">Visualização de Rede em Tempo Real</p>
            </div>
        </div>
    );
}
