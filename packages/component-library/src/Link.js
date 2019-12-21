import React from 'react'
import { css } from 'styled-components'
import { Box } from './Box.js'
import { useTheme } from './ThemeProvider'

export function Link(props) {
  let theme = useTheme()
  return (
    <Box
      css={css`
        color: ${theme.colors.primary};
        text-decoration: underline;
        display: inline;

        &:hover,
        &:focus {
          color: ${theme.colors.secondary};
          text-decoration: none;
        }

        &:focus {
          outline: dashed 1px ${theme.colors.secondary};
        }
      `}
      {...props}
    />
  )
}
