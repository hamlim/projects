import React from 'react'
import { css } from 'styled-components'
import { Box } from './Box'

function Abstract(props) {
  return (
    <Box
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

export function OrderedList(props) {
  return <Abstract as="ol" {...props} />
}

export function UnorderedList(props) {
  return <Abstract as="ul" {...props} />
}

export function ListItem(props) {
  return <Box as="li" {...props} />
}
