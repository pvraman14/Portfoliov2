import { useEffect, useRef, useState } from 'react'
import { ledger, profile } from '../data/profile'
import { caseStudies } from '../data/caseStudies'
import { roles } from '../data/experience'
import { projects } from '../data/projects'
import './Terminal.scss'

type Props = {
  id?: string
  isOpen: boolean
  onClose: () => void
}

const HELP = [
  'help        this list',
  'whoami      who I am and what I do',
  'ledger      the contribution numbers',
  'roles       career trajectory',
  'record      selected engineering work',
  'work        independent projects',
  'contact     how to reach me',
  'clear       wipe the screen',
]

const buildOutput = (cmd: string): string[] => {
  switch (cmd) {
    case 'help':
      return HELP
    case 'whoami':
      return [
        `${profile.name} — ${profile.role}, ${profile.company}`,
        profile.location,
        '',
        profile.bio,
      ]
    case 'ledger':
      return ledger.map(
        l =>
          `${l.label.padEnd(24)} ${l.unit === '~' ? '~' : ''}${l.value}${l.unit && l.unit !== '~' ? l.unit : ''}`
      )
    case 'roles':
      return roles.map(r => `${r.when.padEnd(24)} ${r.title} · ${r.company}`)
    case 'record':
      return caseStudies.map(s => `[${s.kind.padEnd(12)}] ${s.title}`)
    case 'work':
      return projects.map(p => `${p.kind.padEnd(22)} ${p.title}`)
    case 'contact':
      return [
        `email     ${profile.links.email}`,
        `github    ${profile.links.github}`,
        `linkedin  ${profile.links.linkedin}`,
      ]
    default:
      return [`command not found: ${cmd} — type 'help'`]
  }
}

const Terminal = ({ id = 'dev-terminal', isOpen, onClose }: Props) => {
  const [lines, setLines] = useState<string[]>(["dev@portfolio — type 'help' to list commands."])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const outputRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') {
      setLines([])
      return
    }
    setLines(prev => [...prev, `$ ${cmd}`, ...buildOutput(cmd), ''])
  }

  if (!isOpen) return null

  return (
    <aside
      id={id}
      className="terminal"
      role="dialog"
      aria-modal="true"
      aria-label="Developer terminal"
    >
      <div className="terminal__header">
        <span className="terminal__who">dev@portfolio</span>
        <button
          className="terminal__close"
          onClick={onClose}
          aria-label="Close terminal"
          type="button"
        >
          ✕
        </button>
      </div>

      <div className="terminal__body">
        <div className="terminal__output" ref={outputRef} aria-live="polite">
          {lines.map((line, i) => (
            <div key={i} className={`terminal__line ${line.startsWith('$ ') ? 'is-echo' : ''}`}>
              {line || ' '}
            </div>
          ))}
        </div>

        <form
          className="terminal__input"
          onSubmit={e => {
            e.preventDefault()
            run(inputRef.current?.value ?? '')
            if (inputRef.current) inputRef.current.value = ''
          }}
        >
          <label className="sr-only" htmlFor="terminal-command">
            Terminal command
          </label>
          <span className="terminal__prompt" aria-hidden="true">
            $
          </span>
          <input
            id="terminal-command"
            ref={inputRef}
            autoComplete="off"
            spellCheck={false}
            placeholder="help"
          />
        </form>
      </div>
    </aside>
  )
}

export default Terminal
