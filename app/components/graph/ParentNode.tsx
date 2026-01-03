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
    <div className="group flex flex-col items-center relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500 top-0"
      />
      
      <div className="w-20 h-20 bg-white dark:bg-neutral-900 rounded-full shadow-lg border-2 border-neutral-200 dark:border-purple-600/50 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:border-purple-500 transition-all duration-300 relative z-10">
        <Building2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      </div>
      
      <span className="mt-2 text-xs font-bold text-neutral-600 dark:text-neutral-300 bg-white/50 dark:bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
        {data.label}
      </span>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-500 bottom-8"
      />
    </div>
  );
}

