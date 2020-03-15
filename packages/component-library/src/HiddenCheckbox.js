import React, { useState, forwardRef } from 'react'
import { useId } from './useId'
import { VisuallyHidden } from './VisuallyHidden'

function _HiddenCheckbox({
  checked,
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
      forwardedAs="input"
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

function _UncontrolledHiddenCheckbox({
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

export let UncontrolledHiddenCheckbox = forwardRef((props, ref) => (
  <_UncontrolledHiddenCheckbox innerRef={ref} {...props} />
))
