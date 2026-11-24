'use client'

import Link from 'next/link'
import RoleGate from '@/components/RoleGate'

export default function RoleNav() {
  return (
    <nav>
      <RoleGate role="employee">
        <Link href="/employee">My tasks</Link>
      </RoleGate>
      <RoleGate role="manager">
        <Link href="/manager">Team reports</Link>
      </RoleGate>
      <RoleGate role="admin">
        <Link href="/admin">User management</Link>
      </RoleGate>
    </nav>
  )
}
