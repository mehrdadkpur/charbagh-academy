import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/jwt'

interface DecodedToken {
  role: string
  isAdmin: boolean
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = /mobile/i.test(userAgent)

  const protectedRoutes = ['/user', '/dashboard', '/songs']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (!isProtected) return NextResponse.next()
  
  if (isMobile && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/unaccess', request.url))
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const decoded = await verifyToken(token) as unknown as DecodedToken
    const { role, isAdmin } = decoded

    if (isAdmin) return NextResponse.next()

    if (pathname.startsWith('/user') && ['TEACHER', 'STUDENT'].includes(role)) {
      return NextResponse.next()
    }

    if (pathname.startsWith('/dashboard') && role === 'ADMIN') {
      return NextResponse.next()
    }

    if (pathname.startsWith('/songs')) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Token verification failed:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/songs/:path*', '/dashboard/:path*', '/user/:path*']
}
