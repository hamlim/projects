import React from 'react'
import { H1, Box, Link } from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'

export default function Landing() {
  return (
    <Box>
      <H1>Hub</H1>
      <Link as={RouterLink} to="/money">
        Cash
      </Link>
      <Link as={RouterLink} to="/tasks">
        Tasks
      </Link>
    </Box>
  )
}
