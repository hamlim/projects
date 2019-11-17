/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Box } from './Box.js'

export function Link(props) {
  return (
    <Box
      css={theme => css`
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
