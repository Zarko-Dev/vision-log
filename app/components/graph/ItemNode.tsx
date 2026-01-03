"use client";

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import Image from 'next/image';

export interface ItemNodeData extends Record<string, unknown> {
  type: 'item';
  label: string;
  parentId?: string;
  imageUrl?: string;
  quantity?: number;
}

export default function ItemNode(props: NodeProps) {
  const data = props.data as ItemNodeData;
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-neutral-200 dark:border-green-600/50 p-2 min-w-[120px] min-h-[100px] flex flex-col items-center justify-center gap-1 hover:shadow-lg transition-shadow relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2.5 h-2.5 bg-green-500"
      />
      
      {/* Mini foto do item */}
      <div className="w-16 h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center relative">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt={data.label}
            width={64}
            height={64}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
            📦
          </div>
        )}
        
        {/* Badge de quantidade */}
        {data.quantity !== undefined && data.quantity > 0 && (
          <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-neutral-900">
            {data.quantity > 99 ? '99+' : data.quantity}
          </div>
        )}
      </div>
      
      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 text-center px-1">
        {data.label}
      </span>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2.5 h-2.5 bg-green-500"
      />
    </div>
  );
}

