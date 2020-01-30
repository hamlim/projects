import React from 'react'
import { useCache } from '@matthamlin/simple-cache'
import {
  Box,
  List,
  ListItem,
  Text,
  useTheme,
} from '@matthamlin/component-library'

let cache = new Map()

function useTransactions() {
  return useCache(cache, 'transactions', () =>
    fetch(
      'https://api.airtable.com/v0/applYClUOdBXhRzGf/Dollars?maxRecords=10&view=Main%20View',
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    ).then(res => res.json()),
  )
}

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
  let transactions = useTransactions()

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
              {new Date(record.fields.d_time).toLocaleDateString()} -{' '}
              {new Date(record.fields.d_time).toLocaleTimeString()}
            </Box>
            <Text>${record.fields.d_amount}</Text>
            <Chip>{record.fields.d_category}</Chip>
            <Text>{record.fields.d_location}</Text>
            <Text forwardedAs="pre" fontFamily="base">
              {record.fields.d_notes}
            </Text>
            <Chip>{record.fields.d_tag}</Chip>
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
