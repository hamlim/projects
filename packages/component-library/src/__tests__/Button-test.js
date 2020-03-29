import { render, fireEvent, cleanup, wait } from '@testing-library/react'
import React from 'react'
import { Button } from '../Button.js'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('it calls onTap when clicked', () => {
  let handleClick = jest.fn()
  let { getByText } = render(
    <ThemeProvider>
      <Button onTap={handleClick}>Foo</Button>
    </ThemeProvider>,
  )

  fireEvent.click(getByText(`Foo`))

  expect(handleClick).toHaveBeenCalled()
})

test("it doesn't call onTap when clicked and disabled", () => {
  let handleClick = jest.fn()
  let { getByText } = render(
    <ThemeProvider>
      <Button onTap={handleClick} disabled>
        Foo
      </Button>
    </ThemeProvider>,
  )

  fireEvent.click(getByText(`Foo`))

  expect(handleClick).not.toHaveBeenCalled()
})
