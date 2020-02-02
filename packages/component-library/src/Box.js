import styled from 'styled-components'
import {
  space,
  layout,
  flexbox,
  typography,
  color,
  grid,
  background,
  border,
  position,
  shadow,
  compose,
} from 'styled-system'

import Base from '@matthamlin/base-styled'

export let Box = styled(Base)(
  compose(
    space,
    layout,
    flexbox,
    typography,
    color,
    grid,
    background,
    border,
    position,
    shadow,
  ),
)
