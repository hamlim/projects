import React from 'react'
import { Link as RouterLink } from '@matthamlin/reroute-browser'
import { H1, Link, Box, Text } from '@matthamlin/component-library'

export default function Landing() {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box maxWidth="60ch">
        <H1 mb={8}>Hey 👋🏼</H1>
        <Text fontSize={2}>
          Hey there, I'm Matt. I'm currently living and working in Boston. I am
          a Staff Software Engineer working on the Frontend Design Systems team
          at Wayfair. In my free time I like to work on several different{' '}
          <Link as="a" href="https://github.com/hamlim">
            side projects
          </Link>
          , and somehow find time to write some blog posts as well.
        </Text>
        <Link as={RouterLink} to="/blog">
          Go to Blog Posts
        </Link>
      </Box>
    </Box>
  )
}
