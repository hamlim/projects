import React, { Suspense } from 'react'
import {
  H1,
  Box,
  Link,
  List,
  ListItem,
  Text,
  useTheme,
  Stack,
} from '@matthamlin/component-library'
import { Link as RouterLink, useRoute } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'
import ErrorBoundary from '../ErrorBoundary'

let base = `app2FaIaQeVAWkNTF`
let table = `transactions`

function Log({ children }) {
  console.log(children)
  return null
}

function Chip({ children }) {
  return (
    <Box
      forwardedAs="span"
      p={3}
      display="inline-flex"
      borderRadius={1}
      bg="primary"
      color="white"
    >
      {children}
    </Box>
  )
}

function transformDate(dateString) {
  return new Date(dateString.split('T')[0])
}

function compareTransactions(transactionA, transactionB) {
  if (
    transformDate(transactionA.fields.createdDate) <
    transformDate(transactionB.fields.createdDate)
  ) {
    return -1
  } else if (
    transformDate(transactionA.fields.createdDate) >
    transformDate(transactionB.fields.createdDate)
  ) {
    return 1
  }
  return 0
}

function Transactions() {
  let transactions = useAirtable({
    base,
    table,
  })

  let theme = useTheme()

  if (!transactions.records) {
    let err = new Error('Unable to fetch transactions.')
    err.original = transactions
    throw err
  }

  return (
    <List variant="base" forwardedAs="ul">
      {transactions.records.sort(compareTransactions).map((record, index) => {
        let tags = JSON.parse(record.fields.tags.replace(/'/g, '"')).map(tag =>
          tag.replace(/"/g, "'"),
        )
        return (
          <ListItem
            key={record.id}
            mt={index > 0 ? 5 : null}
            boxShadow={`0 0 4px 1px ${theme.colors.gray[3]}`}
            borderRadius={1}
            p={4}
          >
            {/* <Log>{record.fields}</Log> */}
            <Stack props={{ my: 4 }} display="block">
              <Box forwardedAs="time">
                {new Date(record.fields.createdDate).toLocaleDateString()} -{' '}
                {new Date(record.fields.createdDate).toLocaleTimeString()}
              </Box>
              <Text>${record.fields.amount}</Text>
              <Stack props={{ mx: 4 }} flexWrap="wrap">
                {tags.map(tag => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </Stack>
              <Text>{record.fields.location}</Text>
              <Text forwardedAs="pre" fontFamily="base">
                {record.fields.notes}
              </Text>
            </Stack>
          </ListItem>
        )
      })}
    </List>
  )
}

function TransactionsFallback({ error }) {
  console.log(error.original)
  return <Box forwardedAs="pre">{error.message}</Box>
}

function View() {
  return (
    <Box>
      <Text fontSize={3}>View</Text>

      <ErrorBoundary FallbackComponent={TransactionsFallback}>
        <Suspense fallback={<Text>Loading Transactions...</Text>}>
          <Transactions />
        </Suspense>
      </ErrorBoundary>
    </Box>
  )
}

function Create() {
  return <Box>Create Form</Box>
}

function Route({ children, path }) {
  let { match } = useRoute(path)
  if (match) {
    return children
  }
  return null
}

export default function Money() {
  return (
    <Box pt={5}>
      <H1>Money</H1>

      <Link as={RouterLink} to="/money/view">
        View
      </Link>
      <Link as={RouterLink} to="/money/create">
        Create
      </Link>

      <Route path="/money/view">
        <View />
      </Route>
      <Route path="/money/create">
        <Create />
      </Route>
    </Box>
  )
}
