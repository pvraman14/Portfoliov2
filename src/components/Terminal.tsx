import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Terminal.scss'

type Props = {
  id?: string
  isOpen: boolean
  onClose: () => void
}

const COMMANDS: Record<string, string> = {
  help: `Available commands: help, about, projects, contact, clear`,
  about: `Hi — I'm Your Name, a frontend dev. I build React + TypeScript apps.`,
  projects: `Type 'projects' to see project list in the UI.`,
  contact: `Email: your.email@example.com`,
}

const Terminal: React.FC<Props> = ({ id = 'dev-terminal', isOpen, onClose }) => {
  const [lines, setLines] = useState<string[]>(["Welcome to the dev terminal. Type 'help'."])
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const run = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    if (cmd === 'clear') return setLines([])
    const output = COMMANDS[cmd] ?? `Command not found: ${cmd}. Type 'help'.`
    setLines(prev => [...prev, `> ${cmd}`, output])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          id={id}
          key="terminal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="terminal terminal--fullscreen"
          role="dialog"
          aria-label="Developer terminal"
        >
          <div className="terminal__header">
            <span>dev@portfolio</span>
            <div className="terminal__controls">
              <button onClick={onClose} aria-label="Close terminal">✕</button>
            </div>
          </div>

          <div className="terminal__body">
            <div className="terminal__output" aria-live="polite">
              {lines.map((l, i) => (
                <div key={i} className="terminal__line">
                  {l}
                </div>
              ))}
            </div>

            <form
              className="terminal__input"
              onSubmit={e => {
                e.preventDefault()
                const v = inputRef.current?.value ?? ''
                run(v)
                if (inputRef.current) inputRef.current.value = ''
              }}
            >
              <label className="sr-only">Terminal input</label>
              <span className="terminal__prompt">$</span>
              <input ref={inputRef} aria-label="Terminal command" autoComplete="off" />
            </form>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

Terminal.displayName = 'Terminal'

export default Terminal
