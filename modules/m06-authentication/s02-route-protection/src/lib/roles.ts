export type Role = 'admin' | 'manager' | 'employee'

const rank: Record<Role, number> = { employee: 1, manager: 2, admin: 3 }

export function hasRole(userRole: Role | undefined, required: Role): boolean {
  return userRole !== undefined && rank[userRole] >= rank[required]
}
