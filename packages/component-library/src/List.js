import React from 'react'
import { css } from 'styled-components'
import { Box } from './Box'

export function OrderedList(props) {
  return (
    <Box
      as="ol"
      css={css`
        list-style: none;
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
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
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
      `}
      {...props}
    />
  )
}

export function ListItem(props) {
  return <Box as="li" {...props} />
}
