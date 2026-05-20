import { useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Todo } from '../../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => Promise<void>
  onUpdate: (id: string, title: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)
  const [hovered, setHovered] = useState(false)
  const [checkHovered, setCheckHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  async function saveEdit() {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== todo.text) {
      await onUpdate(todo.id, trimmed)
    } else {
      setEditValue(todo.text)
    }
    setEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') {
      setEditValue(todo.text)
      setEditing(false)
    }
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 py-3 border-b border-gray-light/40 last:border-b-0 min-h-10"
    >
      <button
        onClick={() => onToggle(todo.id)}
        onMouseEnter={() => !todo.done && setCheckHovered(true)}
        onMouseLeave={() => setCheckHovered(false)}
        role="checkbox"
        aria-checked={todo.done}
        aria-label={todo.done ? 'Uncheck' : 'Mark as done'}
        className="shrink-0 rounded-full border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center justify-center"
        style={{
          width: '24px',
          height: '24px',
          borderColor: todo.done
            ? '#4ac959'
            : checkHovered
              ? '#4ac959'
              : '#e78c38',
          backgroundColor: todo.done ? '#4ac959' : 'transparent',
        }}
      >
        {(todo.done || checkHovered) && (
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 5l3 3 7-7"
              stroke={todo.done ? 'white' : '#4ac959'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
            {...attributes}
            {...listeners}
            aria-label="Drag"
            className="shrink-0 opacity-30 hover:opacity-60 cursor-grab active:cursor-grabbing p-0.5"
            tabIndex={-1}
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="3" cy="3" r="1.5" fill="#424242" />
              <circle cx="7" cy="3" r="1.5" fill="#424242" />
              <circle cx="3" cy="8" r="1.5" fill="#424242" />
              <circle cx="7" cy="8" r="1.5" fill="#424242" />
              <circle cx="3" cy="13" r="1.5" fill="#424242" />
              <circle cx="7" cy="13" r="1.5" fill="#424242" />
            </svg>
          </button>

        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            aria-label="Edit task"
            className="flex-1 font-montserrat text-base bg-transparent border-b focus:outline-none py-0.5"
            style={{ color: '#e38c3e', borderBottomColor: '#e78c38' }}
          />
        ) : (
          <button
            onClick={() => !todo.done && setEditing(true)}
            aria-label={`Edit: ${todo.text}`}
            className={`flex-1 text-left font-montserrat text-base focus-visible:outline-none ${
              todo.done ? 'line-through text-gray' : 'text-dark'
            }`}
          >
            {todo.text}
          </button>
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`Delete: ${todo.text}`}
        className="shrink-0 font-montserrat font-bold text-xs text-gray transition-opacity focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-red-400"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        delete
      </button>
    </li>
  )
}
