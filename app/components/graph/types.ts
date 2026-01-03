// Tipos para os nós do Graph View

export type NodeType = 'parent' | 'category' | 'item';

export interface GraphNodeData {
  id: string;
  type: NodeType;
  label: string;
  parentId?: string;
  x: number;
  y: number;
  // Propriedades específicas por tipo
  imageUrl?: string; // Para ItemNode
  quantity?: number; // Para ItemNode
  color?: string; // Para CategoryNode
}

export interface GraphNode extends GraphNodeData {
  position: { x: number; y: number };
}

