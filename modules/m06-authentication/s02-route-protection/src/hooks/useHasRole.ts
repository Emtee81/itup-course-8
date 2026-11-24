'use client'

import { useSession } from 'next-auth/react'
import { hasRole, type Role } from '@/lib/roles'

export function useHasRole(role: Role) {
  const { data: session, status } = useSession()
  return { allowed: hasRole(session?.user.role, role), isLoading: status === 'loading' }
}
