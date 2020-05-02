import { ThemeProvider, Box, Theme } from '@matthamlin/component-library'

export default function Page({ children }) {
  return (
    <ThemeProvider>
      <Box forwardedAs="main" maxWidth={Theme.sizes.content} margin="0 auto">
        {children}
      </Box>
    </ThemeProvider>
  )
}
