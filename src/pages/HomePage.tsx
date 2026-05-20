import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HeroSection } from '../components/sections/HeroSection'
import { TodoSection } from '../components/sections/TodoSection'
import { GoodThingsSection } from '../components/sections/GoodThingsSection'
import { ContactSection } from '../components/sections/ContactSection'
import { AuthModal } from '../components/auth/AuthModal'

export default function HomePage() {
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
    </>
  )
}
