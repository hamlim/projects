import styled from 'styled-components'
import { Box } from './Box.js'
import React, { forwardRef, useEffect, useRef } from 'react'
import useSharedRef from './useSharedRef'

function _LinkImpl({ autoFocus, innerRef, ...props }) {
  let sharedRef = useSharedRef(innerRef)

  let isinitalMount = useRef(true)

  useEffect(() => {
    if (autoFocus && isinitalMount.current) {
      isinitalMount.current = false
      sharedRef.current.focus()
    }
  }, [autoFocus])

  return <Box ref={sharedRef} {...props} />
}

let LinkImpl = forwardRef((props, ref) => (
  <_LinkImpl {...props} innerRef={ref} />
))

export let Link = styled(LinkImpl)(
  ({ theme }) => `
    color: ${theme.colors.primary};
    text-decoration: underline;
    display: inline;

    &:hover,
    &:focus {
      color: ${theme.colors.secondary};
      text-decoration: none;
    }

    &:focus {
      outline: ${theme.outline};
    }
`,
)
