import { useTheme } from '../hooks/useTheme'
import { FaMoon, FaSun, FaDesktop } from 'react-icons/fa'
import './ThemeToggle.scss'

const ThemeToggle = () => {
  const { theme, actualTheme, toggle } = useTheme()

  const icon = () => {
    if (theme === 'system') return <FaDesktop />
    return actualTheme === 'dark' ? <FaSun /> : <FaMoon />
  }

  const title = () => {
    if (theme === 'system') {
      return `Following system (currently ${actualTheme}). Switch to light`
    }
    if (theme === 'light') return 'Light. Switch to dark'
    return 'Dark. Switch to following system'
  }

  return (
    <button
      className="btn btn--icon theme-toggle"
      onClick={toggle}
      aria-label={title()}
      title={title()}
      data-mode={theme === 'system' ? 'system' : actualTheme}
      type="button"
    >
      {icon()}
    </button>
  )
}

export default ThemeToggle
