import { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HeroSection } from '../components/sections/HeroSection'
import { TodoSection } from '../components/sections/TodoSection'
import { GoodThingsSection } from '../components/sections/GoodThingsSection'
import { ContactSection } from '../components/sections/ContactSection'
import { AuthModal } from '../components/auth/AuthModal'
import { KeyboardShortcutsHelp } from '../components/ui/KeyboardShortcutsHelp'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import type { Shortcut } from '../hooks/useKeyboardShortcuts'
import { useAuth } from '../hooks/useAuth'

export default function HomePage() {
  const { openAuthModal, user } = useAuth()
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const shortcuts: Shortcut[] = [
    {
      key: '1',
      alt: true,
      handler: () => scrollTo('hero'),
      description: 'Go to Hero section',
      label: 'Alt+1',
    },
    {
      key: '2',
      alt: true,
      handler: () => scrollTo('todo'),
      description: 'Go to To-do list',
      label: 'Alt+2',
    },
    {
      key: '3',
      alt: true,
      handler: () => scrollTo('good-things'),
      description: 'Go to Good Things',
      label: 'Alt+3',
    },
    {
      key: '4',
      alt: true,
      handler: () => scrollTo('contact'),
      description: 'Go to Contact',
      label: 'Alt+4',
    },
    {
      key: '?',
      handler: () => setIsHelpOpen((p) => !p),
      description: 'Toggle this help panel',
      label: '?',
    },
    {
      key: 'Escape',
      allowInInput: true,
      handler: () => {
        if (isHelpOpen) setIsHelpOpen(false)
      },
      description: 'Close modal',
      label: 'Esc',
    },
    {
      key: '/',
      ctrl: true,
      allowInInput: true,
      handler: () => {
        if (!user) {
          openAuthModal()
        } else {
          document
            .querySelector<HTMLInputElement>('#todo input[type="text"]')
            ?.focus()
        }
      },
      description: user ? 'Focus task input' : 'Open sign-in',
      label: 'Ctrl+/',
    },
  ]

  useKeyboardShortcuts(shortcuts)

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TodoSection />
        <GoodThingsSection />
        <ContactSection />
      </main>
      <Footer />
      <AuthModal />
      {isHelpOpen && (
        <KeyboardShortcutsHelp
          shortcuts={shortcuts}
          onClose={() => setIsHelpOpen(false)}
        />
      )}
    </>
  )
}
