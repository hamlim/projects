import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route as BaseRoute } from '@matthamlin/reroute-browser'
import * as comps from '@matthamlin/component-library'
import { createRoot } from 'react-dom'
import posts from './posts'
import { MDXProvider } from '@mdx-js/react'
import { Breadcrumbs, Crumb, Spacer } from './Breadcrumbs'
import styled from 'styled-components'

let Landing = lazy(() => import('./Landing.js'))
let Blog = lazy(() => import('./Blog.js'))
let Code = lazy(() => import('./Code.js'))

function Route({ path, children }) {
  return (
    <BaseRoute path={path}>
      {({ match }) => (match ? children : null)}
    </BaseRoute>
  )
}

let { ThemeProvider, GlobalStyles, Box, H1, ListItem } = comps

let Img = styled('img')`
  max-width: 100%;
  height: auto;
`

let components = {
  ...comps,
  p: props => <comps.Text fontSize={2} mt={6} {...props} />,
  h2: props => <comps.H2 mt={6} {...props} />,
  h3: props => <comps.H3 mt={6} {...props} />,
  h4: props => <comps.H4 mt={6} {...props} />,
  ul: props => (
    <Box mt={6}>
      <comps.List variant="unordered" as="ul" {...props} />
    </Box>
  ),
  li: props => <comps.ListItem {...props} />,
  ol: props => (
    <Box mt={6}>
      <comps.List variant="ordered" as="ol" {...props} />
    </Box>
  ),
  pre({ children }) {
    return <>{children}</>
  },
  code: Code,
  img: Img,
  Spacer: props => <Box mb={6} {...props} />,
  blockquote: props => (
    <Box
      borderLeft="solid 2px"
      color="gray.8"
      pl={6}
      mx={3}
      forwardedAs="blockquote"
      {...props}
    />
  ),
}

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <GlobalStyles />
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        maxWidth={['94vw', '80vw', '70ch']}
        minWidth={['94vw', '80vw', '70ch']}
        p={[3, , 7, 10]}
      >
        <BrowserRouter>
          <Suspense fallback={<div>🤔🤔🤔 Loading Page...</div>}>
            <Route path="/">
              <Landing />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            {posts.map(post => (
              <Route key={post.title} path={`/blog/${post.to}`}>
                <Breadcrumbs>
                  <Crumb to="/">Home</Crumb>
                  <Spacer />
                  <Crumb to="/blog">Blog</Crumb>
                </Breadcrumbs>
                <H1>{post.title}</H1>
                <MDXProvider components={components}>
                  <post.component />
                </MDXProvider>
              </Route>
            ))}
          </Suspense>
        </BrowserRouter>
      </Box>
    </Box>
  </ThemeProvider>,
)
