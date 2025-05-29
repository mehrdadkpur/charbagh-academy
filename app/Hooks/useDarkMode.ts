import { useEffect, useState } from "react"

export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
  
    useEffect(() => {
      const darkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(darkModeEnabled)
  
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
      mediaQuery.addEventListener('change', handleChange)
  
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])
  
    return isDarkMode
  }
  