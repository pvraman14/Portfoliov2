import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeProvider, { useTheme } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import Terminal from './components/Terminal.tsx'
import Projects from './components/Projects'
import './styles/app.scss'
import Skills from './components/skills/Skills.tsx'
import Tab from './components/tabs/Tabs.tsx'
import Contact from './components/Contact.tsx'
import ContactModal from './components/ContactModal.tsx'
import Footer from './components/Footer.tsx'
import { FaLinkedin, FaGithub, FaEnvelope, FaTerminal } from 'react-icons/fa'

const AppContent: React.FC = () => {
  const { mounted } = useTheme()
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // keyboard shortcut to toggle the terminal (Ctrl/Cmd + `)
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        setIsTerminalOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) return null

  return (
    <div className="app">
      {!isTerminalOpen && (
        <>
          <header className="app__header">
            <h1 className="app__title">P Venkat Raman</h1>
            <div className="app__controls">
              {isMobile && (
                <button
                  className="btn btn--icon btn--contact"
                  aria-label="Open contact form"
                  onClick={() => setIsContactModalOpen(true)}
                  title="Contact Me"
                >
                  <FaEnvelope />
                </button>
              )}
              <ThemeToggle />
              <button
                id="terminal-toggle"
                className="btn btn--icon"
                aria-label="Open terminal"
                onClick={() => setIsTerminalOpen(true)}
                title="Open Terminal (Ctrl/Cmd + `)"
              >
                <FaTerminal />
              </button>
            </div>
          </header>

          <main className="app__main">
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero__card"
          >
            <motion.h2
              className='hero__header'
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
            >
              Think — Imagine — Develop.
            </motion.h2>

            <motion.img
              src="../src/assets/profile2.png"
              alt="logo"
              className='hero-logo'
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: "easeOut"
              }}
            />

            <motion.div
              className="social-links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/p-venkat-raman-3083b9195/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-links__item"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FaLinkedin />
              </motion.a>

              <motion.a
                href="https://github.com/pvraman14"
                target="_blank"
                rel="noopener noreferrer"
                className="social-links__item"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FaGithub />
              </motion.a>

              <motion.a
                href="mailto:pvenkatraman1400@gmail.com"
                className="social-links__item"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FaEnvelope />
              </motion.a>
            </motion.div>

            <motion.p
              className="hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Full-stack engineer building delightful application experiences, specializing in Frontend Technologies with React, NextJs, Angular and TypeScript.
            </motion.p>
          </motion.div>
        </section>

        <Skills/>

        <Tab/>

        {/* <section className="projects-section">
          <h3>Projects</h3>
          <Projects />
        </section> */}
{/* 
        <section className="about-section">
          <h3>About</h3>
          <p>
            I love building fast, accessible interfaces and learning new JS patterns. This portfolio is a
            demo of a CLI-style interactive terminal, theming, and animated UI.
          </p>
        </section> */}
          </main>

          {!isMobile && <Contact />}
          <Footer />
        </>
      )}

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} id="dev-terminal" />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
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