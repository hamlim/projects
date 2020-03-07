import * as React from 'react'
import {
  H1,
  Box,
  Link,
  Text,
  List,
  ListItem,
} from '@matthamlin/component-library'
import { Link as RouterLink, useRoute } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'
import { useHistory } from '@matthamlin/reroute-core'

let { Suspense, useMemo } = React

let base = 'appFuzjMaJJLBSf0V'
let table = 'tasks'

let today = new Date().getDate()

function Route({ children, path }) {
  let { match } = useRoute(path)
  if (match) {
    return children
  }
  return null
}

function todaysTasks(records) {
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
          <ListItem key={task.fields.id}>{task.fields.text}</ListItem>
        ))}
      </List>
    </>
  )
}

function Task({ fields }) {
  let {
    text,
    dateCreated,
    dateDue,
    status,
    notes = '',
    tasks = '[]',
    tags = '[]',
  } = fields

  tags = JSON.parse(tags)
  tasks = JSON.parse(tasks)
  console.log(fields)
  let { history } = useHistory()
  return (
    <Box position="relative">
      <Text maxWidth="70%">
        {text} - {new Date(dateCreated).toLocaleDateString()}
      </Text>
      <Text>Due Date: {new Date(dateDue).toLocaleDateString()}</Text>
      <Text>{notes}</Text>
      <Link position="absolute" top={0} right={0} as={RouterLink} to="/tasks">
        Close
      </Link>
    </Box>
  )
}

function sortTasks(taskA, taskB) {
  if (Date(taskA.fields.dateCreated) < Date(taskB.fields.dateCreated)) {
    return -1
  } else if (Date(taskA.fields.dateCreated) > Date(taskB.fields.dateCreated)) {
    return 1
  }
  return 0
}

function All({ tasks }) {
  let sortedTasks = tasks.sort(sortTasks).filter(task => !!task.fields.text)
  return (
    <>
      <Text>All Tasks: </Text>
      <List as="ul">
        {sortedTasks.map(task => (
          <ListItem key={task.fields.id}>
            <Link as={RouterLink} to={`/tasks/${task.id}`}>
              {task.fields.text}
            </Link>
          </ListItem>
        ))}
      </List>
      <Box mt={6}>
        {sortedTasks.map(task => (
          <Route key={task.id} path={`/tasks/${task.id}`}>
            <Task {...task} />
          </Route>
        ))}
      </Box>
    </>
  )
}

function View() {
  let { records: tasks } = useAirtable({ base, table })
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
