import React from 'react'
import { BrowserRouter } from '@matthamlin/reroute-browser'
import { ThemeProvider } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'
import Landing from './Landing'

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  </ThemeProvider>,
)
