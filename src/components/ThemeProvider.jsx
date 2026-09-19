import { useCallback, useEffect, useMemo, useState } from 'react'

import { ThemeContext } from './themeContext'

// Theme preference is 'system' (follow the device, the default), 'light' or 'dark'.
// Only an explicit light/dark choice is stored; 'system' clears the stored value.
const STORAGE_KEY = 'theme'
const THEME_COLOR = { light: '#fbf8ff', dark: '#0f0724' }
const LIGHT_QUERY = '(prefers-color-scheme: light)'

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

const readSystem = () => (window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark')

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(readStored)
  const [system, setSystem] = useState(readSystem)
  const resolved = preference === 'system' ? system : preference

  // Follow the device while the preference is 'system'
  useEffect(() => {
    const query = window.matchMedia(LIGHT_QUERY)
    const onChange = () => setSystem(query.matches ? 'light' : 'dark')
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  // Keep other open tabs in sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY || e.key === null) setPreference(readStored())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = resolved
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[resolved])
  }, [resolved])

  const setTheme = useCallback((value) => {
    setPreference(value)
    try {
      if (value === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Storage can be blocked (private mode); the choice still applies for this visit.
    }
  }, [])

  const value = useMemo(() => ({ preference, resolved, setTheme }), [preference, resolved, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
