import { useRefs, mergeRefs, useSharedRef } from './index.js'
import React, { createRef } from 'react'
import { render } from '@testing-library/react'

test('useRefs integration', () => {
  let register, get, refs
  function Comp() {
    ;[register, get, refs] = useRefs()
    return null
  }

  render(<Comp />)

  expect(typeof register).toBe('function')
  expect(typeof get).toBe('function')

  let fooRef = register('foo')

  expect(typeof fooRef).toBe('function')

  fooRef('bar')

  expect(get('foo')).toBe('bar')

  expect(refs.get('foo')).toBe('bar')
})

test('useRefs register throws on no key', () => {
  let register, get, refs
  function Comp() {
    ;[register, get, refs] = useRefs()
    return null
  }

  render(<Comp />)

  expect(() => register()).toThrowErrorMatchingInlineSnapshot(
    `"\`useRefs\`' \`register\` method called without a key."`,
  )
  expect(() => register(false)).toThrowErrorMatchingInlineSnapshot(
    `"\`useRefs\`' \`register\` method called without a key."`,
  )
  expect(() => register(null)).toThrowErrorMatchingInlineSnapshot(
    `"\`useRefs\`' \`register\` method called without a key."`,
  )
})

test('useRefs get returns null with no key', () => {
  let register, get, refs
  function Comp() {
    ;[register, get, refs] = useRefs()
    return null
  }

  render(<Comp />)

  expect(get()).toBe(null)
})

test('mergeRefs accounts for object refs, skipping arrays, null and undefined', () => {
  let refA = createRef()
  let refB = createRef()

  let nullRef = null
  let undefinedRef
  let arrRef = []

  let merged = mergeRefs(refA, refB, nullRef, undefinedRef, arrRef)

  merged('foo')

  expect(refA.current).toBe('foo')
  expect(refB.current).toBe('foo')
})

test('mergeRefs accounts for function refs', () => {
  let refA = jest.fn()
  let refB = jest.fn()

  let merged = mergeRefs(refA, refB)

  merged('foo')

  expect(refA).toHaveBeenLastCalledWith('foo')
  expect(refB).toHaveBeenLastCalledWith('foo')
})

test('useSharedRef provides a ref object', () => {
  let ref

  function Comp() {
    ref = useSharedRef()
    return null
  }

  render(<Comp />)
  ref.current = 'test'
  expect(ref.current).toBe('test')
})

test('useSharedRef works with html elements', () => {
  let ref
  function Comp() {
    ref = useSharedRef()
    return <div ref={ref} data-testid="foo" />
  }

  let { getByTestId } = render(<Comp />)

  expect(getByTestId('foo')).toBe(ref.current)
})

test('useSharedRef sets the passed in ref for useRef boxes', () => {
  let refArg = { current: null }

  function Comp() {
    let ref = useSharedRef(refArg)
    return <div ref={ref} data-testid="foo" />
  }

  let { getByTestId } = render(<Comp />)

  expect(refArg.current).toBe(getByTestId('foo'))
})

test('useSharedRef sets the passed in ref for function refs', () => {
  let refArg = jest.fn()
  function Comp() {
    let ref = useSharedRef(refArg)
    return <div ref={ref} data-testid="foo" />
  }

  let { getByTestId } = render(<Comp />)

  expect(refArg).toHaveBeenCalledTimes(1)
})

test('useSharedRef supports multipe different target refs', () => {
  let refOne = { current: null }
  let refTwo = { current: null }
  function Comp() {
    let ref = useSharedRef(refOne, refTwo)
    return <div ref={ref} data-testid="foo" />
  }
  let { getByTestId } = render(<Comp />)

  expect(refOne.current).toBe(getByTestId('foo'))
  expect(refTwo.current).toBe(getByTestId('foo'))
})
