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

import Base from '@matthamlin/strip-styled'

let Comp = props => {
  throw new Error('Here?????')
  return <Base {...props} />
}

export let Box = styled('foo')(
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

Box.defaultProps = {
  as: 'div',
}
