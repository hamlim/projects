import React from 'react'
import { css } from 'styled-components'
import { Box } from './Box'

function Abstract(props) {
  return (
    <Box
      mb={0}
      ml={0}
      mt={0}
      mr={0}
      pl={0}
      pr={0}
      pt={0}
      pb={0}
      css={css`
        list-style: none;
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
