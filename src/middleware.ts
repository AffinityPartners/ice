import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
  const isApiAdminRoute = request.nextUrl.pathname.startsWith('/api/admin');

  // Allow auth routes
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Check admin routes
  if (isAdminRoute || isApiAdminRoute) {
    if (!token) {
      // Redirect to sign in if not authenticated
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (token.role !== 'ADMIN') {
      // Redirect to unauthorized if not admin
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/auth/:path*',
  ],
};