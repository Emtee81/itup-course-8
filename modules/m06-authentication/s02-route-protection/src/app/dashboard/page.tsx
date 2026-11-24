import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import SignOutButton from '@/components/SignOutButton'
import RoleNav from '@/components/RoleNav'
import styles from '../auth.module.css'

async function DashboardContent() {
  const session = await getSession()

  if (!session) {
    redirect('/signin?callbackUrl=/dashboard')
  }

  return (
    <div className={styles.card}>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
      <RoleNav />
      <SignOutButton />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Checking your session...</p>}>
        <DashboardContent />
      </Suspense>
    </main>
  )
}
