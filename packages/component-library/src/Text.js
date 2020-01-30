import React, { forwardRef } from 'react'
import { Box } from './Box.js'

export let Text = forwardRef((props, ref) => {
  return <Box forwardedAs="p" fontSize={1} {...props} ref={ref} />
})
