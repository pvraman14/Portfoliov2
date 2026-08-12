import { useEffect, useState } from 'react'
import ThemeProvider from './contexts/ThemeContext'
import { useTheme } from './hooks/useTheme'
import { useIsMobile } from './hooks/useIsMobile'
import ThemeToggle from './components/ThemeToggle'
import Terminal from './components/Terminal'
import Starfield from './components/Starfield'
import Hero from './components/hero/Hero'
import Section from './components/section/Section'
import Trajectory from './components/trajectory/Trajectory'
import CaseStudies from './components/casestudies/CaseStudies'
import Systems from './components/systems/Systems'
import Projects from './components/projects/Projects'
import Contact from './components/Contact'
import ContactModal from './components/ContactModal'
import Footer from './components/Footer'
import { FaEnvelope, FaTerminal } from 'react-icons/fa'
import { profile } from './data/profile'
import './styles/app.scss'

const NAV = [
  { href: '#trajectory', label: 'Trajectory' },
  { href: '#record', label: 'Record' },
  { href: '#systems', label: 'Systems' },
  { href: '#work', label: 'Work' },
]

const AppContent = () => {
  const { mounted } = useTheme()
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    // keyboard shortcut to toggle the terminal (Ctrl/Cmd + `)
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        setIsTerminalOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!mounted) return null

  return (
    <div className="app">
      <Starfield />

      <header className="app__header">
        <a className="app__brand" href="#top">
          <span className="app__brand-dot" aria-hidden="true" />
          {profile.name}
        </a>

        {!isMobile && (
          <nav className="app__nav" aria-label="Sections">
            {NAV.map(item => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="app__controls">
          {isMobile && (
            <button
              className="btn btn--icon"
              aria-label="Open contact form"
              onClick={() => setIsContactModalOpen(true)}
              title="Contact me"
            >
              <FaEnvelope />
            </button>
          )}
          <button
            className="btn btn--icon"
            aria-label="Open terminal"
            onClick={() => setIsTerminalOpen(true)}
            title="Open terminal (Ctrl/Cmd + `)"
          >
            <FaTerminal />
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="app__main">
        <Hero />

        <Section
          id="trajectory"
          eyebrow="Trajectory"
          title="Four years on one platform, deliberately"
          lede="Staying with a single product suite long enough to own its architecture — the shared library, the micro-frontend boundaries, and the migrations that touch all of them at once."
        >
          <Trajectory />
        </Section>

        <Section
          id="record"
          eyebrow="Engineering record"
          title="Selected work, with the reasoning attached"
          lede="Features, architecture, and diagnoses drawn from commit history across 27 repositories. Each entry opens to show how the problem was reasoned about — the part that usually goes unrecorded."
        >
          <CaseStudies />
        </Section>

        <Section
          id="systems"
          eyebrow="Systems"
          title="What I reach for"
          lede="Grouped by how central each one is to daily work rather than by category — the same ordering the orbital diagram above encodes."
        >
          <Systems />
        </Section>

        <Section
          id="work"
          eyebrow="Independent work"
          title="Built outside the platform"
          lede="Self-directed projects carried from an empty repository to something running."
        >
          <Projects />
        </Section>
      </main>

      {!isMobile && <Contact />}
      <Footer />

      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        id="dev-terminal"
      />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
)

export default App
