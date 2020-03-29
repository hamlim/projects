import React, { useState, useCallback } from 'react'
import { Box } from './Box'
import styled from 'styled-components'

let BaseTextarea = styled(Box)(
  ({ theme, unstable_Focused }) => `
    &:focus {
      outline: ${theme.outline};
    }
    &:disabled {
      background-color: ${theme.colors.gray[4]};
    }
    outline: ${unstable_Focused ? theme.outline : null};
`,
)

export function Textarea({ unstable_Focused = false, onChange, ...props }) {
  let handleChange = useCallback(
    function handleChange(event) {
      onChange(event.target.value)
    },
    [onChange],
  )
  return (
    <BaseTextarea
      forwardedAs="textarea"
      borderRadius={0}
      bg="gray.2"
      border="none"
      minHeight={100}
      resizable="both"
      fontSize={1}
      fontFamily="base"
      display="block"
      minWidth="100%"
      px="0.5em"
      py="0.5em"
      unstable_Focused={unstable_Focused}
      onChange={handleChange}
      {...props}
    />
  )
}

function noop() {}

export function UncontrolledTextarea({
  onChange = noop,
  defaultValue = '',
  ...props
}) {
  let [value, setValue] = useState(defaultValue)
  let handleChange = useCallback(
    function handleChange(value) {
      setValue(value)
      onChange(value)
    },
    [onChange],
  )
  return <Textarea {...props} value={value} onChange={handleChange} />
}
