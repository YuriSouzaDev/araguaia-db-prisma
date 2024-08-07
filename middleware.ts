import { NextRequest, NextResponse } from 'next/server';
import verifyToken from './functions/verify-token';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('tokenAraguaia')?.value;
  const pathname = request.nextUrl.pathname;
  const authenticated = token ? await verifyToken(token) : false;

  if (!authenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (authenticated && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!authenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
