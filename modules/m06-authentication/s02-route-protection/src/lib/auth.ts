import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { redirect } from 'next/navigation'
import { verifyUserCredentials } from '@/lib/users'
import { hasRole, type Role } from '@/lib/roles'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        return verifyUserCredentials(credentials.email, credentials.password)
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
}

export function getSession() {
  return getServerSession(authOptions)
}

export async function requireRole(role: Role, callbackUrl: string) {
  const session = await getSession()
  if (!session) redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  if (!hasRole(session.user.role, role)) redirect('/unauthorized')
  return session
}
