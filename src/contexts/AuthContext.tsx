import { useState, useEffect, type ReactNode } from 'react'
import { AuthContext } from './authContext'
import { authService } from '../services/authService'
import type { User } from '../types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    authService.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  async function login(email: string, password: string) {
    const { user: u } = await authService.login(email, password)
    setUser(u)
  }

  async function register(name: string, email: string, password: string) {
    const { user: u } = await authService.register(name, email, password)
    setUser(u)
  }

  async function logout() {
    try {
      await authService.logout()
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
