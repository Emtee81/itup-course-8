import bcrypt from 'bcryptjs'
import type { Role } from '@/lib/roles'

interface DemoUser {
  id: string
  name: string
  email: string
  passwordHash: string
  role: Role
}

const users: DemoUser[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@example.com',
    passwordHash: '$2b$10$XeHdhuwRyZlTMTOXwZTk2O2LVpVrzi79OB3C73EBoM//PraDLtTdu',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Marta Lopes',
    email: 'marta@example.com',
    passwordHash: '$2b$10$/jLpMbdnZ3ItfekxEQsZ0eKP2axkSwoDpD08/tIr.9//AegD9eZyq',
    role: 'manager',
  },
  {
    id: '3',
    name: 'Rui Costa',
    email: 'rui@example.com',
    passwordHash: '$2b$10$2ejQMSC26rywnV0XtWTRueCUgo.87dakP595G5OYhB7FNSXEya7rK',
    role: 'employee',
  },
]

export async function verifyUserCredentials(email: string, password: string) {
  const user = users.find((u) => u.email === email.toLowerCase())
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) return null

  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

export async function listUsers() {
  return users.map(({ id, name, email, role }) => ({ id, name, email, role }))
}
