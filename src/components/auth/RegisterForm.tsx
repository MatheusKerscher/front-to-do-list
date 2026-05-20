import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  })

type FormData = z.infer<typeof schema>

interface RegisterFormProps {
  onSuccess: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register: registerUser } = useAuth()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onTouched' })

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
        placeholder="Min. 6 characters"
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
