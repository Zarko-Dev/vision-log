import { NextRequest, NextResponse } from 'next/server';
import { ApiService } from '@/app/services/api';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    const headers: Record<string, string> = {};
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const nodes = await ApiService.get('/nodes', { headers } as any); // Type cast rápido para evitar conflito com init options
    return NextResponse.json(nodes);
  } catch (error) {
    console.error('Erro ao buscar nós:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar nós do sistema' },
      { status: 500 }
    );
  }
}
