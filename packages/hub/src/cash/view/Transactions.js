import React from 'react'
import { useCache } from '@matthamlin/simple-cache'
import {
  Box,
  List,
  ListItem,
  Text,
  useTheme,
} from '@matthamlin/component-library'
import useAirtable from '../../useAirtable'

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

export function Transactions() {
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

export function TransactionsFallback({ error }) {
  console.log(error.original)
  return <Box forwardedAs="pre">{error.message}</Box>
}
