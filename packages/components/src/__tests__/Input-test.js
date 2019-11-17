import { render, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import { Input, ControlledInput } from '../Input.js'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('Input calls onChange with the value only', () => {
  let handleChange = jest.fn()
  let { container } = render(
    <ThemeProvider>
      <Input onChange={handleChange} />
    </ThemeProvider>,
  )

  let input = container.querySelector('input')

  fireEvent.change(input, { target: { value: 'value' } })

  expect(handleChange).toHaveBeenCalledWith('value')
})

test('ControlledInput calls onChange', () => {
  let handleChange = jest.fn()
  let { container } = render(
    <ThemeProvider>
      <ControlledInput onChange={handleChange} />
    </ThemeProvider>,
  )

  let input = container.querySelector('input')

  fireEvent.change(input, { target: { value: 'value' } })

  expect(handleChange).toHaveBeenCalledWith('value')
})
