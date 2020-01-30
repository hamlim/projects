import styled from 'styled-components'
import { Box } from './Box.js'

export let Link = styled(Box)`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  display: inline;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
  }

  &:focus {
    outline: dashed 1px ${props => props.theme.colors.secondary};
  }
`
