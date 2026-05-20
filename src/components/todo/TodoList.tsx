import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Todo } from '../../types'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  id: string
  todos: Todo[]
  onToggle: (id: string) => Promise<void>
  onUpdate: (id: string, title: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  emptyMessage?: string
}

export function TodoList({
  id,
  todos,
  onToggle,
  onUpdate,
  onDelete,
  emptyMessage = 'No tasks here.',
}: TodoListProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext
      items={todos.map((t) => t.id)}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="min-h-16">
        {todos.length === 0 ? (
          <p className="font-montserrat text-sm text-gray text-center py-8">
            {emptyMessage}
          </p>
        ) : (
          <ul className="list-none p-0">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </SortableContext>
  )
}
