import { Suspense } from 'react'
import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { getTasks } from '@/lib/tasks'
import styles from '../auth.module.css'

async function ManagerContent() {
  await requireRole('manager', '/manager')
  const tasks = await getTasks()

  return (
    <div className={styles.card}>
      <p>Tasks: {tasks.length}</p>
    </div>
  )
}

export default function ManagerPage() {
  return (
    <main className={styles.page}>
      <h1>Team reports</h1>
      <Suspense fallback={<p>Checking your access...</p>}>
        <ManagerContent />
      </Suspense>
      <Link href="/dashboard">← Dashboard</Link>
    </main>
  )
}
