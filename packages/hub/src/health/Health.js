import React, { Suspense, useState } from 'react'
import {
  H1,
  Box,
  Link,
  Text,
  Input,
  Button,
} from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'

import { useCache } from '@matthamlin/simple-cache'

let cache = new Map()

function useAirtable({ base, table }) {
  return useCache(cache, base + table, () =>
    fetch(`https://api.airtable.com/v0/${base}/${table}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }).then(res => res.json()),
  )
}

function BloodSugar() {
  let {
    records: [
      {
        fields: { ['Blood Sugar Level']: bloodSugar },
      },
    ],
  } = useAirtable({
    base: 'appnK0ZDhsqs1XEcv',
    table:
      'Blood%20Sugar%20Ratings?maxRecords=1&view=Grid%20view&sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc',
  })
  return (
    <>
      <Text fontSize={3}>Blood Sugar:</Text> <Text>{bloodSugar}</Text>
    </>
  )
}

function Weight() {
  let {
    records: [
      {
        fields: { Weight: weight },
      },
    ],
  } = useAirtable({
    base: 'appnK0ZDhsqs1XEcv',
    table:
      'Weight?maxRecords=1&view=Grid%20view&sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc',
  })

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

function Form() {
  let [value, setValue] = useState('')
  return (
    <Box>
      <Box forwardedAs="label">
        Enter Blood Sugar:
        <Input value={value} onChange={setValue} />
      </Box>
      <Button>Click Here!</Button>
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
      <Form />
    </Box>
  )
}