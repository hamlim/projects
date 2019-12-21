import React from 'react'
import { BrowserRouter } from '@matthamlin/reroute-browser'
import { ThemeProvider, GlobalStyles } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <GlobalStyles />
    <BrowserRouter>
      <div>TODO</div>
    </BrowserRouter>
  </ThemeProvider>,
)
