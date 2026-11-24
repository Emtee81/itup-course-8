import { Suspense } from 'react'
import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { listUsers } from '@/lib/users'
import styles from '../auth.module.css'

async function AdminContent() {
  await requireRole('admin', '/admin')
  const users = await listUsers()

  return (
    <ul className={styles.card}>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email}) - {user.role}
        </li>
      ))}
    </ul>
  )
}

export default function AdminPage() {
  return (
    <main className={styles.page}>
      <h1>User management</h1>
      <Suspense fallback={<p>Checking your access...</p>}>
        <AdminContent />
      </Suspense>
      <Link href="/dashboard">← Dashboard</Link>
    </main>
  )
}
