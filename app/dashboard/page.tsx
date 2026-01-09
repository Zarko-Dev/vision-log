"use client";

import React, { useEffect, useState } from 'react';
import GraphView from '../components/graph/GraphView';
import { Node, Edge, MarkerType } from '@xyflow/react';
import { ApiService } from '../services/api';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const [initialNodes, setInitialNodes] = useState<Node[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                // Tenta carregar os nós da API
                const rawNodes = await ApiService.get<any[]>('/nodes');
                
                if (Array.isArray(rawNodes) && rawNodes.length > 0) {
                     const mappedNodes: Node[] = rawNodes.map(node => ({
                        id: node.id,
                        type: node.type || 'parent',
                        position: { x: node.x || 0, y: node.y || 0 },
                        data: { 
                            label: node.label || 'Sem Nome', 
                            type: node.type || 'parent',
                            parentId: node.parentId 
                        },
                        parentId: node.parentId || undefined,
                    }));
                    setInitialNodes(mappedNodes);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [router]);

    // Cria conexões (pode ser expandido futuramente baseada em parentId)
    const initialEdges: Edge[] = [];

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

