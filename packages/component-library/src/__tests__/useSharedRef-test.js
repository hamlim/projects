import useSharedRef from '../useSharedRef'
import React from 'react'
import { render } from '@testing-library/react'

test('it provides a ref object', () => {
  let ref

  function Comp() {
    ref = useSharedRef()
    return null
  }

  render(<Comp />)
  ref.current = 'test'
  expect(ref.current).toBe('test')
})

test('it works with html elements', () => {
  let ref
  function Comp() {
    ref = useSharedRef()
    return <div ref={ref} data-testid="foo" />
  }

  let { getByTestId } = render(<Comp />)

  expect(getByTestId('foo')).toBe(ref.current)
})

test('it sets the passed in ref for useRef boxes', () => {
  let refArg = { current: null }

  function Comp() {
    let ref = useSharedRef(refArg)
    return <div ref={ref} data-testid="foo" />
  }

  let { getByTestId } = render(<Comp />)

  expect(refArg.current).toBe(getByTestId('foo'))
})

test('it sets the passed in ref for function refs', () => {
  let refArg = jest.fn()
  function Comp() {
    let ref = useSharedRef(refArg)
    return <div ref={ref} data-testid="foo" />
  }

  let { getByTestId } = render(<Comp />)

  expect(refArg).toHaveBeenCalledTimes(1)
})
