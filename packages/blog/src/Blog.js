import React from 'react'
import { Link as RouterLink } from '@matthamlin/reroute-browser'
import {
  H1,
  Link,
  Box,
  Text,
  List,
  ListItem,
} from '@matthamlin/component-library'
import posts from './posts'

function Breadcrumbs() {
  return (
    <Box as="nav">
      <List variant="base" as="ul" display="inline-flex">
        <ListItem>
          <Link fontSize={2} as={RouterLink} to="/">
            Home
          </Link>
        </ListItem>
      </List>
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
        <Text>Welcome to my Blog!</Text>
        <List variant="base" as="ol">
          {posts.map(post => (
            <ListItem key={post.title}>
              <Link as={RouterLink} to={`/blog/${post.to}`}>
                {post.title}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
