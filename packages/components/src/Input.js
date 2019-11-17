/** @jsx jsx */
import { useState, useCallback } from 'react'
import { jsx, css } from '@emotion/core'
import { Box } from './Box'

export function Input({ unstable_Focused = false, onChange, ...props }) {
  let handleChange = useCallback(
    function handleChange(event) {
      onChange(event.target.value)
    },
    [onChange],
  )
  return (
    <Box
      as="input"
      borderRadius={0}
      css={theme =>
        css({
          backgroundColor: theme.colors.gray[2],
          border: 'none',
          height: 50,
          fontSize: theme.fontSizes[1],
          display: 'block',
          minWidth: '100%',
          padding: '0 .5em',
          ':focus': {
            outline: `dashed 1px ${theme.colors.secondary}`,
          },
          ':disabled': {
            backgroundColor: theme.colors.gray[4],
          },
          ...(unstable_Focused
            ? {
                outline: `dashed 1px ${theme.colors.secondary}`,
              }
            : {}),
        })
      }
      onChange={handleChange}
      {...props}
    />
  )
}

function noop() {}

export function ControlledInput({
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
  return <Input {...props} value={value} onChange={handleChange} />
}
