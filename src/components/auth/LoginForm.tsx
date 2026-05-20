import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Invalid password').min(1, 'Invalid password'),
})

type FormData = z.infer<typeof schema>

interface LoginFormProps {
  isOpen: boolean
  onSuccess: () => void
}

export function LoginForm({ isOpen, onSuccess }: LoginFormProps) {
  const { login } = useAuth()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onTouched' })

  useEffect(() => {
    if (isOpen) {
      reset()
      setServerError('')
    }
  }, [isOpen, reset])

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      await login(data.email, data.password)
      onSuccess()
    } catch {
      setServerError('Invalid email or password. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
      aria-label="Login form"
    >
      <Input
        id="login-email"
        type="email"
        label="Email"
        placeholder="your@email.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="login-password"
        type="password"
        label="Password"
        placeholder="••••••••"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
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
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
