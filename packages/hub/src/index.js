import React from 'react'
import { BrowserRouter, Switch } from '@matthamlin/reroute-browser'
import { ThemeProvider, GlobalStyles } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'

import Landing from './Landing.js'
import Money from './cash/Money.js'
import Tasks from './tasks/Tasks.js'
import { Layout, Nav } from './Layout.js'

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <GlobalStyles />
    <BrowserRouter>
      <Nav />
      <Layout>
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
        </Switch>
      </Layout>
    </BrowserRouter>
  </ThemeProvider>,
)
