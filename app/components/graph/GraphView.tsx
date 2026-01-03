"use client";

import React, { useCallback, useState } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './nodeTypes';
import { ParentNodeData } from './ParentNode';
import { CategoryNodeData } from './CategoryNode';
import { ItemNodeData } from './ItemNode';

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

export default function GraphView({ initialNodes = [], initialEdges = [] }: GraphViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDragging, setIsDragging] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Função para atualizar a posição no backend
  const updateNodePosition = useCallback(async (nodeId: string, x: number, y: number, parentId?: string) => {
    try {
      const response = await fetch(`/api/nodes/${nodeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y, parentId }),
      });

      if (!response.ok) {
        console.error('Erro ao salvar posição do nó:', await response.text());
      }
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

  return (
    <div className="w-full h-full">
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
    </div>
  );
}

