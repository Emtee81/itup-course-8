import { NextResponse } from 'next/server'
import { withRole } from '@/lib/api-auth'
import { listUsers } from '@/lib/users'

export const GET = withRole('admin', async (request, session) => {
  return NextResponse.json({ users: await listUsers(), requestedBy: session.user.email })
})
