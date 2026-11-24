'use client'

import { signOut } from 'next-auth/react'
import styles from '@/app/auth.module.css'

export default function SignOutButton() {
  return (
    <button className={styles.button} onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </button>
  )
}
