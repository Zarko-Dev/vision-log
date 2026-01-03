import React from 'react';

export default function PrintPage() {
    return (
        <div className="w-full h-full relative p-6">
            <div className="absolute top-24 md:top-6 left-6 z-20 pointer-events-none">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Central de Impressão</h1>
                <p className="text-neutral-500 dark:text-gray-400">Funcionalidades de Impressão em desenvolvimento</p>
            </div>
            
            <div className="pt-32 md:pt-24 mt-4">
                 <div className="p-12 border-2 border-dashed border-neutral-300 dark:border-white/10 rounded-2xl flex items-center justify-center text-neutral-400">
                    Área de impressão
                </div>
            </div>
        </div>
    );
}
