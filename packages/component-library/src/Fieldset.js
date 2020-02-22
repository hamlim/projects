import React, { forwardRef, createContext, useState, useCallback } from 'react'
import { Box } from './Box.js'
import { useTheme } from './ThemeProvider.js'

export let fieldsetContext = createContext(null)

function _Fieldset({ children, value, onChange, name, innerRef, ...props }) {
  return (
    <fieldsetContext.Provider value={[value, onChange, { name }]}>
      <Box ref={innerRef} is="fieldset" {...props}>
        {children}
      </Box>
    </fieldsetContext.Provider>
  )
}

export let Fieldset = forwardRef((props, ref) => (
  <_Fieldset {...props} innerRef={ref} />
))

function _ControlledFieldset({
  onChange = () => {},
  defaultValue = null,
  innerRef,
  name,
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
  return (
    <Fieldset
      {...props}
      name={name}
      ref={innerRef}
      value={value}
      onChange={handleChange}
    />
  )
}

export let ControlledFieldset = forwardRef((props, ref) => (
  <_ControlledFieldset innerRef={ref} {...props} />
))
