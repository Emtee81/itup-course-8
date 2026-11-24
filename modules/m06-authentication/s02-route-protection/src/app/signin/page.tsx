import { Suspense } from 'react'
import SignInForm from './SignInForm'
import styles from '../auth.module.css'

export default function SignInPage() {
  return (
    <main className={styles.page}>
      <h1>Sign in</h1>
      <p className={styles.muted}>Demo users: ana@example.com or rui@example.com, password: password123</p>
      <Suspense fallback={<p>Loading...</p>}>
        <SignInForm />
      </Suspense>
    </main>
  )
}
