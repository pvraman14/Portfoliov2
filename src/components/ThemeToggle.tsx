import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'
import './ThemeToggle.scss'

const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className="btn btn--icon theme-toggle"
      onClick={toggle}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <FaSun /> :<FaMoon /> }
    </button>
  )
}

export default ThemeToggle
