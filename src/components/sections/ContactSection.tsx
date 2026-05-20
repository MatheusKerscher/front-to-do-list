import { useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../services/api'
import emailIcon from '../../assets/email-icon.svg'

const schema = z.object({
  name: z
    .string('Name must be at least 2 characters')
    .min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email'),
  phone: z
    .string('Invalid phone — use (XX) XXXX-XXXX or (XX) XXXXX-XXXX')
    .min(14, 'Invalid phone — use (XX) XXXX-XXXX or (XX) XXXXX-XXXX'),
  message: z
    .string('Message must be at least 10 characters')
    .min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  const ddd = digits.slice(0, 2)
  const rest = digits.slice(2)
  if (rest.length <= 4) return `(${ddd}) ${rest}`
  if (rest.length <= 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`
}

const fieldBase =
  'rounded w-full bg-white border px-4 py-3 font-montserrat text-base text-dark placeholder-gray focus:outline-none focus:border-primary transition-colors'

function fieldClass(hasError: boolean): string {
  return `${fieldBase} ${hasError ? 'border-red-500' : 'border-gray-light'}`
}

const labelClass = 'block mb-1 font-montserrat font-normal text-base text-navy'

export function ContactSection() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

  const messageValue = useWatch({ control, name: 'message', defaultValue: '' })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      await api.post('/contact', {
        ...data,
        phone: data.phone.replace(/\D/g, ''),
      })
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="mb-60 md:mb-40 mt-20 px-6 md:px:0 flex justify-center"
      aria-label="Contact"
    >
      <div className="max-w-175 w-175 h-175 mx-auto">
        <div
          className="relative flex justify-center mb-0"
          style={{ height: '100px' }}
        >
          <div
            className="absolute bg-contact"
            style={{
              width: '170px',
              height: '24px',
              top: '50px',
              left: '40%',
              transform: 'translateX(-50%)',
            }}
            aria-hidden="true"
          />

          <div
            className="absolute rounded-full overflow-hidden w-47 h-47"
            style={{ top: '-45px' }}
          >
            <img
              src="/images/contact.png"
              alt="Our team"
              className="w-full h-full object-cover object-top"
              width={191}
              height={191}
            />
          </div>
        </div>

        <div className="bg-white shadow-xl pt-28 pb-10 px-10 rounded">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="flex items-center justify-center shrink-0 bg-primary w-14 h-14 rounded"
              aria-hidden="true"
            >
              <img
                src={emailIcon}
                alt=""
                className="object-cover"
              />
            </div>

            <p className="font-montserrat font-normal text-2xl text-navy uppercase tracking-wider leading-snug">
              GET IN
              <br />
              <strong>TOUCH</strong>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Contact form"
            className="flex flex-col gap-5"
          >
            <div>
              <label htmlFor="c-name" className={labelClass}>
                Your name
              </label>
              <input
                id="c-name"
                type="text"
                placeholder="type your name here..."
                autoComplete="name"
                className={fieldClass(!!errors.name)}
                {...register('name')}
              />
              {errors.name && (
                <span role="alert" className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="c-email" className={labelClass}>
                  Email*
                </label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="example@example.com"
                  autoComplete="email"
                  className={fieldClass(!!errors.email)}
                  {...register('email')}
                />
                {errors.email && (
                  <span role="alert" className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="c-phone" className={labelClass}>
                  Telephone*
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="c-phone"
                      type="tel"
                      placeholder="(XX) XXXXX-XXXX"
                      autoComplete="tel"
                      className={fieldClass(!!errors.phone)}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        field.onChange(maskPhone(e.target.value))
                      }
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />
                {errors.phone && (
                  <span role="alert" className="text-xs text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="c-message" className={labelClass}>
                Message*
              </label>
              <textarea
                id="c-message"
                rows={6}
                placeholder="Type what you want to say to us"
                className={`${fieldClass(!!errors.message)} resize-none`}
                {...register('message')}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.message ? (
                  <span role="alert" className="text-xs text-red-500">
                    {errors.message.message}
                  </span>
                ) : (
                  <span />
                )}
                <span
                  className={`text-xs font-montserrat tabular-nums ${
                    messageValue.length >= 10 ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {messageValue.length} / 10
                </span>
              </div>
            </div>

            {status === 'success' && (
              <p
                role="alert"
                className="text-sm font-montserrat font-semibold text-primary text-center"
              >
                Message sent! We'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p
                role="alert"
                className="text-sm font-montserrat font-semibold text-red-500 text-center"
              >
                Failed to send. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center text-white disabled:opacity-60 transition-opacity rounded bg-contact font-montserrat font-bold text-base uppercase tracking-widest"
              style={{ height: '52px' }}
            >
              {status === 'loading' ? 'Sending...' : 'Send now'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
