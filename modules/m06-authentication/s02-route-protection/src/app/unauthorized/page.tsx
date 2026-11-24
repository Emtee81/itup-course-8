import Link from 'next/link'
import styles from '../auth.module.css'

export default function UnauthorizedPage() {
  return (
    <main className={styles.page}>
      <h1>Access denied</h1>
      <Link href="/dashboard">← Dashboard</Link>
    </main>
  )
}
