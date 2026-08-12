import { createContext } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export type ThemeContextValue = {
  theme: Theme
  actualTheme: 'light' | 'dark'
  toggle: () => void
  mounted: boolean
}

export const LS_KEY = 'portfolio-theme'

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  actualTheme: 'light',
  toggle: () => {},
  mounted: false,
})
