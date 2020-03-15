import React, { useState, useCallback } from 'react'
import { css } from 'styled-components'
import { Box } from './Box'
import { useTheme } from './ThemeProvider'

export function Textarea({ unstable_Focused = false, onChange, ...props }) {
  let theme = useTheme()
  let handleChange = useCallback(
    function handleChange(event) {
      onChange(event.target.value)
    },
    [onChange],
  )
  return (
    <Box
      forwardedAs="textarea"
      borderRadius={0}
      bg={theme.colors.gray[2]}
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
      css={({ theme, unstable_Focused }) => `
        &:focus {
          outline: dashed 1px ${theme.colors.secondary};
        }
        &:disabled {
          background-color: ${theme.colors.gray[4]};
        }
        ${
          unstable_Focused
            ? `
              outline: dashed 1px ${theme.colors.secondary};
            `
            : ''
        }
      `}
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
