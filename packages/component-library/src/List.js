import React from 'react'
import { variant } from 'styled-system'
import styled from 'styled-components'
import { Box } from './Box.js'

let listVariant = variant({
  scale: 'lists',
  prop: 'variant',
})

export let List = styled(Box)(listVariant)

List.defaultProps = {
  variant: 'base',
}

export function ListItem(props) {
  return <Box as="li" {...props} />
}
