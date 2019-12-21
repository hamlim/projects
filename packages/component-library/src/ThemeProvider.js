import React, { createContext, useContext } from 'react'
import defaultTheme from './Theme.js'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

let themeContext = createContext(defaultTheme)

export function useTheme() {
  return useContext(themeContext)
}

export function ThemeProvider({ children, theme = defaultTheme }) {
  return (
    <StyledThemeProvider theme={theme}>
      <themeContext.Provider value={theme}>{children}</themeContext.Provider>
    </StyledThemeProvider>
  )
}
