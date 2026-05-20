import { useState, useEffect } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'
import { useAuth } from '../../hooks/useAuth'
import { todoService } from '../../services/todoService'
import type { Todo } from '../../types'
import { TodoColumn } from '../todo/TodoColumn'
import { AddTodoInput } from '../todo/AddTodoInput'

export function TodoSection() {
  const { user, openAuthModal } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [activeItem, setActiveItem] = useState<Todo | null>(null)

  const pending = todos.filter((t) => !t.done)
  const done = todos.filter((t) => t.done)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const data = await todoService.getAll()
        if (!cancelled) setTodos(data)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user])

  async function handleAdd(title: string) {
    const created = await todoService.create(title)
    setTodos((prev) => [created, ...prev])
  }

  async function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
    try {
      const updated = await todoService.toggle(id)
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      )
    }
  }

  async function handleUpdate(id: string, title: string) {
    const updated = await todoService.update(id, title)
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
  }

  async function handleDelete(id: string) {
    await todoService.remove(id)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function handleReorder(reordered: Todo[], isDone: boolean) {
    if (isDone) {
      setTodos((prev) => [...prev.filter((t) => !t.done), ...reordered])
    } else {
      setTodos((prev) => [...reordered, ...prev.filter((t) => t.done)])
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const item = todos.find((t) => t.id === String(event.active.id))
    setActiveItem(item ?? null)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null)
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    const activeItem = todos.find((t) => t.id === activeId)
    if (!activeItem) return

    let targetDone: boolean
    if (overId === 'droppable-todo') {
      targetDone = false
    } else if (overId === 'droppable-done') {
      targetDone = true
    } else {
      targetDone = todos.find((t) => t.id === overId)?.done ?? activeItem.done
    }

    if (activeItem.done !== targetDone) {
      handleToggle(activeId)
    } else {
      if (activeId === overId) return
      const column = activeItem.done ? done : pending
      const oldIndex = column.findIndex((t) => t.id === activeId)
      const newIndex = column.findIndex((t) => t.id === overId)
      if (oldIndex !== -1 && newIndex !== -1) {
        handleReorder(arrayMove(column, oldIndex, newIndex), activeItem.done)
      }
    }
  }

  async function eraseAll(which: 'pending' | 'done') {
    const targets = which === 'pending' ? pending : done
    await Promise.all(targets.map((t) => todoService.remove(t.id)))
    setTodos((prev) =>
      prev.filter((t) => (which === 'pending' ? t.done : !t.done)),
    )
  }

  return (
    <div id="todo" className="relative" aria-label="To-do list section">
      <div
        className="relative w-full flex items-center justify-center text-center overflow-hidden bg-black"
        style={{
          minHeight: '280px',
          clipPath: 'polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)',
          padding: '100px 24px',
        }}
      >
        <div>
          <h2
            className="text-white font-poppins font-semibold text-[clamp(36px,5vw,60px)]"
            style={{ marginBottom: '8px' }}
          >
            To-do List
          </h2>
          <div
            className="mx-auto mb-6 bg-primary"
            style={{ width: '297px', height: '4px' }}
            aria-hidden="true"
          />
          <p className="text-white max-w-150 mx-auto font-montserrat font-normal text-[clamp(16px,2vw,24px)]">
            Drag and drop to set your main priorities, check when done and
            create what´s new.
          </p>
        </div>
      </div>

      <div className="absolute left-0 h-72 w-32 bottom-[18%]">
        <div
          className="absolute inset-0 bg-primary rounded-br-sm"
          style={{ clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)' }}
        />
      </div>

      <div className="absolute left-0 h-56 w-24 bottom-[20%] z-10">
        <div
          className="absolute inset-0 bg-secondary rounded-br-sm"
          style={{ clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)' }}
        />
      </div>

      <section className="bg-white py-16 px-4" aria-label="Task lists">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="max-w-200 mx-auto flex flex-col lg:flex-row gap-8 items-start">
            <TodoColumn
              id="droppable-todo"
              title="To-do"
              subtitle={
                user ? (
                  <>
                    Take a breath.
                    <br />
                    Start doing.
                  </>
                ) : (
                  'Sign in to see your tasks.'
                )
              }
              barClassName="bg-orange"
              todos={pending}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onEraseAll={user ? () => eraseAll('pending') : undefined}
              emptyMessage="Add your first task above."
              headerSlot={user ? <AddTodoInput onAdd={handleAdd} /> : undefined}
              contentSlot={
                !user ? (
                  <div className="py-8 text-center">
                    <p className="font-montserrat text-sm text-gray mb-4">
                      Sign in to manage your tasks.
                    </p>
                    <button
                      onClick={openAuthModal}
                      className="font-montserrat font-semibold text-sm text-primary underline"
                    >
                      Sign in
                    </button>
                  </div>
                ) : loading ? (
                  <p className="font-montserrat text-sm text-gray py-4">
                    Loading...
                  </p>
                ) : undefined
              }
            />

            {user && (
              <TodoColumn
                id="droppable-done"
                title="Done"
                subtitle={
                  done.length > 0 ? (
                    <>
                      Congratulations!
                      <br />
                      <strong>
                        You have done {done.length} task
                        {done.length !== 1 ? 's' : ''}
                      </strong>
                    </>
                  ) : (
                    'Congratulations!'
                  )
                }
                barClassName="bg-primary"
                todos={done}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onEraseAll={() => eraseAll('done')}
              />
            )}
          </div>

          <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
            {activeItem ? (
              <div
                className="flex items-center gap-3 px-4 py-3 bg-white rounded shadow-2xl cursor-grabbing border-l-4"
                style={{
                  borderLeftColor: activeItem.done ? '#4ac959' : '#e78c38',
                  rotate: '1.5deg',
                  opacity: 0.97,
                }}
              >
                <span
                  className="shrink-0 rounded-full border-2 flex items-center justify-center"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderColor: activeItem.done ? '#4ac959' : '#e78c38',
                    backgroundColor: activeItem.done
                      ? '#4ac959'
                      : 'transparent',
                  }}
                >
                  {activeItem.done && (
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 5l3 3 7-7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 opacity-40"
                >
                  <circle cx="3" cy="3" r="1.5" fill="#424242" />
                  <circle cx="7" cy="3" r="1.5" fill="#424242" />
                  <circle cx="3" cy="8" r="1.5" fill="#424242" />
                  <circle cx="7" cy="8" r="1.5" fill="#424242" />
                  <circle cx="3" cy="13" r="1.5" fill="#424242" />
                  <circle cx="7" cy="13" r="1.5" fill="#424242" />
                </svg>

                <span
                  className={`flex-1 font-montserrat text-base ${activeItem.done ? 'line-through text-gray' : 'text-dark'}`}
                >
                  {activeItem.text}
                </span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </section>
    </div>
  )
}
