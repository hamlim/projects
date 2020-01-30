import React from 'react'
import { omit } from '@styled-system/props'
let { forwardRef } = React
import styled from 'styled-components'

let Base = styled('div')``

export default forwardRef((props, ref) => <Base {...omit(props)} ref={ref} />)
