import { useState, type KeyboardEvent } from 'react'

interface AddTodoInputProps {
  onAdd: (title: string) => Promise<void>
}

export function AddTodoInput({ onAdd }: AddTodoInputProps) {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    const trimmed = value.trim()
    if (!trimmed || loading) return
    setLoading(true)
    try {
      await onAdd(trimmed)
      setValue('')
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit()
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-light/50 pb-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Add new here..."
        aria-label="New task"
        disabled={loading}
        className="flex-1 font-montserrat font-bold text-base text-dark bg-transparent focus:outline-none placeholder-gray-light disabled:opacity-50"
      />
      <button
        onClick={submit}
        disabled={loading || !value.trim()}
        aria-label="Add task"
        className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-light flex items-center justify-center disabled:opacity-40 transition-opacity"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 1v10M1 6h10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}
