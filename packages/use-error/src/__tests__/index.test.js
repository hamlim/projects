import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import { useError } from '../index.js'

test('integration', () => {
  let trigger
  function Component() {
    trigger = useError()
    return null
  }

  render(<Component />)

  expect(typeof trigger).toBe('function')
})
