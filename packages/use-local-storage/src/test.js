import useLocalStorage from './index.js'
import * as React from 'react'
import { render } from '@testing-library/react'

// Workaround react bug, see: https://github.com/facebook/react/issues/12485
function pauseErrorLogging(codeToRun) {
  const logger = console.error
  console.error = () => {}

  codeToRun()

  console.error = logger
}

test('useLocalStorage throws on invalid second value of the first arg', () => {
  function Comp() {
    useLocalStorage(['foo'], { key: 'bar' })
    return null
  }

  pauseErrorLogging(() => {
    expect(() => render(<Comp />)).toThrowErrorMatchingInlineSnapshot(
      `"Invalid type provided for the second value of the first argument. You provided: undefined"`,
    )
  })
})

test('useLocalStorage throws on invalid key', () => {
  function Comp({ key }) {
    useLocalStorage(['foo', () => {}], { key })
    return null
  }

  pauseErrorLogging(() => {
    expect(() => render(<Comp />)).toThrowErrorMatchingInlineSnapshot(
      `"Invalid type provided for the key. Expected string, you provided: undefined"`,
    )
    expect(() =>
      render(<Comp key={null} />),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invalid type provided for the key. Expected string, you provided: undefined"`,
    )
    expect(() =>
      render(<Comp key={() => {}} />),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invalid type provided for the key. Expected string, you provided: undefined"`,
    )
    expect(() => render(<Comp key={{}} />)).toThrowErrorMatchingInlineSnapshot(
      `"Invalid type provided for the key. Expected string, you provided: undefined"`,
    )

    function IllegalComp() {
      useLocalStorage(['foo', () => {}])
    }

    expect(() => render(<IllegalComp />)).toThrowErrorMatchingInlineSnapshot(
      `"Invalid type provided for the key. Expected string, you provided: undefined"`,
    )
  })
})

test('hydrate and getItem + setItem', () => {
  let setValue = jest.fn()

  let getItem = jest.fn(() => 'baz')
  let setItem = jest.fn()

  function Comp({ value, hydrate }) {
    useLocalStorage([value, setValue], {
      key: 'foo',
      hydrate,
      getItem,
      setItem,
    })
    return null
  }

  let { rerender } = render(<Comp value="bar" hydrate={false} />)

  // initially hasn't called anything because hydrate is false
  expect(getItem).toHaveBeenCalledTimes(0)
  expect(setItem).toHaveBeenCalledTimes(0)
  expect(setValue).toHaveBeenCalledTimes(0)

  rerender(<Comp value="baz" hydrate={false} />)

  expect(setItem).toHaveBeenCalledTimes(1)
  expect(setItem).toHaveBeenLastCalledWith('foo', 'baz')

  render(<Comp value="bar" hydrate />)
  expect(getItem).toHaveBeenLastCalledWith('foo')
  expect(setValue).toHaveBeenLastCalledWith('baz')
})

test('integration', () => {
  window.localStorage.setItem('foo', 'baz')

  let setValue = jest.fn()

  function Comp({ value }) {
    useLocalStorage([value, setValue], {
      key: 'foo',
    })
    return null
  }

  let { rerender } = render(<Comp value="bar" />)

  // defaults to hydrating
  expect(setValue).toHaveBeenCalledTimes(1)
  expect(setValue).toHaveBeenLastCalledWith('baz')

  rerender(<Comp value={{ nested: true }} />)

  expect(window.localStorage.getItem('foo')).toBe(
    JSON.stringify({ nested: true }),
  )
})
