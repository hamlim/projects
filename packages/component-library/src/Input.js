import React, { useState, useCallback, forwardRef } from 'react'
import { Box } from './Box'
import styled from 'styled-components'

let BaseInput = styled(Box)(
  ({ unstable_Focused, theme }) => `
    &:focus {
      outline: ${theme.outline};
    }
    &:disabled {
      background-color: ${theme.colors.gray[4]};
    }
    outline: ${unstable_Focused ? theme.outline : null};
`,
)

function _Input({ unstable_Focused = false, innerRef, onChange, ...props }) {
  let handleChange = useCallback(
    function handleChange(event) {
      onChange(event.target.value)
    },
    [onChange],
  )
  return (
    <BaseInput
      ref={innerRef}
      forwardedAs="input"
      borderRadius={0}
      bg="gray.2"
      border="none"
      height={50}
      fontSize={1}
      fontFamily="base"
      display="block"
      minWidth="100%"
      px="0.5em"
      py={0}
      unstable_Focused={unstable_Focused}
      onChange={handleChange}
      {...props}
    />
  )
}

export let Input = forwardRef((props, ref) => (
  <_Input innerRef={ref} {...props} />
))

function noop() {}

function _UncontrolledInput({ onChange = noop, defaultValue = '', ...props }) {
  let [value, setValue] = useState(defaultValue)
  let handleChange = useCallback(
    function handleChange(value) {
      setValue(value)
      onChange(value)
    },
    [onChange],
  )
  return <Input {...props} value={value} onChange={handleChange} />
}

export let UncontrolledInput = forwardRef((props, ref) => (
  <_UncontrolledInput innerRef={ref} {...props} />
))
