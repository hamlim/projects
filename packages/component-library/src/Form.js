import * as React from 'react'
import { Box } from './Box'
import useSharedRef from './useSharedRef'

let { createContext, forwardRef, useState, useContext, useEffect } = React

function defaultSubmit() {
  throw new Error('Called Form submit outside of a Form component!')
}

let formContext = createContext(defaultSubmit)

export function useForm() {
  return useContext(formContext)
}

function _Form({ onSubmit, children, innerRef, ...props }) {
  return (
    <formContext.Provider value={onSubmit}>
      <Box forwardedAs="form" ref={innerRef} onSubmit={onSubmit} {...props}>
        {children}
      </Box>
    </formContext.Provider>
  )
}

export let Form = forwardRef((props, ref) => (
  <_Form innerRef={ref} {...props} />
))
