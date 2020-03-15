import * as React from 'react'
import { Box } from './Box'

export let Label = React.forwardRef((props, ref) => (
  <Box forwardedAs="label" display="block" ref={ref} {...props} />
))
