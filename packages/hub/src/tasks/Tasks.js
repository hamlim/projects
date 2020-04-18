import * as React from 'react'
import {
  H1,
  Box,
  Link,
  Text,
  List,
  ListItem,
  Banner,
  Input,
  Label,
  useTheme,
  Button,
  Form,
  useForm,
  Checkbox,
  VisuallyHidden,
} from '@matthamlin/component-library'
import { Link as RouterLink, useRoute } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'
import { useHistory } from '@matthamlin/reroute-core'

let {
  Suspense,
  useMemo,
  useReducer,
  useState,
  useTransition,
  useEffect,
} = React

let base = 'appFuzjMaJJLBSf0V'
let table = 'tasks'

let ENDPOINT = `https://api.airtable.com/v0/${base}/${table}`

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
      <List forwardedAs="ul">
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
  return (
    <Box position="relative">
      <Text maxWidth="70%">
        {text} - {new Date(dateCreated).toLocaleDateString()}
      </Text>
      <Text>Due Date: {new Date(dateDue).toLocaleDateString()}</Text>
      <Text>{notes}</Text>
      <Link
        position="absolute"
        top={0}
        right={0}
        as={RouterLink}
        to="/tasks"
        autoFocus
      >
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

function All({ tasks, completeTask }) {
  let sortedTasks = tasks.sort(sortTasks).filter(task => !!task.fields.text)
  return (
    <>
      <Text>All Tasks: </Text>
      <List forwardedAs="ul">
        {sortedTasks.map(task => (
          <ListItem key={task.fields.id}>
            <Label>
              <Checkbox
                mr={3}
                disabled={task.fields.status === 'done'}
                checked={task.fields.status === 'done'}
                onChange={completeTask(task)}
              />
              <VisuallyHidden>Mark task as completed</VisuallyHidden>
              <Link as={RouterLink} to={`/tasks/${task.id}`}>
                {task.fields.text}
              </Link>
            </Label>
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

function addReducer(state, action) {
  return {
    ...state,
    [action.type]: action.value,
  }
}

function noop() {}

function Row({ gridTemplateColumns = '1fr 1fr', ...props }) {
  let theme = useTheme()
  return (
    <Box
      display="grid"
      gridTemplateColumns={gridTemplateColumns}
      gridGap={`${theme.space[4]}px`}
      {...props}
    />
  )
}

function SubmitButton(props) {
  let submit = useForm()
  return <Button onTap={submit} {...props} />
}

function Add() {
  let [state, dispatch] = useReducer(addReducer, {
    text: '',
    dateDue: '',
    status: 'pending',
    notes: '',
    tasks: '[]',
    tags: '[]',
  })

  let [pendingUpload, setUpload] = useState(null)
  let [uploadStatus, setUploadStatus] = useState(null)

  let [showMore, setShowMore] = useState(false)

  let theme = useTheme()

  let [startTransition, pending] = useTransition()

  useEffect(() => {
    if (pendingUpload) {
      let isActive = true
      fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          records: [
            {
              fields: pendingUpload,
            },
          ],
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (isActive) {
            setUploadStatus('success')
          }
        })
        .catch(e => {
          console.warn(e)
          if (isActive) {
            setUploadStatus('failed')
          }
        })
      return () => (isActive = false)
    }
  }, [pendingUpload])

  function dispatcher(type) {
    return function(value) {
      dispatch({ type, value })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    let upload = {
      ...state,
      dateCreated: new Date(),
    }
    setUploadStatus('pending')
    startTransition(() => {
      setUpload(upload)
    })
  }

  function toggleShowMore() {
    setShowMore(showMore => !showMore)
  }

  function clearUpload() {
    setUploadStatus(null)
  }

  return (
    <Form forwardedAs={Row} onSubmit={handleSubmit} mb={4}>
      <Label flexWrap="wrap">
        <Box>Add a new task:</Box>
        <Input
          placeholder="Get groceries..."
          value={state.text}
          onChange={dispatcher('text')}
        />
      </Label>
      <Box display="flex" alignSelf="flex-end">
        <SubmitButton isFullWidth disabled={uploadStatus === 'pending'}>
          Create
        </SubmitButton>
      </Box>
      {uploadStatus === 'success' && (
        <Banner
          variant="success"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text forwardedAs="span">Added todo ✅</Text>
          <Button onTap={clearUpload}>Dismiss</Button>
        </Banner>
      )}
      {uploadStatus === 'failed' && (
        <Banner variant="error">Unable to add todo</Banner>
      )}
    </Form>
  )
}

function View() {
  let { records: tasks } = useAirtable({ base, table })
  function completeTask(task) {
    return function(checked) {
      // task.fields.status = 'done';
      // TODO
    }
  }
  return (
    <>
      <Box mb={4}>
        <Daily tasks={tasks} />
      </Box>
      <Box mb={4}>
        <Add />
      </Box>
      <All completeTask={completeTask} tasks={tasks} />
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
