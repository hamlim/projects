/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import { useTheme } from './ThemeProvider'

export let GlobalStyles = createGlobalStyle(() => {
  let theme = useTheme()
  return `
  html {
    box-sizing: border-box;
    font-size: ${theme.fontSizes[1]}px;
    font-family: ${theme.fonts.base};
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  * {
    margin: 0;
    padding: 0;
  }
`
})
