import { useEffect, useState } from 'react'
import { LS_KEY, ThemeContext, type Theme } from './theme-context'

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('system')
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) as Theme | null

    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setTheme(stored)
    } else {
      localStorage.setItem(LS_KEY, 'system')
    }

    setMounted(true)
  }, [])

  // keep the resolved theme in sync while the user is on 'system'
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const next = e.matches ? 'dark' : 'light'
        setActualTheme(next)
        document.documentElement.setAttribute('data-theme', next)
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [theme])

  useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme
    setActualTheme(resolved)
    document.documentElement.setAttribute('data-theme', resolved)
    localStorage.setItem(LS_KEY, theme)
  }, [theme])

  const toggle = () => {
    setTheme(t => {
      if (t === 'system') return 'light'
      if (t === 'light') return 'dark'
      return 'system'
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
