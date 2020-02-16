import React, { createContext, useContext } from 'react'
import defaultTheme from './Theme.js'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { GlobalStyles } from './GlobalStyles.js'

let themeContext = createContext(defaultTheme)

export function useTheme() {
  return useContext(themeContext)
}

export function BareThemeProvider({ children, theme = defaultTheme }) {
  return (
    <StyledThemeProvider theme={theme}>
      <themeContext.Provider value={theme}>{children}</themeContext.Provider>
    </StyledThemeProvider>
  )
}

export function ThemeProvider({ children, theme = defaultTheme }) {
  return (
    <BareThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </BareThemeProvider>
  )
}
