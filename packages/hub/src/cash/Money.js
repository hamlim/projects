import React from 'react'
import { H1, Box, Link, Text } from '@matthamlin/component-library'
import { Link as RouterLink, useRoute } from '@matthamlin/reroute-browser'

import View from './view/View'
import Create from './Create'

function Route({ children, path }) {
  let { match } = useRoute(path)
  if (match) {
    return children
  }
  return null
}

export default function Money() {
  return (
    <Box pt={5}>
      <H1>Money</H1>

      <Text>Coming Soon</Text>

      {/* <Link as={RouterLink} to="/money/view">
        View
      </Link>
      <Link as={RouterLink} to="/money/create">
        Create
      </Link>

      <Route path="/money/view">
        <View />
      </Route>
      <Route path="/money/create">
        <Create />
      </Route> */}
    </Box>
  )
}
