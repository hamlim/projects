import React, { forwardRef, Children } from 'react'
import { Box } from './Box'

function _Stack({ children, inline = false, props = {}, innerRef, ...rest }) {
  return (
    <Box display={inline ? 'inline-flex' : 'flex'} ref={innerRef} {...rest}>
      {Children.map(children, child => (
        <Box {...props}>{child}</Box>
      ))}
    </Box>
  )
}

export let Stack = forwardRef((props, ref) => (
  <_Stack innerRef={ref} {...props} />
))
