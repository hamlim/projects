import React, { useState, forwardRef } from 'react'
import ReactDOM from 'react-dom'
import { HiddenCheckbox, UncontrolledHiddenCheckbox } from './HiddenCheckbox.js'
import { useTheme } from './ThemeProvider.js'
import { Box } from './Box.js'
import styled from 'styled-components'

function call(fn) {
  if (typeof fn === 'function') {
    fn()
  }
}

let BaseCheckbox = styled(Box)(
  ({ showFocusOutline, theme }) => `
  outline: ${showFocusOutline ? theme.outline : null};
`,
)

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
    // @NOTE: There is a bug in React which forces us to flush this event syncronously to ensure onChange is called
    // @SEE: https://github.com/facebook/react/issues/18591
    ReactDOM.flushSync(() => {
      setHasFocus(true)
    })
  }

  function handleBlur() {
    call(onBlur)
    // @NOTE: There is a bug in React which forces us to flush this event syncronously to ensure onChange is called
    // @SEE: https://github.com/facebook/react/issues/18591
    ReactDOM.flushSync(() => {
      setHasFocus(false)
    })
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
    <BaseCheckbox
      border={border}
      bg={bg}
      height="20px"
      width="20px"
      borderRadius={0}
      display="inline-flex"
      alignSelf="center"
      showFocusOutline={showFocusOutline}
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
    </BaseCheckbox>
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
