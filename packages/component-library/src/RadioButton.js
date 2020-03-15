import React, { forwardRef, useContext, useState, useCallback } from 'react'
import { useId } from './useId'
import { VisuallyHidden } from './VisuallyHidden'
import { fieldsetContext } from './Fieldset'

function _RadioButton({
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

export let RadioButton = forwardRef((props, ref) => (
  <_RadioButton innerRef={ref} {...props} />
))

function _UncontrolledRadioButton({
  onChange = () => {},
  value,
  innerRef,
  ...props
}) {
  let context = useContext(fieldsetContext)

  if (!context) {
    throw new Error(
      'UncontrolledRadioButton rendered outside of a Fieldset. Either wrap the UncontrolledRadioButton in a Fieldset, or use the default RadioButton component.',
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
    <RadioButton
      ref={innerRef}
      value={value}
      checked={selectedValue === value}
      onChange={handleChange}
      {...additionalProps}
      {...props}
    />
  )
}

export let UncontrolledRadioButton = forwardRef((props, ref) => (
  <_UncontrolledRadioButton {...props} innerRef={ref} />
))
