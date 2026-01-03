import { NextRequest, NextResponse } from 'next/server';
import { ApiService } from '@/app/services/api';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    const headers: Record<string, string> = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const logs = await ApiService.get('/logs', { headers } as any);
    return NextResponse.json(logs);
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar logs do sistema' },
      { status: 500 }
    );
  }
}
