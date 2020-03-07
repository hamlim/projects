import React, { Suspense, useState } from 'react'
import {
  H1,
  Box,
  Link,
  Text,
  Input,
  Button,
  List,
  ListItem,
} from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'

export default function Habits() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <H1>Habits</H1>
        <Link as={RouterLink} to="/">
          Back
        </Link>
      </Box>
    </Box>
  )
}
