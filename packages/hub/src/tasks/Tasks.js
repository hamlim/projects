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
import useAirtable, { getCache } from '../useAirtable'
import { useHistory } from '@matthamlin/reroute-core'
import { useCache } from '@matthamlin/simple-cache'

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

export default function Tasks() {
  return (
    <Box>
      <H1>Tasks</H1>
      <Suspense fallback={<Text>Loading tasks ...</Text>}>
        <LocalTasks />
      </Suspense>
    </Box>
  )
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'check':
      return tasks.map(task => {
        if (task.id === action.id) {
          return {
            ...task,
            status: 'done',
          }
        }
        return task
      })
    case 'pending':
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, status: 'pending' }
        }
        return task
      })
    case 'in-progress':
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, status: 'in progress' }
        }
        return task
      })
    case 'cycle-status':
      return tasks.map(task => {
        if (task.id === action.id) {
          return {
            ...task,
            status:
              task.status === 'pending'
                ? 'in progress'
                : task.status === 'in progress'
                ? 'done'
                : 'pending',
          }
        }
        return task
      })
    case 'add':
      return [...tasks, { ...action.task, id: tasks.length }]
    case 'update-text':
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, text: action.text }
        }
        return task
      })
    case 'update-notes':
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, notes: action.notes }
        }
        return task
      })
    case 'update-due-date':
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, dueData: action.dueDate }
        }
        return task
      })
    case 'add-tags':
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, tags: [...(task.tags || []), action.tags] }
        }
        return task
      })
    case 'update-tags':
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, tags: action.tags }
        }
        return task
      })
    case 'delete-task':
      return tasks.filter(task => task.id !== action.id)
  }
}

let initialTask = {
  text: '',
  dueDate: '',
  status: 'pending',
  notes: '',
  tasks: [],
  tags: [],
  id: 0,
  __local__: true,
}

function addReducer(state, action) {
  switch (action) {
    case 'reset':
      return initialTask
    default:
      return {
        ...state,
        [action.type]: action.value,
      }
  }
}

function sortTasks(taskA, taskB) {
  if (Date(taskA.createdData) < Date(taskB.createdData)) {
    return -1
  } else if (Date(taskA.createdData) > Date(taskB.createdData)) {
    return 1
  }
  return 0
}

function LocalTasks() {
  let [tasks, dispatch] = useReducer(tasksReducer, null, () => {
    let tasks
    try {
      tasks = window.localStorage.getItem('hub.tasks.local.v1')
      if (tasks) {
        tasks = JSON.parse(tasks)
      }
    } catch (e) {
      // noop
    } finally {
      if (!tasks) {
        return []
      }
      return tasks
    }
  })

  console.log(tasks)

  useEffect(() => {
    window.localStorage.setItem('hub.tasks.local.v1.key', new Date())
    window.localStorage.setItem('hub.tasks.local.v1', JSON.stringify(tasks))
  }, [tasks])

  // #region Add logic
  // add task
  let [task, taskDispatch] = useReducer(addReducer, initialTask)

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
      taskDispatch({ type, value })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    let upload = {
      ...task,
      createdDate: new Date(),
    }
    dispatch({
      type: 'add',
      task: upload,
    })
    taskDispatch('reset')
    // setUploadStatus('pending')
    // startTransition(() => {
    //   setUpload(upload)
    // })
  }

  function toggleShowMore() {
    setShowMore(showMore => !showMore)
  }

  function clearUpload() {
    setUploadStatus(null)
  }

  // end add
  //#endregion

  //#region All tasks
  let sortedTasks = tasks.sort(sortTasks).filter(task => !!task.text)

  //#endregion

  return (
    <Box>
      <Form forwardedAs={Row} onSubmit={handleSubmit} mb={4}>
        <Label flexWrap="wrap">
          <Box>Add a new task:</Box>
          <Input
            placeholder="Get groceries..."
            value={task.text}
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
            <Text forwardedAs="span">Added task ✅</Text>
            <Button onTap={clearUpload}>Dismiss</Button>
          </Banner>
        )}
        {uploadStatus === 'failed' && (
          <Banner variant="error">Unable to add task</Banner>
        )}
      </Form>
      <Text>All Tasks: </Text>
      <List forwardedAs="ul">
        {sortedTasks.map(task => (
          <ListItem key={task.id}>
            <Label>
              <Checkbox
                mr={3}
                disabled={task.status === 'done'}
                checked={task.status === 'done'}
                onChange={() => dispatch({ type: 'cycle-status', id: task.id })}
              />
              <VisuallyHidden>Mark task as completed</VisuallyHidden>
              <Link as={RouterLink} to={`/tasks/${task.id}`}>
                {task.text}
              </Link>
            </Label>
          </ListItem>
        ))}
      </List>
      <Box mt={6}>
        {sortedTasks.map(task => (
          <Route key={task.id} path={`/tasks/${task.id}`}>
            <Box position="relative">
              <Text maxWidth="70%">
                {task.text} - {new Date(task.createdDate).toLocaleDateString()}
              </Text>
              <Text>
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </Text>
              <Text>{task.notes}</Text>
              <Button
                onTap={() => dispatch({ type: 'delete-task', id: task.id })}
              >
                Delete
              </Button>
              <Link
                position="absolute"
                top={0}
                right={0}
                forwardedAs={RouterLink}
                to="/tasks"
                autoFocus
              >
                Close
              </Link>
            </Box>
          </Route>
        ))}
      </Box>
    </Box>
  )
}
