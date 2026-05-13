import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

export function proxy(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'anonymous';
  const path = request.nextUrl.pathname;

  if (path.startsWith('/api/auth') || path.startsWith('/login')) {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const limit = 5;

    const rateData = rateLimitMap.get(ip) || { count: 0, lastAttempt: now };

    if (now - rateData.lastAttempt > windowMs) {
      rateData.count = 0;
      rateData.lastAttempt = now;
    }

    if (rateData.count >= limit) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many attempts. Please try again in 15 minutes.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    rateData.count++;
    rateLimitMap.set(ip, rateData);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/login'],
};
