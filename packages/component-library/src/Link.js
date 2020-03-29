import styled from 'styled-components'
import { Box } from './Box.js'

export let Link = styled(Box)(
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
