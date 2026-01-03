"use client";

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Building2 } from 'lucide-react';

export interface ParentNodeData extends Record<string, unknown> {
  type: 'parent';
  label: string;
  parentId?: string;
}

export default function ParentNode(props: NodeProps) {
  const data = props.data as ParentNodeData;
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-purple-600/50 p-4 min-w-[200px] min-h-[120px] flex flex-col items-center justify-center gap-2 hover:shadow-xl transition-shadow">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500"
      />
      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
        <Building2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      </div>
      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 text-center">
        {data.label}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-500"
      />
    </div>
  );
}

