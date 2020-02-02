import React from 'react'
import { omit } from '@styled-system/props'
let { forwardRef } = React
import styled from 'styled-components'

let Base = styled('div')``

let filter = /(fontSize)/

function enhancedOmit(props) {
  let next = {}
  for (let prop in props) {
    if (filter.test(prop)) {
      continue
    }
    next[prop] = props[prop]
  }
  return omit(next)
}

export default forwardRef((props, ref) => (
  <Base {...enhancedOmit(props)} ref={ref} />
))
