import React from 'react'
import { H1, Box, Link } from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'

export default function Money() {
  return (
    <Box>
      <H1>Money</H1>
      <Link as={RouterLink} to="/">
        Back
      </Link>
    </Box>
  )
}