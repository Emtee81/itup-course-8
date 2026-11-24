'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import SignOutButton from './SignOutButton'
import styles from '@/app/auth.module.css'

export default function UserStatus() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  if (!session) {
    return (
      <p>
        You are not signed in. <Link href="/signin" style={{ textDecoration: 'underline' }}>Sign in</Link>
      </p>
    )
  }

  return (
    <div className={styles.card}>
      <p>Signed in as <strong>{session.user.name}</strong> ({session.user.email})</p>
      <SignOutButton />
    </div>
  )
}
