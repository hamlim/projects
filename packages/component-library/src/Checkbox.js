import React, { useState, forwardRef } from 'react'
import { HiddenCheckbox, UncontrolledHiddenCheckbox } from './HiddenCheckbox.js'
import { useTheme } from './ThemeProvider.js'
import { Box } from './Box.js'

function call(fn) {
  if (typeof fn === 'function') {
    fn()
  }
}

function _Checkbox({
  onChange,
  checked,
  disabled,
  innerRef,
  onFocus,
  onBlur,
  unstable_Focused = false,
  ...props
}) {
  let theme = useTheme()
  let [hasFocus, setHasFocus] = useState(false)

  function handleFocus() {
    call(onFocus)
    setHasFocus(true)
  }

  function handleBlur() {
    call(onBlur)
    setHasFocus(false)
  }

  let showFocusOutline = !disabled && (unstable_Focused || hasFocus)

  let bg = null,
    border = `solid 2px ${theme.colors.black}`
  if (checked) {
    if (disabled) {
      bg = theme.colors.gray[3]
      border = `solid 2px ${theme.colors.gray[5]}`
    } else {
      bg = theme.colors.primary
      border = `solid 2px ${theme.colors.primary}`
    }
  } else if (disabled) {
    border = `solid 2px ${theme.colors.gray[3]}`
  }

  return (
    <Box
      border={border}
      bg={bg}
      height="20px"
      width="20px"
      borderRadius={0}
      display="inline-flex"
      alignSelf="center"
      css={`
        outline: ${showFocusOutline
          ? `dashed 1px ${theme.colors.secondary}`
          : null};
      `}
      {...props}
    >
      <HiddenCheckbox
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={innerRef}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </Box>
  )
}

export let Checkbox = forwardRef((props, ref) => (
  <_Checkbox innerRef={ref} {...props} />
))

function _UncontrolledCheckbox({ defaultChecked = false, onChange, ...props }) {
  let [checked, setChecked] = useState(defaultChecked)

  function handleChange(newChecked) {
    onChange(newChecked)
    setChecked(newChecked)
  }

  return <Checkbox {...props} checked={checked} onChange={handleChange} />
}

export let UncontrolledCheckbox = forwardRef((props, ref) => (
  <_UncontrolledCheckbox innerRef={ref} {...props} />
))
