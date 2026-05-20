import type { ReactNode } from 'react'
import type { Todo } from '../../types'
import { TodoList } from './TodoList'

interface TodoColumnProps {
  id: string
  title: string
  subtitle: ReactNode
  barClassName: string
  todos: Todo[]
  onToggle: (id: string) => Promise<void>
  onUpdate: (id: string, text: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onEraseAll?: () => void
  emptyMessage?: string
  headerSlot?: ReactNode
  contentSlot?: ReactNode
}

export function TodoColumn({
  id,
  title,
  subtitle,
  barClassName,
  todos,
  onToggle,
  onUpdate,
  onDelete,
  onEraseAll,
  emptyMessage = '',
  headerSlot,
  contentSlot,
}: TodoColumnProps) {
  return (
    <div
      className="flex-1 w-full bg-white shadow-md z-50"
      style={{ minHeight: '400px' }}
    >
      <div className={`h-5 ${barClassName}`} aria-hidden="true" />

      <div className="p-6 flex flex-col h-full" style={{ minHeight: '380px' }}>
        <h3 className="text-black mb-1 text-center font-poppins font-semibold text-[40px] leading-none">
          {title}
        </h3>
        <p className="text-black mb-4 text-center font-montserrat text-[24px]">
          {subtitle}
        </p>

        {headerSlot}

        <div className="flex-1 mt-4">
          {contentSlot ?? (
            <TodoList
              id={id}
              todos={todos}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
              emptyMessage={emptyMessage}
            />
          )}
        </div>

        {onEraseAll && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={onEraseAll}
              className="flex items-center justify-center text-white bg-black hover:bg-gray-800 transition-colors font-montserrat font-semibold text-[24px]"
              style={{ width: '300px', height: '64px' }}
            >
              erase all
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
