import React, { useState, forwardRef } from 'react'
import { css } from 'styled-components'
import Box from './Box'
import { useId } from './useId'
import { VisuallyHidden } from './VisuallyHidden'

function _HiddenCheckbox({
  checked: providedChecked,
  id: providedId,
  onChange,
  innerRef,
  disabled,
  ...props
}) {
  let id = useId(providedId)
  function handleChange() {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <VisuallyHidden
      as="input"
      disabled={disabled}
      ref={innerRef}
      id={id}
      onChange={handleChange}
      checked={checked}
      type="checkbox"
      {...props}
    />
  )
}

export let HiddenCheckbox = forwardRef((props, ref) => {
  return <_HiddenCheckbox innerRef={ref} {...props} />
})

function _ControlledHiddenCheckbox({
  defaultChecked = false,
  onChange = () => {},
  ...props
}) {
  let [checked, setChecked] = useState(defaultChecked)

  function handleChange() {
    setChecked(!checked)
    onChange(!checked)
  }

  return (
    <_HiddenCheckbox {...props} checked={checked} onChange={handleChange} />
  )
}

export let ControlledHiddenCheckbox = forwardRef((props, ref) => (
  <_ControlledHiddenCheckbox innerRef={ref} {...props} />
))
