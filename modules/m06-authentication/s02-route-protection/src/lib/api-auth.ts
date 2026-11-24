import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { getSession } from '@/lib/auth'
import { hasRole, type Role } from '@/lib/roles'

type AuthorizedHandler = (request: NextRequest, session: Session) => Promise<Response>

export function withRole(role: Role, handler: AuthorizedHandler) {
  return async (request: NextRequest) => {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (!hasRole(session.user.role, role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    return handler(request, session)
  }
}
