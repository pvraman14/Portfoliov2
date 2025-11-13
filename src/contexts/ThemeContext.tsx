import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

const ThemeContext = createContext({
  theme: 'system' as Theme,
  actualTheme: 'light' as 'light' | 'dark',
  toggle: () => {},
  mounted: false,
})

const LS_KEY = 'portfolio-theme'

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system')
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) as Theme | null
    const systemTheme = getSystemTheme()

    if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
      setTheme(stored)
      setActualTheme(stored === 'system' ? systemTheme : stored)
      document.documentElement.setAttribute('data-theme', stored === 'system' ? systemTheme : stored)
    } else {
      // Default to system theme
      setTheme('system')
      setActualTheme(systemTheme)
      document.documentElement.setAttribute('data-theme', systemTheme)
      localStorage.setItem(LS_KEY, 'system')
    }

    setMounted(true)
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light'

      // Only update if user is using system theme
      if (theme === 'system') {
        setActualTheme(newSystemTheme)
        document.documentElement.setAttribute('data-theme', newSystemTheme)
      }
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [theme])

  // Update document and localStorage when theme changes
  useEffect(() => {
    const themeToApply = theme === 'system' ? getSystemTheme() : theme
    setActualTheme(themeToApply)
    document.documentElement.setAttribute('data-theme', themeToApply)
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

export const useTheme = () => useContext(ThemeContext)
export default ThemeProvider