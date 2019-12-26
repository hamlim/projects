import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route as BaseRoute } from '@matthamlin/reroute-browser'
import { ThemeProvider, GlobalStyles } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'

let Landing = lazy(() => import('./Landing.js'))
let Blog = lazy(() => import('./Blog.js'))

function Route({ path, children }) {
  return (
    <BaseRoute path={path}>
      {({ match }) => console.log({ path, match }) || (match ? children : null)}
    </BaseRoute>
  )
}

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <GlobalStyles />
    <BrowserRouter>
      <Suspense fallback={<div>🤔🤔🤔</div>}>
        <Route path="/">
          <Landing />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>,
)
