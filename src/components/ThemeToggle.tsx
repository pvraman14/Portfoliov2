import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './ThemeToggle.module.scss'

const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme()
  return (
    <button className="theme-toggle" onClick={toggle} aria-pressed={theme === 'dark'} title="Toggle theme">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle