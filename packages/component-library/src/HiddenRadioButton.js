import React, { forwardRef, useContext, useState, useCallback } from 'react'
import { useId } from './useId'
import { VisuallyHidden } from './VisuallyHidden'
import { fieldsetContext } from './Fieldset'

function _HiddenRadioButton({
  onChange,
  id: providedId,
  checked,
  innerRef,
  value,
  name,
  disabled,
  ...props
}) {
  let id = useId(providedId)
  function handleChange() {
    if (!disabled) {
      onChange(value)
    }
  }
  return (
    <VisuallyHidden
      forwardedAs="input"
      id={id}
      ref={innerRef}
      onChange={handleChange}
      value={value}
      name={name}
      disabled={disabled}
      checked={checked}
      type="radio"
      {...props}
    />
  )
}

export let HiddenRadioButton = forwardRef((props, ref) => (
  <_HiddenRadioButton innerRef={ref} {...props} />
))

function _UncontrolledHiddenRadioButton({
  onChange = () => {},
  value,
  innerRef,
  ...props
}) {
  let context = useContext(fieldsetContext)

  if (!context) {
    throw new Error(
      'UncontrolledHiddenRadioButton rendered outside of a Fieldset. Either wrap the UncontrolledHiddenRadioButton in a Fieldset, or use the default HiddenRadioButton component.',
    )
  }

  let [selectedValue, onValueSelect, additionalProps] = context

  let handleChange = useCallback(
    function handleChange(value) {
      onChange(value)
      onValueSelect(value)
    },
    [onChange],
  )

  return (
    <HiddenRadioButton
      ref={innerRef}
      value={value}
      checked={selectedValue === value}
      onChange={handleChange}
      {...additionalProps}
      {...props}
    />
  )
}

export let UncontrolledHiddenRadioButton = forwardRef((props, ref) => (
  <_UncontrolledHiddenRadioButton {...props} innerRef={ref} />
))
