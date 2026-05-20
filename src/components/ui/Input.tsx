import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({
  label,
  error,
  id,
  className = '',
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-montserrat font-semibold text-dark"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border border-gray-light rounded px-4 py-3 font-montserrat text-base text-dark bg-white placeholder-gray focus:outline-none focus:border-primary transition-colors ${error ? 'border-red-500' : ''} ${className}`}
        {...rest}
      />
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-xs text-red-500 font-montserrat"
        >
          {error}
        </span>
      )}
    </div>
  )
}
