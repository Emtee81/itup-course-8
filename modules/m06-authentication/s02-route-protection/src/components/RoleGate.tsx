'use client'

import { useHasRole } from '@/hooks/useHasRole'
import type { Role } from '@/lib/roles'

interface RoleGateProps {
  role: Role
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function RoleGate({ role, children, fallback = null }: RoleGateProps) {
  const { allowed, isLoading } = useHasRole(role)
  if (isLoading) return null
  return allowed ? children : fallback
}
