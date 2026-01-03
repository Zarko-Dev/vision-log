import { Building2, Warehouse, Container, Home, LucideIcon } from 'lucide-react';

export interface WorkspaceData {
    id: string;
    name: string;
    icon: LucideIcon;
}

export const workspaces: WorkspaceData[] = [
    { id: 'headquarters', name: 'Headquarters', icon: Building2 },
    { id: 'galpao-a', name: 'Galpão A', icon: Warehouse },
    { id: 'garagem', name: 'Garagem', icon: Container },
];
