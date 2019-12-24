import React, { forwardRef } from 'react'
import { Box } from './Box'
import { css } from 'styled-components'

export let VisuallyHidden = forwardRef((props, ref) => {
  return (
    <Box
      {...props}
      ref={ref}
      css={css`
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      `}
    />
  )
})
