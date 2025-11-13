import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FaMoon, FaSun, FaDesktop } from 'react-icons/fa'
import './ThemeToggle.scss'

const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, toggle } = useTheme()

  const getIcon = () => {
    if (theme === 'system') {
      return <FaDesktop />
    }
    return actualTheme === 'dark' ? <FaSun /> : <FaMoon />
  }

  const getTitle = () => {
    if (theme === 'system') {
      return `System theme (currently ${actualTheme}). Click for light mode`
    }
    if (theme === 'light') {
      return 'Light mode. Click for dark mode'
    }
    return 'Dark mode. Click for system theme'
  }

  return (
    <button
      className="btn btn--icon theme-toggle"
      onClick={toggle}
      aria-label="Toggle theme"
      title={getTitle()}
    >
      {getIcon()}
    </button>
  )
}

export default ThemeToggle
