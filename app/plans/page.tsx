
import React from 'react';
import { Check, ArrowLeft, ScanBarcode, Camera, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-[#FFFAFA] flex flex-col font-sans selection:bg-neutral-200">
      
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>
        <span className="text-sm font-bold tracking-widest uppercase text-neutral-400">VisionLog / Planos</span>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-6">
        
        <div className="text-center max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Escolha como você quer <br/> gerenciar.
          </h1>
          <p className="text-neutral-500 text-lg">
            Da organização manual à automação total com Inteligência Artificial.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          
          {/* Card 1: Starter */}
          <div className="flex flex-col p-8 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-300">
            <div className="mb-6">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <ScanBarcode className="w-5 h-5 text-neutral-700" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Starter</h3>
              <p className="text-sm text-neutral-500 mt-2">Para quem está começando e precisa de controle básico.</p>
            </div>
            
            <div className="text-3xl font-bold text-neutral-900 mb-8">
              Grátis
              <span className="text-base font-normal text-neutral-400 ml-1">/mês</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-black mt-0.5 shrink-0" />
                <span>Inserção Manual de itens</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-black mt-0.5 shrink-0" />
                <span>Leitura de código EAN 13</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-black mt-0.5 shrink-0" />
                <span>Estoque Ilimitado (Texto)</span>
              </li>
            </ul>

            <button className="w-full py-3 px-4 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors">
              Começar Agora
            </button>
          </div>

          {/* Card 2: Medium */}
          <div className="flex flex-col p-8 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md transition-all duration-300 relative overflow-hidden">
            <div className="mb-6 z-10">
              <div className="w-10 h-10 bg-blue-50/50 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Medium</h3>
              <p className="text-sm text-neutral-500 mt-2">Agilidade visual para operações de média complexidade.</p>
            </div>
            
            <div className="text-3xl font-bold text-neutral-900 mb-8 z-10">
              R$ 49
              <span className="text-base font-normal text-neutral-400 ml-1">/mês</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1 z-10">
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Tudo do Starter</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span className="font-medium text-black">Registro via Foto</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Organização Visual (Galeria)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Histórico Visual</span>
              </li>
            </ul>

            <button className="w-full py-3 px-4 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-black transition-all shadow-lg z-10">
              Testar Grátis
            </button>
            
            {/* Subtle highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
          </div>

          {/* Card 3: Especial */}
          <div className="flex flex-col p-8 rounded-2xl border border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:shadow-md transition-all duration-300 relative">
             {/* Badge */}
             <div className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Recomendado
            </div>

            <div className="mb-6">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Especial</h3>
              <p className="text-sm text-neutral-500 mt-2">O poder total da IA para escalar sua operação.</p>
            </div>
            
            <div className="text-3xl font-bold text-neutral-900 mb-8">
              R$ 129
              <span className="text-base font-normal text-neutral-400 ml-1">/mês</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <span>Tudo do Medium</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <span className="font-medium text-black">Identificação por IA</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <span>Automação de workflows</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <span>Integração via API (ERP/Ecom)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <span>Graph View Avançado</span>
              </li>
            </ul>

            <button className="w-full py-3 px-4 rounded-xl border border-neutral-300 bg-white text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
              Falar com Vendas
            </button>
          </div>

        </div>

      </main>

      {/* Simple Footer */}
      <Footer />

    </div>
  );
}
