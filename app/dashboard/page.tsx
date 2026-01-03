"use client";

import React, { useEffect, useState } from 'react';
import GraphView from '../components/graph/GraphView';
import { Node, Edge, MarkerType } from '@xyflow/react';
import { ApiService } from '../services/api';
import { workspaces } from '../data/workspaces';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const [initialNodes, setInitialNodes] = useState<Node[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                // Tenta carregar os nós da API
                const nodes = await ApiService.get<Node[]>('/nodes');
                
                if (Array.isArray(nodes) && nodes.length > 0) {
                    setInitialNodes(nodes);
                } else {
                     // Fallback para dados estáticos
                     const staticNodes = workspaces.map((ws, index) => {
                        const isHQ = ws.id === 'headquarters';
                        const x = isHQ ? 0 : (index * 350) - 350;
                        const y = isHQ ? 0 : 300;
                        return {
                            id: ws.id,
                            type: 'parent',
                            position: { x, y },
                            data: { label: ws.name, type: 'parent' },
                        };
                    });
                     setInitialNodes(staticNodes);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
                
                // Em caso de erro (ex: 401), pode redirecionar para login ou usar fallback
                // Por enquanto, usamos fallback para não quebrar a UI
                const staticNodes = workspaces.map((ws, index) => {
                    const isHQ = ws.id === 'headquarters';
                    const x = isHQ ? 0 : (index * 350) - 350;
                    const y = isHQ ? 0 : 300;
                    return {
                        id: ws.id,
                        type: 'parent',
                        position: { x, y },
                        data: { label: ws.name, type: 'parent' },
                    };
                });
                setInitialNodes(staticNodes);

            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [router]);

    // Cria conexões (exemplo simples: todos ligados ao Headquarters se existirem)
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

    if (loading) {
         return (
            <div className="w-full h-full flex items-center justify-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
         );
    }

    return (
        <div className="w-full h-full relative">
            <div className="absolute top-24 md:top-6 left-6 z-20 pointer-events-none"></div>
            <GraphView initialNodes={initialNodes} initialEdges={initialEdges} />
        </div>
    );
}

