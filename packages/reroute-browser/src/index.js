import { createBrowserHistory } from 'history'
import { Router, useRoute, useLink, Switch } from '@matthamlin/reroute-core'
import React, { forwardRef } from 'react'

function _Link({ to, children, innerRef, ...rest }) {
  let getLinkProps = useLink(to)
  return (
    <a ref={innerRef} {...getLinkProps(rest)}>
      {children}
    </a>
  )
}

export let Link = forwardRef((props, ref) => (
  <_Link innerRef={ref} {...props} />
))

export function Route({ path, children }) {
  let routeProps = useRoute(path)
  return children(routeProps)
}

export function BrowserRouter({
  children,
  createHistory = createBrowserHistory,
}) {
  return <Router createHistory={createHistory}>{children}</Router>
}

export { useRoute, useLink, Switch }
