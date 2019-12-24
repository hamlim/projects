import { render, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import { HiddenCheckbox, ControlledHiddenCheckbox } from '../HiddenCheckbox'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('it calls onChange when clicked', async () => {
  let handleChange = jest.fn()
  let { getByLabelText } = render(
    <ThemeProvider>
      <label>
        Subscribe to thing?
        <HiddenCheckbox onChange={handleChange} />
      </label>
    </ThemeProvider>,
  )

  let checkbox = getByLabelText(`Subscribe to thing?`)

  await fireEvent.click(checkbox)

  expect(handleChange).toHaveBeenCalled()
})

test("it doesn't call onChange when clicked and disabled", () => {
  let handleChange = jest.fn()
  let { getByLabelText } = render(
    <ThemeProvider>
      <label>
        Subscribe to thing?
        <HiddenCheckbox disabled onChange={handleChange} />
      </label>
    </ThemeProvider>,
  )

  fireEvent.click(getByLabelText(`Subscribe to thing?`))

  expect(handleChange).not.toHaveBeenCalled()
})

test('ControlledHiddenCheckbox defaults to defaultChecked', () => {
  let { getByLabelText } = render(
    <ThemeProvider>
      <label>
        Subscribe to thing?
        <ControlledHiddenCheckbox defaultChecked />
      </label>
    </ThemeProvider>,
  )

  expect(getByLabelText(`Subscribe to thing?`).checked).toBe(true)
})
