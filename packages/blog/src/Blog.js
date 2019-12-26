import React from 'react'
import { Link as RouterLink } from '@matthamlin/reroute-browser'
import { H1, Link, Box, Text } from '@matthamlin/component-library'

function Breadcrumbs() {
  return (
    <Box as="nav">
      <Box as="ul">
        <Box as="li">
          <Link fontSize={2} as={RouterLink} to="/">
            Home
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default function Blog() {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box maxWidth="60ch">
        <Breadcrumbs />
        <H1>Blog</H1>
      </Box>
    </Box>
  )
}
