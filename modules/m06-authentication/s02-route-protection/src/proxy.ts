import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { hasRole, type Role } from '@/lib/roles'

const protectedAreas: { prefix: string; role: Role }[] = [
  { prefix: '/admin', role: 'admin' },
  { prefix: '/manager', role: 'manager' },
  { prefix: '/employee', role: 'employee' },
]

export default withAuth(
  function proxy(req) {
    const area = protectedAreas.find((a) => req.nextUrl.pathname.startsWith(a.prefix))
    if (area && !hasRole(req.nextauth.token?.role, area.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: { signIn: '/signin' },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/manager/:path*', '/employee/:path*'],
}
