import React from 'react'
import { Box } from './Box.js'

export function Text(props) {
  return <Box forwardedAs="p" fontSize={1} {...props} />
}
