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
import { omit } from '@styled-system/props'

import Base from '@matthamlin/strip-styled'
import React, { forwardRef } from 'react'

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
