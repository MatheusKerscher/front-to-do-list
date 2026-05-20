import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function Navbar() {
  const { user, logout, openAuthModal } = useAuth()
  const [logoutError, setLogoutError] = useState<string | null>(null)

  async function handleLogout() {
    setLogoutError(null)
    try {
      await logout()
    } catch {
      setLogoutError('Sign out failed. Please try again.')
    }
  }

  return (
    <header className="bg-white w-full">
      <nav
        className="max-w-7xl mx-auto px-8 h-17.5 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="/"
          aria-label="Coopers — home"
          className="flex items-center gap-2"
        >
          <img
            src="/images/coopers-logo.svg"
            alt=""
            aria-hidden="true"
            width="36"
            height="41"
          />
          <span className="text-black font-montserrat font-bold text-[28px] tracking-tight">
            coopers
          </span>
        </a>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-montserrat text-sm text-gray hidden sm:block">
              {user.name}
            </span>
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleLogout}
                className="bg-black text-white font-poppins font-semibold text-sm px-6 py-2.5 hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                sign out
              </button>
              {logoutError && (
                <span role="alert" className="text-xs text-red-500 font-montserrat">
                  {logoutError}
                </span>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={openAuthModal}
            className="bg-black text-white font-poppins font-semibold text-sm px-6 py-2.5 hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            sign in
          </button>
        )}
      </nav>
    </header>
  )
}
