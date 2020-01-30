import React, { forwardRef } from 'react'
import { Box } from './Box.js'

export let H1 = forwardRef((props, ref) => {
  return <Box as="h1" fontSize={4} {...props} ref={ref} />
})

export let H2 = forwardRef((props, ref) => {
  return <Box as="h2" fontSize={3} {...props} ref={ref} />
})

export let H3 = forwardRef((props, ref) => {
  return <Box as="h3" fontSize={2} {...props} ref={ref} />
})

export let H4 = forwardRef((props, ref) => {
  return <Box as="h4" fontSize={1} {...props} ref={ref} />
})

export let H5 = forwardRef((props, ref) => {
  return <Box as="h5" fontSize={1} {...props} ref={ref} />
})

export let H6 = forwardRef((props, ref) => {
  return <Box as="h5" fontSize={1} {...props} ref={ref} />
})
