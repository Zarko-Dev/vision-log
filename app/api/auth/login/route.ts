import { NextRequest, NextResponse } from 'next/server';
import { ApiService } from '@/app/services/api';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email e senha são obrigatórios' },
                { status: 400 }
            );
        }

        // Realiza o login no backend
        // Assumindo que o backend retorna { token: string, user: ... } ou similar
        const loginResponse = await ApiService.post<{ token: string, user?: any }>('/login', {
            email,
            password
        });

        if (!loginResponse || !loginResponse.token) {
            console.error('Resposta de login inválida:', loginResponse);
            return NextResponse.json(
                { error: 'Falha na autenticação' },
                { status: 401 }
            );
        }

        const response = NextResponse.json({ success: true, user: loginResponse.user });

        // Define o cookie HTTP-Only
        response.cookies.set('auth_token', loginResponse.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            path: '/',
        });

        return response;

    } catch (error: any) {
        console.error('Erro no login:', error);
        return NextResponse.json(
            { error: error.message || 'Erro interno no servidor' },
            { status: 401 } // Assumindo que erro do ApiService é login falho e não 500
        );
    }
}
