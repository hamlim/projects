import React, { Suspense, useState } from 'react'
import {
  H1,
  H3,
  Box,
  Link,
  Text,
  Input,
  Button,
  List,
  ListItem,
} from '@matthamlin/component-library'
import { Link as RouterLink, useRoute } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'

function Route({ path, ...props }) {
  let { match } = useRoute(path)
  if (match) {
    return props.children
  }
  return null
}

function RouteLink(props) {
  return <Link forwardedAs={RouterLink} {...props} />
}

function createDay(id, checked) {
  return {
    id,
    checked,
  }
}

let weeks = Array.from({ length: 7 }, (_, i) => i).reduce((acc, week, idx) => {
  return [
    ...acc,
    Array.from({ length: 52 }, (_, i) =>
      createDay(idx + i, Math.random() > 0.5),
    ),
  ]
}, [])

export default function Habits() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <H1>Habits</H1>

        <Link as={RouterLink} to="/">
          Back
        </Link>
      </Box>
      <Box>
        Cell:
        <Box size="20px" bg="gray.3" />
        <Box size="20px" bg="teal.4" />
      </Box>

      <Box>
        Grid
        <Box
          display="grid"
          gridTemplateColumns="repeat(52, 20px)"
          style={{ overflow: 'scroll' }}
          gridGap="2px"
          p={2}
        >
          {weeks.map((week, idx) =>
            week.map(day => (
              <Box
                border="solid 0.5px"
                borderColor="gray.2"
                key={day.id + idx}
                size="20px"
                bg={day.checked ? 'primary' : 'white'}
                to={`/habits/${day.id}-${idx}`}
                forwardedAs={RouteLink}
              />
            )),
          )}
        </Box>
        {weeks.map((week, idx) =>
          week.map(day => (
            <Route key={day.id + idx} path={`/habits/${day.id}-${idx}`}>
              <H3>Day: {day.id + 1}</H3>
            </Route>
          )),
        )}
      </Box>
    </Box>
  )
}
