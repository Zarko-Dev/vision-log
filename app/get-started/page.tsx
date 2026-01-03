
import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { ArrowLeft, Book, Camera, GitGraph, Zap } from 'lucide-react';

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-100 flex flex-col">
      
      {/* Navbar Style Docs Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-14 items-center px-6 gap-4">
             <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="h-4 w-px bg-neutral-200"></div>
            <span className="font-semibold text-sm">VisionLog Docs</span>
            <span className="ml-auto text-xs text-neutral-400 font-mono">v1.0-alpha</span>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-r border-neutral-100 hidden md:block shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 p-6 overflow-y-auto">
            <h5 className="font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-4">Primeiros Passos</h5>
            <nav className="space-y-1">
                <a href="#quick-start" className="block px-3 py-2 text-sm font-medium text-black bg-neutral-50 rounded-md">Visão Geral</a>
                <a href="#one-shot" className="block px-3 py-2 text-sm text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-md transition-colors">Registro One-Shot</a>
                <a href="#graph-view" className="block px-3 py-2 text-sm text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-md transition-colors">Graph View</a>
                <a href="#workflows" className="block px-3 py-2 text-sm text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-md transition-colors">Processos</a>
            </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12 md:max-w-3xl">
            
            <section id="quick-start" className="mb-16">
                <div className="flex items-center gap-2 text-neutral-400 mb-4">
                    <Book className="w-5 h-5" />
                    <span className="text-sm font-medium">Introdução</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-6">Como funciona o VisionLog</h1>
                <p className="text-lg text-neutral-600 leading-relaxed">
                    O VisionLog não é um ERP tradicional cheio de tabelas. É uma plataforma visual desenhada para velocidade. 
                    Toda a interação é pensada para reduzir o tempo entre ver um objeto e registrá-lo no sistema.
                </p>
                <div className="mt-6 p-4 bg-neutral-50 border border-neutral-100 rounded-lg text-sm text-neutral-600">
                    <strong>Nota:</strong> Esta documentação cobre as funcionalidades principais (Core) disponíveis no plano Medium e Especial.
                </div>
            </section>

            <section id="one-shot" className="mb-16 scroll-mt-20">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-neutral-100 rounded-md">
                        <Camera className="w-5 h-5 text-black" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">1. Registro One-Shot</h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                    Esqueça o preenchimento manual de formulários longos. O registro de novos itens é feito apontando a câmera.
                </p>
                
                <ul className="space-y-4 my-6">
                    <li className="flex gap-4">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">1</span>
                        <div>
                            <strong className="block text-neutral-900">Captura</strong>
                            <span className="text-neutral-500">Tire uma foto clara do produto individualmente.</span>
                        </div>
                    </li>
                     <li className="flex gap-4">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">2</span>
                        <div>
                            <strong className="block text-neutral-900">Processamento IA</strong>
                            <span className="text-neutral-500">O sistema analisa a geometria, texto e cores para criar uma "assinatura visual".</span>
                        </div>
                    </li>
                     <li className="flex gap-4">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">3</span>
                        <div>
                            <strong className="block text-neutral-900">Indexação</strong>
                            <span className="text-neutral-500">O item é salvo. Da próxima vez, basta apontar a câmera para reconhecê-lo instantaneamente.</span>
                        </div>
                    </li>
                </ul>
            </section>

             <section id="graph-view" className="mb-16 scroll-mt-20">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-neutral-100 rounded-md">
                        <GitGraph className="w-5 h-5 text-black" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">2. Workspaces & Graph View</h2>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                    Em vez de pastas, usamos Grafos. Seus itens não vivem em listas isoladas, eles têm relações espaciais.
                </p>
                <div className="prose prose-neutral">
                    <p className="text-neutral-600">
                        Imagine que você tem uma <strong>Caixa A</strong> dentro da <strong>Prateleira B</strong> no <strong>Galpão C</strong>. 
                        No VisionLog, isso é visualizado como nós conectados. Você pode navegar clicando nos nós para "entrar" em cada container.
                    </p>
                </div>
            </section>

            <section id="workflows" className="mb-16 scroll-mt-20">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-neutral-100 rounded-md">
                        <Zap className="w-5 h-5 text-black" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">3. Processos de Entrada/Saída</h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                    A movimentação de estoque é o ponto onde mais ocorrem erros. Simplificamos para ações binárias via câmera.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-neutral-200 rounded-lg p-5">
                        <span className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2 block">Entrada (Check-in)</span>
                        <p className="text-sm text-neutral-600">Chegou uma remessa? Aponte para a caixa aberta. O sistema conta os itens visíveis e sugere a entrada em lote.</p>
                    </div>
                    <div className="border border-neutral-200 rounded-lg p-5">
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2 block">Saída (Check-out)</span>
                        <p className="text-sm text-neutral-600">Vai despachar? Aponte para o item e confirme o destinatário com um toque.</p>
                    </div>
                </div>
            </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}
