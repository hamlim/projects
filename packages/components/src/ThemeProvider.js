import React, { createContext, useContext } from 'react'
import defaultTheme from './Theme.js'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'

let themeContext = createContext(defaultTheme)

export function useTheme() {
  return useContext(themeContext)
}

export function ThemeProvider({ children, theme = defaultTheme }) {
  return (
    <EmotionThemeProvider theme={theme}>
      <themeContext.Provider value={theme}>{children}</themeContext.Provider>
    </EmotionThemeProvider>
  )
}
