"use client";

import React, { useEffect, useState } from 'react';
import { Terminal, Clock, AlertCircle } from 'lucide-react';

interface LogEntry {
    id: string;
    timestamp: string;
    level: string;
    message: string;
    source?: string;
}

export default function LogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('/api/logs');
                if (!response.ok) {
                    throw new Error('Falha ao carregar logs');
                }
                const data = await response.json();
                // Assumindo que a API retorna um array, se retornar objeto com data, ajustar aqui
                if (Array.isArray(data)) {
                    setLogs(data);
                } else {
                     // Fallback se a estrutura for diferente, ou logar erro
                     console.warn('Formato de logs inesperado:', data);
                     setLogs([]);
                }
            } catch (err) {
                console.error(err);
                setError('Não foi possível carregar os logs do sistema.');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="w-full h-full relative p-6 overflow-y-auto">
            <div className="flex flex-col gap-2 mb-8 mt-20 md:mt-2">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                    <Terminal className="w-8 h-8" />
                    Logs do Sistema
                </h1>
                <p className="text-neutral-500 dark:text-gray-400">Monitoramento de eventos em tempo real</p>
            </div>
            
            <div className="w-full max-w-6xl mx-auto">
                {loading ? (
                    <div className="flex justify-center py-20">
                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="p-6 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                ) : logs.length === 0 ? (
                    <div className="p-12 border-2 border-dashed border-neutral-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-neutral-400 gap-4">
                        <Terminal className="w-12 h-12 opacity-50" />
                        <p>Nenhum log registrado no momento.</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-neutral-200 dark:border-white/10 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-neutral-50 dark:bg-black/20 border-b border-neutral-200 dark:border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 font-medium text-neutral-500 dark:text-neutral-400">Horário</th>
                                        <th className="px-6 py-4 font-medium text-neutral-500 dark:text-neutral-400">Nível</th>
                                        <th className="px-6 py-4 font-medium text-neutral-500 dark:text-neutral-400">Origem</th>
                                        <th className="px-6 py-4 font-medium text-neutral-500 dark:text-neutral-400">Mensagem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 dark:divide-white/5">
                                    {logs.map((log) => (
                                        <tr key={log.id || Math.random()} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300 whitespace-nowrap font-mono text-xs">
                                                {new Date(log.timestamp).toLocaleTimeString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                    log.level === 'error' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                                    log.level === 'warn' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                                    'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                                                }`}>
                                                    {log.level || 'INFO'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300 font-mono text-xs">
                                                {log.source || 'system'}
                                            </td>
                                            <td className="px-6 py-4 text-neutral-900 dark:text-white">
                                                {log.message}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
