import { render, fireEvent, cleanup, act } from '@testing-library/react'
import React from 'react'
import { Tapable } from '../Tapable.js'
import { ThemeProvider } from '../ThemeProvider.js'

test('it calls onTap when clicked', () => {
  let handleTap = jest.fn()
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap}>button</Tapable>
    </ThemeProvider>,
  )

  fireEvent.click(getByText('button'))

  expect(handleTap).toHaveBeenCalled()
})

test("it doesn't call onTap when clicked and disabled", () => {
  let handleTap = jest.fn()
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap} disabled>
        button
      </Tapable>
    </ThemeProvider>,
  )

  fireEvent.click(getByText('button'))

  expect(handleTap).not.toHaveBeenCalled()
})

test('it calls onTap when the user hits spacebar when focused', () => {
  let handleTap = jest.fn()
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap}>button</Tapable>
    </ThemeProvider>,
  )

  fireEvent.keyDown(getByText('button'), { key: ' ' })

  expect(handleTap).toHaveBeenCalled()
})

test("it doesn't call onTap when the user hits a random key when focused", () => {
  let handleTap = jest.fn()
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap}>button</Tapable>
    </ThemeProvider>,
  )

  fireEvent.keyDown(getByText('button'), { key: 'a' })

  expect(handleTap).not.toHaveBeenCalled()
})

test('it calls onTap when the user hits enter when focused', () => {
  let handleTap = jest.fn()
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap}>button</Tapable>
    </ThemeProvider>,
  )

  fireEvent.keyDown(getByText('button'), { key: 'Enter' })

  expect(handleTap).toHaveBeenCalled()
})

test("it doesn't call onTap when the user hits spacebar when focused and disabled", () => {
  let handleTap = jest.fn()
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap} disabled>
        button
      </Tapable>
    </ThemeProvider>,
  )

  fireEvent.keyDown(getByText('button'), { key: ' ' })

  expect(handleTap).not.toHaveBeenCalled()
})

test("it doesn't call onTap when the user hits enter when focused and disabled", () => {
  let handleTap = jest.fn()
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap} disabled>
        button
      </Tapable>
    </ThemeProvider>,
  )

  fireEvent.keyDown(getByText('button'), { key: 'Enter' })

  expect(handleTap).not.toHaveBeenCalled()
})

test('it prevents default when the user hits spacebar when focused', () => {
  let defaultPrevented = false
  let handleTap = jest.fn(event => {
    defaultPrevented = event.defaultPrevented
  })
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap}>button</Tapable>
    </ThemeProvider>,
  )

  fireEvent.keyDown(getByText('button'), { key: ' ' })

  expect(handleTap).toHaveBeenCalled()
  expect(defaultPrevented).toBe(true)
})

test("it doesn't prevent default when the user hits Enter when focused", () => {
  let defaultPrevented = false
  let handleTap = jest.fn(event => {
    defaultPrevented = event.defaultPrevented
  })
  let { container, getByText } = render(
    <ThemeProvider>
      <Tapable onTap={handleTap}>button</Tapable>
    </ThemeProvider>,
  )

  fireEvent.keyDown(getByText('button'), { key: 'Enter' })

  expect(handleTap).toHaveBeenCalled()
  expect(defaultPrevented).toBe(false)
})

test('it properly communicates that the element is disabled to screen readers', () => {
  let { container } = render(
    <ThemeProvider>
      <Tapable disabled>button</Tapable>
    </ThemeProvider>,
  )

  expect(container.querySelector('[aria-disabled]')).not.toBe(null)
})

// @TODO use async/await - change to babel config for tests
// @TODO re-enable and make sure tests pass
test.skip('it properly focuses the tapable element after a tap', () => {
  let onTap = jest.fn()
  let { getByTestId } = render(
    <ThemeProvider>
      <Tapable onTap={onTap} data-testid="tap">
        Tap Here
      </Tapable>
    </ThemeProvider>,
  )

  fireEvent.click(getByTestId('tap'))

  return new Promise(resolve => {
    act(() => {
      resolve()
    })
  }).then(() => {
    expect(document.activeElement).toBe(getByTestId('tap'))
  })
})
