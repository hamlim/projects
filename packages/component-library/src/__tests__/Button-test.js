import { render, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import { Button } from '../Button.js'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('it calls onClick when clicked', () => {
  let handleClick = jest.fn()
  let { getByText } = render(
    <ThemeProvider>
      <Button onClick={handleClick}>Foo</Button>
    </ThemeProvider>,
  )

  fireEvent.click(getByText(`Foo`))

  expect(handleClick).toHaveBeenCalled()
})

test("it doesn't call onClick when clicked and disabled", () => {
  let handleClick = jest.fn()
  let { getByText } = render(
    <ThemeProvider>
      <Button onClick={handleClick} disabled>
        Foo
      </Button>
    </ThemeProvider>,
  )

  fireEvent.click(getByText(`Foo`))

  expect(handleClick).not.toHaveBeenCalled()
})
