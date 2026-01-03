import { NextRequest, NextResponse } from 'next/server';
import { ApiService } from '@/app/services/api';

interface NodePositionUpdate {
  x: number;
  y: number;
  parentId?: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    const { id: nodeId } = await params;
    const body: NodePositionUpdate = await request.json();

    // Validação básica
    if (typeof body.x !== 'number' || typeof body.y !== 'number') {
      return NextResponse.json(
        { error: 'x e y devem ser números' },
        { status: 400 }
      );
    }

    // Proxy para o backend real usando ApiService
    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const result = await ApiService.patch(`/nodes/${nodeId}`, {
            x: body.x,
            y: body.y,
            parentId: body.parentId
        }, { headers } as any);

        return NextResponse.json(result || { success: true });
    } catch (apiError) {
        console.error(`Erro na API externa para nó ${nodeId}:`, apiError);
        // Fallkback ou erro
        return NextResponse.json(
            { error: 'Falha ao comunicar com o backend de visão' },
            { status: 502 }
        );
    }

  } catch (error) {
    console.error('Erro ao processar requisição de atualização do nó:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar requisição' },
      { status: 500 }
    );
  }
}

