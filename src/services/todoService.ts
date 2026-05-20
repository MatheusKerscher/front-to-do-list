import api from './api'
import type { Todo } from '../types'

export const todoService = {
  async getAll(): Promise<Todo[]> {
    const { data } = await api.get<{ todos: Todo[] }>('/to-do')
    return data.todos
  },

  async create(text: string): Promise<Todo> {
    const { data } = await api.post<{ todo: Todo }>('/to-do', { text })
    return data.todo
  },

  async update(id: string, text: string): Promise<Todo> {
    const { data } = await api.put<{ todo: Todo }>(`/to-do/${id}`, { text })
    return data.todo
  },

  async toggle(id: string): Promise<Todo> {
    const { data } = await api.patch<{ todo: Todo }>(`/to-do/${id}/check`)
    return data.todo
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/to-do/${id}`)
  },
}
