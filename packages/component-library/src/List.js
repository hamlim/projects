import React from 'react'
import { css } from 'styled-components'
import { Box } from './Box'

export function OrderedList(props) {
  return (
    <Box
      as="ol"
      css={css`
        list-style: none;
      `}
      {...props}
    />
  )
}

export function UnorderedList(props) {
  return (
    <Box
      as="ul"
      css={css`
        list-style: none;
      `}
      {...props}
    />
  )
}

export function ListItem(props) {
  return <Box as="li" {...props} />
}
