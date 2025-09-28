import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext({
  theme: 'light' as Theme,
  toggle: () => {},
  mounted: false,
})

const LS_KEY = 'portfolio-theme'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) as Theme | null
    if (stored) {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    } else {
      const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const initial = prefers ? 'dark' : 'light'
      setTheme(initial)
      document.documentElement.setAttribute('data-theme', initial)
    }
    
    setMounted(true)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(LS_KEY, theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return <ThemeContext.Provider value={{ theme, toggle, mounted }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
export default ThemeProvider