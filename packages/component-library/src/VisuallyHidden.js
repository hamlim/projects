import { Box } from './Box'
import styled from 'styled-components'

export let VisuallyHidden = styled(Box)`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`
