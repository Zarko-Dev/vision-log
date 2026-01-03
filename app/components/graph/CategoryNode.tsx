"use client";

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Package } from 'lucide-react';

export interface CategoryNodeData extends Record<string, unknown> {
  type: 'category';
  label: string;
  parentId?: string;
  color?: string;
}

export default function CategoryNode(props: NodeProps) {
  const data = props.data as CategoryNodeData;
  const bgColor = data.color || 'bg-blue-500';
  const iconColor = 'text-white';

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md border-2 border-neutral-200 dark:border-blue-600/50 p-3 min-w-[160px] min-h-[100px] flex flex-col items-center justify-center gap-2 hover:shadow-lg transition-shadow">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
        <Package className={`w-6 h-6 ${iconColor}`} />
      </div>
      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 text-center">
        {data.label}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
}

