export interface Task {
  id: number
  title: string
  assigneeId: string
}

const tasks: Task[] = [
  { id: 1, title: 'Plan the Q1 roadmap', assigneeId: '2' },
  { id: 2, title: 'Fix the login bug', assigneeId: '3' },
  { id: 3, title: 'Write the release notes', assigneeId: '3' },
]

export async function getTasks(): Promise<Task[]> {
  return tasks
}
