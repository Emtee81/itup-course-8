import { NextResponse } from 'next/server'
import { withRole } from '@/lib/api-auth'
import { hasRole } from '@/lib/roles'
import { getTasks } from '@/lib/tasks'

export const GET = withRole('employee', async (request, session) => {
  const tasks = await getTasks()
  const visible = hasRole(session.user.role, 'manager')
    ? tasks
    : tasks.filter((task) => task.assigneeId === session.user.id)
  return NextResponse.json(visible)
})
