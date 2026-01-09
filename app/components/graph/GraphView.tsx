"use client";

import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  OnNodeDrag,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './nodeTypes';
import { ParentNodeData } from './ParentNode';
import { CategoryNodeData } from './CategoryNode';
import { ItemNodeData } from './ItemNode';
import { ApiService } from '../../services/api';

type GraphNodeData = ParentNodeData | CategoryNodeData | ItemNodeData;

interface GraphViewProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

// Dimensões padrão dos nós (baseado nos componentes)
const NODE_DIMENSIONS = {
  parent: { width: 200, height: 120 },
  category: { width: 160, height: 100 },
  item: { width: 120, height: 100 },
};

// Função auxiliar para verificar se um ponto está dentro de um retângulo
function isPointInsideRect(
  point: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

function GraphContent({ initialNodes = [], initialEdges = [] }: GraphViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDragging, setIsDragging] = useState(false);
  const { screenToFlowPosition, fitView } = useReactFlow();

  // Sincroniza nós iniciais quando mudam (importante para atualização dinâmica)
  useEffect(() => {
    // Força a atualização com os dados do mock sempre que o componente montar ou os dados mudarem
    setNodes(initialNodes);
    setEdges(initialEdges);
    
    // Ajusta a visualização para mostrar todos os nós
    const timer = setTimeout(() => {
            fitView({ duration: 800, padding: 0.2 });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Função para atualizar a posição no backend
  const updateNodePosition = useCallback(async (nodeId: string, x: number, y: number, parentId?: string) => {
    try {
      await ApiService.patch(`/nodes/${nodeId}`, { x, y, parentId });
    } catch (error) {
      console.error('Erro ao atualizar posição do nó:', error);
    }
  }, []);

  // Função para encontrar o nó pai mais próximo quando um item é arrastado
  const findParentNode = useCallback((draggedNode: Node): Node | null => {
    const draggedData = draggedNode.data as unknown as GraphNodeData;
    
    // Apenas items podem ter pais
    if (draggedData.type !== 'item') {
      return null;
    }

    // Encontra os nós pais (parent) que podem receber filhos
    const parentNodes = nodes.filter(
      (node) => (node.data as unknown as GraphNodeData).type === 'parent'
    );

      // Dimensões do nó arrastado
      const draggedDims = NODE_DIMENSIONS[draggedData.type];
      const draggedCenter = {
        x: draggedNode.position.x + draggedDims.width / 2,
        y: draggedNode.position.y + draggedDims.height / 2,
      };

      // Verifica se o centro está dentro de algum nó pai
      for (const parentNode of parentNodes) {
        const parentData = parentNode.data as unknown as GraphNodeData;
      const parentDims = NODE_DIMENSIONS[parentData.type];
      
      const parentRect = {
        x: parentNode.position.x,
        y: parentNode.position.y,
        width: parentDims.width,
        height: parentDims.height,
      };

      if (isPointInsideRect(draggedCenter, parentRect)) {
        return parentNode;
      }
    }

    return null;
  }, [nodes]);

  // Handler quando o nó é solto após ser arrastado
  const onNodeDragStop: OnNodeDrag = useCallback(
    async (event, node) => {
      setIsDragging(false);
      
      const nodeData = node.data as unknown as GraphNodeData;
      const newParent = findParentNode(node);

      // Atualiza o parentId se necessário
      if (newParent) {
        const updatedNodes = nodes.map((n) =>
          n.id === node.id
            ? {
                ...n,
                data: { ...n.data, parentId: newParent.id },
              }
            : n
        );
        setNodes(updatedNodes);

        // Atualiza no backend
        await updateNodePosition(node.id, node.position.x, node.position.y, newParent.id);
      } else {
        // Se não há pai, remove o parentId
        if (nodeData.parentId) {
          const updatedNodes = nodes.map((n) =>
            n.id === node.id
              ? {
                  ...n,
                  data: { ...n.data, parentId: undefined },
                }
              : n
          );
          setNodes(updatedNodes);
        }

        // Atualiza no backend
        await updateNodePosition(node.id, node.position.x, node.position.y);
      }
    },
    [nodes, setNodes, findParentNode, updateNodePosition]
  );

  const onNodeDrag: OnNodeDrag = useCallback(() => {
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  // State para o Modal de Criação
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeName, setNodeName] = useState('');

  // Abre o modal
  const openModal = useCallback(() => {
     setNodeName('');
     setIsModalOpen(true);
  }, []);

  const handleCreateNode = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!nodeName.trim()) return;

    // Se for o primeiro nó, centraliza em (0,0), senão usa o centro da tela
    let position = { x: 0, y: 0 };
    
    if (nodes.length > 0) {
        const center = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });
        position = { x: center.x - 100, y: center.y - 60 };
    }

    const id = `node-${Date.now()}`;

    const payload = {
        id,
        label: nodeName,
        type: 'parent',
        x: Math.round(position.x),
        y: Math.round(position.y)
    };

    try {
        const createdNode = await ApiService.post<any>('/nodes', payload);
        
        const newNode: Node = {
          id: createdNode.id,
          type: createdNode.type || 'parent',
          position: { x: createdNode.x, y: createdNode.y },
          data: { 
            label: createdNode.label,
            type: createdNode.type || 'parent' 
          },
        };
        
        setNodes((nds) => [...nds, newNode]);
        setIsModalOpen(false);
        setNodeName('');

        // Foca no novo nó
        setTimeout(() => {
            fitView({ nodes: [{ id: newNode.id }], duration: 800, padding: 0.5 });
        }, 100);

    } catch (error) {
        console.error('Erro ao criar nó:', error);
        // Aqui você poderia adicionar uma notificação de erro para o usuário
    }
  }, [nodeName, nodes.length, setNodes, screenToFlowPosition, fitView]);

  return (
    <div className="w-full h-full relative" style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        className="bg-neutral-50 dark:bg-neutral-950"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {/* Empty State Overlay */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
             <div className="pointer-events-auto flex flex-col items-center gap-4 translate-y-48">
                <span className="text-neutral-600 dark:text-neutral-400 font-medium mt-10">Crie seu primeiro Node</span>
                <button 
                    onClick={openModal}
                    className="w-48 h-24 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl flex items-center justify-center text-neutral-500 dark:text-neutral-500 hover:border-black dark:hover:border-purple-500 hover:text-black dark:hover:text-purple-500 transition-all bg-white/50 dark:bg-black/20 backdrop-blur-sm"
                >
                    + Criar nó
                </button>
             </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      {nodes.length > 0 && (
        <button 
            onClick={openModal}
            className="absolute bottom-8 right-8 w-14 h-14 bg-black dark:bg-purple-600 rounded-full text-white shadow-xl shadow-black/20 dark:shadow-purple-900/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
        >
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
            </svg>
        </button>
      )}

      {/* Creation Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-neutral-200 dark:border-white/10 animate-in fade-in zoom-in duration-200">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Novo Nó</h3>
                <form onSubmit={handleCreateNode}>
                    <div className="mb-6">
                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">Nome do Nó</label>
                        <input 
                            autoFocus
                            type="text"
                            placeholder="Ex: Almoxarifado, Garagem..."
                            className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-black/50 border border-transparent focus:border-black dark:focus:border-purple-500 outline-none text-neutral-900 dark:text-white transition-all placeholder:text-neutral-400"
                            value={nodeName}
                            onChange={e => setNodeName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={!nodeName.trim()}
                            className="px-6 py-2 text-sm font-bold bg-black dark:bg-purple-600 text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-neutral-500/10 dark:shadow-purple-900/20"
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
         </div>
       )}
    </div>
  );
}

export default function GraphView(props: GraphViewProps) {
    return (
        <ReactFlowProvider>
            <GraphContent {...props} />
        </ReactFlowProvider>
    );
}

