import React from 'react'
import {
  H1,
  Box,
  Link,
  List,
  ListItem,
  Text,
  useTheme,
} from '@matthamlin/component-library'
import { Link as RouterLink, useRoute } from '@matthamlin/reroute-browser'
import useAirtable from '../useAirtable'

let base = `app2FaIaQeVAWkNTF`
let table = `transactions`

function Log({ children }) {
  console.log(children)
  return null
}

function Stack({ children }) {
  return React.Children.map(children, child => <Box my={4}>{child}</Box>)
}

function Chip({ children }) {
  let theme = useTheme()
  return (
    <Box
      forwardedAs="span"
      p={3}
      display="inline-flex"
      borderRadius={1}
      bg={theme.colors.primary}
      color={theme.colors.white}
    >
      {children}
    </Box>
  )
}

function Transactions() {
  let transactions = useAirtable({
    base,
    table,
  })

  if (!transactions.records) {
    let err = new Error('Unable to fetch transactions.')
    err.original = transactions
    throw err
  }

  return (
    <List variant="base" forwardedAs="ul">
      {transactions.records.map((record, index) => (
        <ListItem key={record.id} mt={index > 0 ? 5 : null}>
          <Log>{record.fields}</Log>
          <Stack>
            <Box forwardedAs="time">
              {new Date(record.fields.createdDate).toLocaleDateString()} -{' '}
              {new Date(record.fields.createdDate).toLocaleTimeString()}
            </Box>
            <Text>${record.fields.amount}</Text>
            <Chip>{record.fields.tags}</Chip>
            <Text>{record.fields.location}</Text>
            <Text forwardedAs="pre" fontFamily="base">
              {record.fields.notes}
            </Text>
          </Stack>
        </ListItem>
      ))}
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
