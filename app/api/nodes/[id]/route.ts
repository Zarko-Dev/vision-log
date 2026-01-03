import { NextRequest, NextResponse } from 'next/server';

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
    const { id: nodeId } = await params;
    const body: NodePositionUpdate = await request.json();

    // Validação básica
    if (typeof body.x !== 'number' || typeof body.y !== 'number') {
      return NextResponse.json(
        { error: 'x e y devem ser números' },
        { status: 400 }
      );
    }

    // Aqui você integraria com seu backend Node.js
    // Por enquanto, apenas retornamos sucesso
    // Em produção, você faria algo como:
    // const response = await fetch(`http://seu-backend-nodejs/api/nodes/${nodeId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ x: body.x, y: body.y, parentId: body.parentId }),
    // });

    console.log(`Atualizando nó ${nodeId} com posição:`, {
      x: body.x,
      y: body.y,
      parentId: body.parentId,
    });

    return NextResponse.json({
      success: true,
      nodeId,
      position: { x: body.x, y: body.y },
      parentId: body.parentId,
    });
  } catch (error) {
    console.error('Erro ao atualizar posição do nó:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar posição do nó' },
      { status: 500 }
    );
  }
}

