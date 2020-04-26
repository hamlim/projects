import * as React from 'react'
import {
  BrowserRouter,
  useRoute,
  Link as RerouteLink,
} from '@matthamlin/reroute-browser'
import {
  ThemeProvider,
  H1,
  Box,
  Text,
  Link,
} from '@matthamlin/component-library'
import { createRoot } from 'react-dom'

let { lazy, Suspense } = React

function Route({ path, children }) {
  let props = useRoute(path)
  if (props.match) {
    return children
  }
  return null
}

function RouterLink({ to, children }) {
  return (
    <Link forwardedAs={RerouteLink} to={to}>
      {children}
    </Link>
  )
}

let Sandbox = lazy(() => import('./Sandbox.js'))

function Home() {
  return (
    <Box>
      <H1>AST Sandbox</H1>

      <Text>
        This site is meant to be a sandbox for prototyping Babel plugins and
        other exploratory ast traversal systems.
      </Text>
      <RouterLink to="/sandbox">Go To Sandbox</RouterLink>
    </Box>
  )
}

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/sandbox">
        <Suspense fallback={<Text>Loading...</Text>}>
          <Sandbox />
        </Suspense>
      </Route>
    </BrowserRouter>
  </ThemeProvider>,
)
