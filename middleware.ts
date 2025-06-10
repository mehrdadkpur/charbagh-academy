import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/jwt'

interface DecodedToken {
  role: string
}

const accessControl = [
  { prefix: '/user', roles: ['TEACHER', 'STUDENT', 'ADMIN'] },
  { prefix: '/dashboard', roles: ['ADMIN'] },
  { prefix: '/songs', roles: ['TEACHER', 'STUDENT', 'ADMIN'] },
  { prefix: '/api/admin', roles: ['ADMIN'] },
  { prefix: '/api/user', roles: ['TEACHER', 'STUDENT', 'ADMIN'] },
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = /mobile/i.test(userAgent)

  const route = accessControl.find(r => pathname.startsWith(r.prefix))

  if (!route) return NextResponse.next()

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const decoded = await verifyToken(token) as unknown as DecodedToken
    const { role } = decoded

    if (!route.roles.includes(role)) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (pathname.startsWith('/dashboard') && isMobile) {
      return NextResponse.redirect(new URL('/unaccess', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Token verification failed:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/user/:path*',
    '/dashboard/:path*',
    '/songs/:path*',
    '/api/admin/:path*',
    '/api/user/:path*'
  ]
}
