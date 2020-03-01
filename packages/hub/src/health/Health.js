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

function LatestBloodSugar() {
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

function chunk(perChunk, arr) {
  return arr.reduce((chunked, one) => {
    let lastItem = chunked[chunked.length - 1]
    if (Array.isArray(lastItem)) {
      let reversedChunked = [...chunked].reverse()
      let [last, ...first] = reversedChunked

      let [lastEl, ...restOfLast] = last.reverse()

      if (lastEl.fields.Day === one.fields.Day) {
        return [...first.reverse(), [...last, one]]
      }
    }
    return [...chunked, [one]]
  }, [])
}

function AllBloodSugars() {
  let { records: bloodSugars } = useAirtable({
    base: 'appnK0ZDhsqs1XEcv',
    table:
      'Blood%20Sugar%20Ratings?maxRecords=24&view=Grid%20view&sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc',
  })

  bloodSugars = chunk(4, bloodSugars)

  return (
    <List as="ol" p={6}>
      {bloodSugars.map((dayOfResults, i) => (
        <ListItem
          key={dayOfResults[0].fields.Day}
          bg="gray.1"
          borderRadius="1"
          p={4}
          mb={i !== bloodSugars.length - 1 ? 4 : null}
        >
          <Text>{dayOfResults[0].fields.Day}</Text>
          <List as="ol">
            {dayOfResults.map(sugar => (
              <ListItem key={sugar.id}>
                <Text>
                  Blood Sugar Value:{' '}
                  <Text forwardedAs="span" color="green.7">
                    {sugar.fields['Blood Sugar Level']}
                  </Text>
                </Text>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
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
        <Suspense fallback={<Text fontSize={3}>Loading latest weight...</Text>}>
          <Weight />
        </Suspense>
      </Box>
      <Box>
        <Suspense
          fallback={<Text fontSize={3}>Loading latest blood sugar...</Text>}
        >
          <LatestBloodSugar />
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
      <Suspense fallback={null}>
        <Box p={6}>
          <AllBloodSugars />
        </Box>
      </Suspense>
    </Box>
  )
}
