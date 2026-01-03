
import React from 'react';
import { Camera, Zap, LayoutGrid, Brain, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 dark:bg-[#0d001a] text-neutral-200 dark:text-purple-100 font-sans selection:bg-neutral-800 dark:selection:bg-purple-900 flex flex-col">
      {/* Navigation / Back */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-sm font-medium tracking-tight hover:text-white transition-colors">
            ← Voltar
          </Link>
          <span className="text-sm font-bold tracking-widest uppercase opacity-50">VisionLog / Sobre</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 flex-1 w-full">
        
        {/* Header */}
        <header className="mb-24 fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6">
            Estoque na velocidade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
              de uma foto.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-2xl">
            Uma abordagem radicalmente simples para gerenciamento de itens físicos, utilizando IA para eliminar a digitação manual.
          </p>
        </header>

        {/* Section: The Problem */}
        <section className="mb-24 space-y-8 group">
          <div className="flex items-center gap-3 text-white/80 mb-2">
            <Zap className="w-5 h-5" />
            <h2 className="text-xs font-bold uppercase tracking-widest">O Problema</h2>
          </div>
          <div className="border-l-2 border-neutral-800 pl-6 group-hover:border-neutral-600 transition-colors duration-500">
            <h3 className="text-2xl text-white font-semibold mb-4">A dor da digitação manual.</h3>
            <p className="text-neutral-400 leading-relaxed text-lg">
              Em oficinas, antiquários e centros de distribuição, o gargalo não é o espaço, é o registro. 
              Erros de digitação, esquecimento de lançamentos e o tempo gasto com leitores de código de barras tradicionais 
              são custos invisíveis que pesam no final do dia.
            </p>
          </div>
        </section>

        {/* Section: The Solution */}
        <section className="mb-24 space-y-8 group">
          <div className="flex items-center gap-3 text-white/80 mb-2">
            <Camera className="w-5 h-5" />
            <h2 className="text-xs font-bold uppercase tracking-widest">A Solução</h2>
          </div>
          <div className="border-l-2 border-neutral-800 pl-6 group-hover:border-white transition-colors duration-500">
            <h3 className="text-2xl text-white font-semibold mb-4">One-Shot Learning.</h3>
            <p className="text-neutral-400 leading-relaxed text-lg mb-6">
              Aponte a câmera para um motor ou peça uma única vez. Nossa tecnologia aprende a identificar o objeto 
              e correlaciona automaticamente com itens similares. Registre entradas e saídas inteiras com apenas uma foto, 
              sem necessidade de buscar códigos obscuros.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-900">
                <strong className="block text-white mb-1">Velocidade</strong>
                <span className="text-sm text-neutral-500">Economia real de horas/homem por dia.</span>
              </li>
              <li className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-900">
                <strong className="block text-white mb-1">Confiabilidade</strong>
                <span className="text-sm text-neutral-500">Minimização drástica de erro humano.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Why Us */}
        <section className="mb-24 space-y-8 group">
          <div className="flex items-center gap-3 text-white/80 mb-2">
            <LayoutGrid className="w-5 h-5" />
            <h2 className="text-xs font-bold uppercase tracking-widest">Por que VisionLog?</h2>
          </div>
          <div className="border-l-2 border-neutral-800 pl-6 group-hover:border-neutral-600 transition-colors duration-500">
            <h3 className="text-2xl text-white font-semibold mb-4">UX acima de tudo.</h3>
            <p className="text-neutral-400 leading-relaxed text-lg mb-4">
              Enquanto ERPs gigantes (SAP, Totvs) focam na complexidade corporativa, nós focamos na usabilidade.
              Construímos uma interface tão intuitiva quanto sua rede social favorita.
            </p>
            <p className="text-neutral-400 leading-relaxed text-lg">
              Com o <span className="text-white font-medium">Graph View</span>, você separa workspaces visualmente, 
              observando as conexões entre seus estoques de forma orgânica, não apenas linhas frias em uma tabela.
            </p>
          </div>
        </section>

        {/* Section: Future */}
        <section className="mb-24 space-y-8 group">
          <div className="flex items-center gap-3 text-white/80 mb-2">
            <Brain className="w-5 h-5" />
            <h2 className="text-xs font-bold uppercase tracking-widest">O Futuro</h2>
          </div>
          <div className="border-l-2 border-neutral-800 pl-6 group-hover:border-neutral-600 transition-colors duration-500">
            <p className="text-neutral-400 leading-relaxed text-lg">
              Estamos construindo o MVP definitivo para nichos de alta rotatividade. 
              Utilizando o melhor da infraestrutura de Cloud e Visão Computacional, 
              o VisionLog é a ponte entre o mundo físico desordenado e o mundo digital organizado.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-12 border-t border-neutral-900">
           <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white font-bold text-lg hover:gap-4 transition-all duration-300"
           >
            Começar Agora <ArrowRight className="w-5 h-5" />
           </Link>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
