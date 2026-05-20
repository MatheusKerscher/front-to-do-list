import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

const schema = z
  .object({
    name: z
      .string('Name must be at least 2 characters')
      .min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email'),
    password: z
      .string('Password must be at least 8 characters')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character',
      ),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  })

type FormData = z.infer<typeof schema>

interface RegisterFormProps {
  isOpen: boolean
  onSuccess: () => void
}

export function RegisterForm({ isOpen, onSuccess }: RegisterFormProps) {
  const { register: registerUser } = useAuth()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onTouched' })

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen)
    if (isOpen) {
      reset()
      setServerError('')
    }
  }

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      await registerUser(data.name, data.email, data.password)
      onSuccess()
    } catch {
      setServerError(
        'Error creating account. Check your details and try again.',
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
      aria-label="Registration form"
    >
      <Input
        id="register-name"
        label="Full name"
        placeholder="Your name"
        autoComplete="name"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        id="register-email"
        type="email"
        label="Email"
        placeholder="your@email.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="register-password"
        type="password"
        label="Password"
        placeholder="Min. 8 chars, A-z, 0-9, #$%..."
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        id="register-confirm"
        type="password"
        label="Confirm password"
        placeholder="Repeat password"
        autoComplete="new-password"
        error={errors.confirm?.message}
        {...register('confirm')}
      />

      {serverError && (
        <p
          role="alert"
          className="text-sm text-red-500 font-montserrat text-center"
        >
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  )
}
