import { Suspense } from 'react'
import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { getTasks } from '@/lib/tasks'
import styles from '../auth.module.css'

async function EmployeeContent() {
  const session = await requireRole('employee', '/employee')
  const tasks = (await getTasks()).filter((task) => task.assigneeId === session.user.id)

  return (
    <ul className={styles.card}>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  )
}

export default function EmployeePage() {
  return (
    <main className={styles.page}>
      <h1>My tasks</h1>
      <Suspense fallback={<p>Checking your access...</p>}>
        <EmployeeContent />
      </Suspense>
      <Link href="/dashboard">← Dashboard</Link>
    </main>
  )
}
