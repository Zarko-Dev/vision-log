"use client";

import React from 'react';
import GraphView from '../components/graph/GraphView';
import { Node, Edge } from '@xyflow/react';

// Dados de exemplo para o gráfico
const initialNodes: Node[] = [
  {
    id: 'parent-1',
    type: 'parent',
    position: { x: 250, y: 100 },
    data: {
      type: 'parent',
      label: 'Escritório',
    },
  },
  {
    id: 'category-1',
    type: 'category',
    position: { x: 100, y: 300 },
    data: {
      type: 'category',
      label: 'Ferramentas',
      color: 'bg-blue-500',
    },
  },
  {
    id: 'item-1',
    type: 'item',
    position: { x: 500, y: 300 },
    data: {
      type: 'item',
      label: 'Chave de Fenda',
      quantity: 5,
    },
  },
  {
    id: 'item-2',
    type: 'item',
    position: { x: 650, y: 300 },
    data: {
      type: 'item',
      label: 'Martelo',
      quantity: 3,
    },
  },
];

const initialEdges: Edge[] = [];

export default function DashboardPage() {
    return (
        <div className="w-full h-full relative">
            {/* Overlay header */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Explorar</h1>
                <p className="text-neutral-500 dark:text-gray-400">Visualização de Rede em Tempo Real</p>
            </div>

            {/* Graph View */}
            <GraphView initialNodes={initialNodes} initialEdges={initialEdges} />
        </div>
    );
}
