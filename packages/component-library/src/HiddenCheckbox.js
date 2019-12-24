import React, { useState, forwardRef } from 'react'
import { css } from 'styled-components'
import Box from './Box'
import { useId } from './useId'
import { VisuallyHidden } from './VisuallyHidden'

function _HiddenCheckbox({
  checked: providedChecked,
  id: providedId,
  defaultChecked = false,
  onChange,
  innerRef,
  disabled,
  ...props
}) {
  let id = useId(providedId)

  let [localChecked, setLocalChecked] = useState(defaultChecked)

  let checked = localChecked
  if (typeof providedChecked !== 'undefined') {
    checked = providedChecked
  }

  function handleChange() {
    if (!disabled) {
      setLocalChecked(c => !c)
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
