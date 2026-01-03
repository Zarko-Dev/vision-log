import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the route starts with /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check for auth_token cookie
    const token = request.cookies.get('auth_token')?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
