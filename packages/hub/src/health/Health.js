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
  useTheme,
} from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'

function chunk(perChunk, arr) {
  return arr.reduce((chunked, one) => {
    let lastItem = chunked[chunked.length - 1]
    if (Array.isArray(lastItem)) {
      let reversedChunked = [...chunked].reverse()
      let [last, ...first] = reversedChunked

      let [lastEl, ...restOfLast] = last.reverse()

      if (lastEl.fields.day === one.fields.day) {
        return [...first.reverse(), [...last, one]]
      }
    }
    return [...chunked, [one]]
  }, [])
}

function AllBloodSugars() {
  let theme = useTheme()

  let { records: bloodSugars } = useAirtable({
    base: 'appnK0ZDhsqs1XEcv',
    table:
      'Blood%20Sugar%20Ratings?maxRecords=8&view=Grid%20view&sort%5B0%5D%5Bfield%5D=time&sort%5B0%5D%5Bdirection%5D=desc',
  })

  bloodSugars = chunk(4, bloodSugars)

  return (
    <List as="ol" p={6}>
      {bloodSugars.map((dayOfResults, i) => (
        <ListItem
          key={dayOfResults[0].fields.day}
          boxShadow={`0 0 6px 1px ${theme.colors.gray[3]}`}
          borderRadius="1"
          p={4}
          mb={i !== bloodSugars.length - 1 ? 4 : null}
        >
          <Text>
            {new Date(dayOfResults[0].fields.day).toLocaleDateString()}
          </Text>
          <List as="ol">
            {dayOfResults.map(sugar => {
              let { bloodSugar } = sugar.fields
              return (
                <ListItem key={sugar.id}>
                  <Text>
                    Blood Sugar Value:{' '}
                    <Text
                      forwardedAs="span"
                      color={bloodSugar < 100 ? 'green.7' : 'yellow.7'}
                    >
                      {bloodSugar}
                    </Text>
                  </Text>
                </ListItem>
              )
            })}
          </List>
        </ListItem>
      ))}
    </List>
  )
}

function AllWeight() {
  let theme = useTheme()

  let { records: weights } = useAirtable({
    base: 'appnK0ZDhsqs1XEcv',
    table:
      'Weight?maxRecords=8&view=Grid%20view&sort%5B0%5D%5Bfield%5D=time&sort%5B0%5D%5Bdirection%5D=desc',
  })

  return (
    <List as="ol" p={6}>
      {weights.map(data => {
        let { weight } = data.fields
        return (
          <ListItem key={data.id}>
            <Text>
              Weight:{' '}
              <Text
                forwardedAs="span"
                color={weight < 300 ? 'green.7' : 'yellow.7'}
              >
                {weight}
              </Text>
            </Text>
          </ListItem>
        )
      })}
    </List>
  )
}

function Weight() {
  let {
    records: [
      {
        fields: { weight },
      },
    ],
  } = useAirtable({
    base: 'appnK0ZDhsqs1XEcv',
    table:
      'Weight?maxRecords=1&view=Grid%20view&sort%5B0%5D%5Bfield%5D=time&sort%5B0%5D%5Bdirection%5D=desc',
  })

  return (
    <Text
      fontSize={3}
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      borderBottom="solid 1px"
    >
      Weight:{' '}
      <Text forwardedAs="span" fontStyle="italic">
        {weight}Lb
      </Text>
    </Text>
  )
}

function LatestBloodSugar() {
  let {
    records: [
      {
        fields: { bloodSugar },
      },
    ],
  } = useAirtable({
    base: 'appnK0ZDhsqs1XEcv',
    table:
      'Blood%20Sugar%20Ratings?maxRecords=1&view=Grid%20view&sort%5B0%5D%5Bfield%5D=time&sort%5B0%5D%5Bdirection%5D=desc',
  })
  return (
    <Text
      fontSize={3}
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      borderBottom="solid 1px"
    >
      Blood Sugar:{' '}
      <Text forwardedAs="span" fontStyle="italic">
        {bloodSugar}
      </Text>
    </Text>
  )
}

function Dashboard() {
  let theme = useTheme()
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={theme.space[4]}>
      <Box>
        <Suspense fallback={<Text fontSize={3}>Loading latest weight...</Text>}>
          <Weight />
        </Suspense>
        <Suspense fallback={null}>
          <Box p={6}>
            <AllWeight />
          </Box>
        </Suspense>
      </Box>
      <Box>
        <Suspense
          fallback={<Text fontSize={3}>Loading latest blood sugar...</Text>}
        >
          <LatestBloodSugar />
        </Suspense>
        <Suspense fallback={null}>
          <Box p={6}>
            <AllBloodSugars />
          </Box>
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
      <Box p={6}></Box>
    </Box>
  )
}
