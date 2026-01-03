import React from 'react';
import GraphView from '../components/graph/GraphView';
import { Node, Edge, MarkerType } from '@xyflow/react';
import { ApiService } from '../services/api';
import { workspaces } from '../data/workspaces';

// Função para buscar nós da API
async function getNodes(): Promise<Node[]> {
    try {
        const nodes = await ApiService.get<Node[]>('/nodes');
        if (Array.isArray(nodes) && nodes.length > 0) {
            return nodes;
        }
    } catch (error) {
        console.error('Failed to fetch nodes form API, using fallback:', error);
    }
    
    // Fallback para dados estáticos se a API falhar ou não retornar nada
    // Converte os dados dos workspaces em Nodes
    return workspaces.map((ws, index) => {
        // Posição fixa relativa (o fitView do ReactFlow vai centralizar tudo)
        const isHQ = ws.id === 'headquarters';
        const x = isHQ ? 0 : (index * 350) - 350; // Centraliza e espalha
        const y = isHQ ? 0 : 300;

        return {
            id: ws.id,
            type: 'parent', // Usando o tipo 'parent' já existente para consistência visual
            position: { x, y },
            data: {
                label: ws.name,
                type: 'parent',
            },
        };
    });
}

export default async function DashboardPage() {
    const initialNodes = await getNodes();

    // Cria conexões (exemplo simples: todos ligados ao Headquarters se existirem)
    // Nota: Em um cenário real, as arestas (edges) também viriam da API ou seriam inferidas
    const initialEdges: Edge[] = initialNodes
        .filter(n => n.id !== 'headquarters')
        .map(n => ({
            id: `e-headquarters-${n.id}`,
            source: 'headquarters',
            target: n.id,
            animated: true,
            style: { stroke: '#9333ea' }, // Roxo
            markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' },
        }));

    return (
        <div className="w-full h-full relative">
            {/* Overlay header */}
            <div className="absolute top-24 md:top-6 left-6 z-20 pointer-events-none">
                
                
            </div>

            {/* Graph View */}
            <GraphView initialNodes={initialNodes} initialEdges={initialEdges} />
        </div>
    );
}

