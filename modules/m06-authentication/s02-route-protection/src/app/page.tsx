import Link from 'next/link'
import UserStatus from '@/components/UserStatus'

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <UserStatus />
      <Link href="/dashboard">Dashboard</Link>
    </main>
  )
}
