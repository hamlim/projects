import * as React from 'react'
import { H1, Box, Link, Text } from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'
import { userContext } from './userContext.js'

let { useContext } = React

export default function Landing() {
  let [user] = useContext(userContext)
  return (
    <Box>
      <H1>Hub</H1>
      <Text>A centralized hub for tracking tasks, cash flow, health, etc.</Text>
      {!user.isLoggedIn ? (
        <Box>
          <Link as={RouterLink} to="/login">
            Login
          </Link>
        </Box>
      ) : (
        <Box>Logged in as: {user.username}</Box>
      )}
    </Box>
  )
}
