import React from 'react'
import { BrowserRouter } from '@matthamlin/reroute-browser'
import { ThemeProvider, GlobalStyles } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'
import Landing from './Landing'

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <GlobalStyles />
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  </ThemeProvider>,
)
