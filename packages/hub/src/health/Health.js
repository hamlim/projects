import React, { Suspense } from 'react'
import { H1, Box, Link, Text } from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'

import { useCache } from '@matthamlin/simple-cache'

let cache = new Map()

function BloodSugar() {
  let { records } = useCache(cache, 'bloodSugar', () =>
    fetch(
      'https://api.airtable.com/v0/appnK0ZDhsqs1XEcv/Blood%20Sugar%20Ratings?maxRecords=1&view=Grid%20view&sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc',
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    ).then(res => res.json()),
  )
  let bloodSugar = records[0].fields['Blood Sugar Level']
  return (
    <>
      <Text fontSize={3}>Blood Sugar:</Text> <Text>{bloodSugar}</Text>
    </>
  )
}

function Weight() {
  let { records } = useCache(cache, 'weight', () =>
    fetch(
      'https://api.airtable.com/v0/appnK0ZDhsqs1XEcv/Weight?maxRecords=1&view=Grid%20view&sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc',
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    ).then(res => res.json()),
  )
  let weight = records[0].fields.Weight
  return (
    <>
      <Text fontSize={3}>Weight:</Text> <Text>{weight}Lb</Text>
    </>
  )
}

function Dashboard() {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr">
      <Box>
        <Suspense fallback={<Text>Loading latest weight...</Text>}>
          <Weight />
        </Suspense>
      </Box>
      <Box>
        <Suspense fallback={<Text>Loading latest blood sugar...</Text>}>
          <BloodSugar />
        </Suspense>
      </Box>
    </Box>
  )
}

export default function Tasks() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <H1>Health</H1>
        <Link as={RouterLink} to="/">
          Back
        </Link>
      </Box>
      <Dashboard />
    </Box>
  )
}
