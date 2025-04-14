import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminAuthMiddleware } from './middleware/adminAuth'

export async function middleware(request: NextRequest) {
  // Admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    return adminAuthMiddleware(request)
  }

  // Admin API routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    return adminAuthMiddleware(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}