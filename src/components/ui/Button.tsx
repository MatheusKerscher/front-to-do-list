import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'cursor-pointer inline-flex items-center justify-center font-poppins font-semibold rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-primary hover:bg-primary-light text-white px-8 py-3 text-base focus-visible:outline-primary',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-base focus-visible:outline-primary',
    ghost:
      'text-dark hover:text-primary px-4 py-2 text-sm focus-visible:outline-primary',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
