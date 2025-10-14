// middleware.js
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = req.nextUrl

  // Not logged in → redirect to login
  if (!token && pathname.startsWith('/canteenOwner')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Role-based route restriction
  if (pathname.startsWith('/canteenOwner') && token.role_id !== 2) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  if (!token && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/'), req.url)
  }

  if (pathname.startsWith('/admin') && token.role_id !== 3) {
    return NextResponse.redirect(new URL('/unauthorized'), req.url)
  }

  return NextResponse.next()
}

// Optional matcher: apply only to specific routes
export const config = {
  matcher: ['/canteenOwner/:path*', '/admin/:path*'],
}
