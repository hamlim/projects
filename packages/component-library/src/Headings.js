import React, { forwardRef } from 'react'
import { Box } from './Box.js'

export let H1 = forwardRef((props, ref) => {
  return <Box forwardedAs="h1" fontSize={4} {...props} ref={ref} />
})

export let H2 = forwardRef((props, ref) => {
  return <Box forwardedAs="h2" fontSize={3} {...props} ref={ref} />
})

export let H3 = forwardRef((props, ref) => {
  return <Box forwardedAs="h3" fontSize={2} {...props} ref={ref} />
})

export let H4 = forwardRef((props, ref) => {
  return <Box forwardedAs="h4" fontSize={1} {...props} ref={ref} />
})

export let H5 = forwardRef((props, ref) => {
  return <Box forwardedAs="h5" fontSize={1} {...props} ref={ref} />
})

export let H6 = forwardRef((props, ref) => {
  return <Box forwardedAs="h5" fontSize={1} {...props} ref={ref} />
})
