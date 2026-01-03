"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';
import GraphBackground from '../components/GraphBackground';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { ApiService } from '../services/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.post<{ token: string, user: any }>('/auth/login', {
          email,
          password
      });

      if (response && response.token) {
           // Salva no localStorage para uso do ApiService
           localStorage.setItem('auth_token', response.token);
           
           // Opcional: Salva no cookie para persistência básica se necessário
           document.cookie = `auth_token=${response.token}; path=/; max-age=86400; secure; samesite=strict`;

           router.push("/dashboard");
      } else {
           throw new Error("Token não recebido do servidor.");
      }
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Ocorreu um erro ao tentar entrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black flex flex-col font-sans text-neutral-900 dark:text-purple-100 relative overflow-hidden">
      
      {/* Background Animation */}
      <GraphBackground />

      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto relative z-10">
        <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black dark:text-purple-300/60 dark:hover:text-purple-100 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar
        </Link>
        <span className="text-sm font-bold tracking-widest uppercase text-neutral-400">VisionLog / Acesso</span>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full relative z-10">
        <div className="max-w-[400px] w-full bg-white/80 dark:bg-[#130024]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-purple-500/20 shadow-2xl shadow-neutral-200/50 dark:shadow-purple-900/20">
            <div className="text-center mb-8">
               <div className="w-12 h-12 bg-black dark:bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center dark:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
               </div>
               <h1 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Bem-vindo de volta</h1>
               <p className="text-neutral-500 dark:text-purple-200/60 text-sm">Insira suas credenciais para acessar o workspace.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        {error}
                    </div>
                )}

                <div>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-5 py-3 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-purple-500/30 focus:border-black dark:focus:border-purple-400 focus:ring-1 focus:ring-black dark:focus:ring-purple-400 outline-none transition-all text-sm dark:text-white dark:placeholder-purple-300/30"
                        placeholder="Email corporativo"
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-5 py-3 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-purple-500/30 focus:border-black dark:focus:border-purple-400 focus:ring-1 focus:ring-black dark:focus:ring-purple-400 outline-none transition-all text-sm dark:text-white dark:placeholder-purple-300/30"
                        placeholder="Senha"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-black dark:bg-purple-600 text-white font-medium py-3 rounded-xl hover:bg-neutral-800 dark:hover:bg-purple-500 transition-all active:scale-95 shadow-lg shadow-neutral-900/10 dark:shadow-purple-900/50 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar'}
                </button>
            </form>

             <div className="mt-8 flex items-center justify-between text-xs text-neutral-500 dark:text-purple-300/50">
                <a href="#" className="hover:text-black dark:hover:text-purple-200">Esqueceu a senha?</a>
                <Link href="/get-started" className="hover:text-black dark:hover:text-purple-200">Criar conta</Link>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

