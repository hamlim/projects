import * as React from 'react'
import {
  H1,
  Box,
  Link,
  Text,
  List,
  ListItem,
} from '@matthamlin/component-library'
import { Link as RouterLink } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'

let { Suspense, useMemo } = React

let base = 'appFuzjMaJJLBSf0V'
let table = 'tasks'

let today = new Date().getDate()

function todaysTasks(data) {
  let { records } = data
  return records.filter(record => {
    return new Date(record.fields.dueDate).getDate() === today
  })
}

function Daily({ tasks }) {
  let tasksForToday = useMemo(
    function() {
      return todaysTasks(tasks)
    },
    [tasks],
  )

  if (tasksForToday.length === 0) {
    return <Text>No tasks for today! ☕</Text>
  }

  return (
    <>
      <Text>Todays Tasks: </Text>
      <List>
        {tasksForToday.map(task => (
          <ListItem key={task.id}>{task.text}</ListItem>
        ))}
      </List>
    </>
  )
}

function All({ tasks }) {
  return <Text>All Tasks: </Text>
}

function View() {
  let tasks = useAirtable({ base, table })
  return (
    <>
      <Box mb={4}>
        <Daily tasks={tasks} />
      </Box>
      <All tasks={tasks} />
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
