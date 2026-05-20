import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import type { Tab } from '../../types'
import loginIconSrc from '../../assets/login-icon.svg'

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth()
  const [tab, setTab] = useState<Tab>('login')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAuthModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeAuthModal])

  if (!isAuthModalOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      role="dialog"
      aria-modal="true"
      aria-label={tab === 'login' ? 'Sign in to account' : 'Create account'}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal()
      }}
    >
      <div
        className="bg-white w-full max-w-170 relative shadow-xl flex flex-col"
        style={{ minHeight: '380px' }}
      >
        <button
          onClick={closeAuthModal}
          aria-label="Close"
          className="absolute top-4 right-4 font-montserrat text-sm text-black hover:font-semibold transition-all duration-300 ease-in-out z-10 cursor-pointer"
        >
          close
        </button>

        <div className="hidden sm:flex gap-5 items-center justify-center mt-4">
          <img
            src={loginIconSrc}
            alt="Authentication illustration"
            className="mb-4"
            style={{ width: '120px' }}
          />
          <div className="mb-6">
            <h2
              id="auth-modal-title"
              className="text-dark font-poppins font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1 }}
            >
              {tab === 'login' ? 'Sign in' : 'Sign up'}
            </h2>
            <p className="text-primary font-montserrat text-[20px]">
              {tab === 'login'
                ? 'to access your list'
                : 'to create your account'}
            </p>
          </div>
        </div>

        <div className="flex-1 px-8 pt-10 pb-10">
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setTab('login')}
              className={`pb-2 mr-6 font-montserrat font-semibold text-sm transition-colors border-b-2 ${
                tab === 'login'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab('register')}
              className={`pb-2 font-montserrat font-semibold text-sm transition-colors border-b-2 ${
                tab === 'register'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray'
              }`}
            >
              Register
            </button>
          </div>

          {tab === 'login' ? (
            <LoginForm onSuccess={closeAuthModal} />
          ) : (
            <RegisterForm onSuccess={closeAuthModal} />
          )}
        </div>
      </div>
    </div>
  )
}
