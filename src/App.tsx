import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeProvider, { useTheme } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import Terminal from './components/Terminal.tsx'
import Projects from './components/Projects'
import './styles/app.scss'

const AppContent: React.FC = () => {
  const { mounted } = useTheme()
  const terminalRef = useRef(null)

  useEffect(() => {
    // keyboard shortcut to toggle the terminal (Ctrl/Cmd + `)
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        terminalRef.current?.toggleOpen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!mounted) return null

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">P Venkat Raman — Learner, Reader and Developer</h1>
        <div className="app__controls">
          <ThemeToggle />
          <button
            id="terminal-toggle"
            className="btn btn--ghost"
            aria-label="Open terminal"
            onClick={() => terminalRef.current?.toggleOpen()}
          >
            Terminal
          </button>
        </div>
      </header>

      <main className="app__main">
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero__card"
          >
            <h2>Hi, I’m P Venkat Raman.</h2>
            <p>Full-stack engineer building delightful application experiences, specializing in Frontend Technologies with React, NextJs, Angular and TypeScript.</p>
          </motion.div>
        </section>

        <section className="projects-section">
          <h3>Projects</h3>
          <Projects />
        </section>

        <section className="about-section">
          <h3>About</h3>
          <p>
            I love building fast, accessible interfaces and learning new JS patterns. This portfolio is a
            demo of a CLI-style interactive terminal, theming, and animated UI.
          </p>
        </section>
      </main>

      {/* pass ref to Terminal so toggling works reliably */}
      <Terminal ref={terminalRef} id="dev-terminal" />
    </div>
  )
}

const App: React.FC = () => (
  <ThemeProvider>
    <AnimatePresence>
      <AppContent />
    </AnimatePresence>
  </ThemeProvider>
)

export default App