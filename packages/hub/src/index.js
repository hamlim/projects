import React from 'react'
import { BrowserRouter, Switch } from '@matthamlin/reroute-browser'
import { ThemeProvider, GlobalStyles, Box } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'

import Landing from './Landing.js'
import Money from './cash/Money.js'
import Tasks from './tasks/Tasks.js'
import Health from './health/Health.js'
import Login from './auth/Login.js'
import { Layout, Nav } from './Layout.js'
import { Provider as UserProvider } from './userContext.js'
import ErrorBoundary from './ErrorBoundary.js'

function OhNo() {
  return (
    <Box forwardedAs="p" fontSize={2}>
      Oh No, the page broke!
    </Box>
  )
}

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <GlobalStyles />
    <BrowserRouter>
      <UserProvider>
        <Box display="flex" flexDirection="column" flexGrow="1">
          <Nav />
          <Layout>
            <ErrorBoundary FallbackComponent={OhNo}>
              <Switch
                matcher={(path, location) =>
                  path !== '/'
                    ? location.pathname.startsWith(path)
                    : path === location.pathname
                }
              >
                <Landing path="/" />
                <Money path="/money" />
                <Tasks path="/tasks" />
                <Health path="/health" />
                <Login path="/login" />
              </Switch>
            </ErrorBoundary>
          </Layout>
        </Box>
      </UserProvider>
    </BrowserRouter>
  </ThemeProvider>,
)
