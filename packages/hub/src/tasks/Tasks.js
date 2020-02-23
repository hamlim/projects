import * as React from 'react'
import { H1, Box, Link, Text } from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'

let { Suspense, useMemo } = React

let base = ''
let table = ''

function todaysTasks(data) {
  let { records } = data
  return data
}

function Daily({ tasks }) {
  let tasksForToday = useMemo(
    function() {
      return todaysTasks(tasks)
    },
    [tasks],
  )

  return <Text>Todays Tasks: </Text>
}

function All({ tasks }) {
  return <Text>All Tasks: </Text>
}

function View() {
  let tasks = useAirtable({ base, table })
  return (
    <>
      <Daily />
      <All />
    </>
  )
}

export default function Tasks() {
  return (
    <Box>
      <H1>Tasks</H1>
      <Suspense fallback={<Text>Loading tasks...</Text>}>
        <View />
      </Suspense>
    </Box>
  )
}
