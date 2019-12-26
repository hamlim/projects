import React from 'react'
import { BrowserRouter } from '@matthamlin/reroute-browser'
import {
  ThemeProvider,
  GlobalStyles,
  H1,
  Button,
} from '@matthamlin/component-library'
import { createRoot } from 'react-dom'

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <GlobalStyles />
    <BrowserRouter>
      <H1>TODO</H1>
      <Button>Test</Button>
    </BrowserRouter>
  </ThemeProvider>,
)
