import api from './api'
import type { User } from '../types'

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const { data } = await api.post<{ user: User }>('/auth/login', {
      email,
      password,
    })
    return data.user
  },

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    await api.post('/auth/register', { name, email, password })
  },

  async me(): Promise<User> {
    const { data } = await api.get<{ user: User }>('/auth/me')
    return data.user
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },
}
