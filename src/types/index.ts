export interface User {
  id: string
  name: string
  email: string
  created_at?: string
}

export interface Todo {
  id: string
  text: string
  done: boolean
  order: number
}

export type Tab = 'login' | 'register'

export interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
