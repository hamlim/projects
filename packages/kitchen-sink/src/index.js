import { BrowserRouter } from '@hamlim/reroute-browser'
import { ThemeProvider } from '@hamlim/component-library'
import { createRoot } from 'react-dom'
import React from 'react'
import Landing from './Landing'

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  </ThemeProvider>,
)
