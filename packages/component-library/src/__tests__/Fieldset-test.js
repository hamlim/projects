import { render, fireEvent, cleanup } from '@testing-library/react'
import React, { useContext } from 'react'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'
import { fieldsetContext, Fieldset, ControlledFieldset } from '../Fieldset'

afterEach(cleanup)

test('Fieldset provides the right context', () => {
  let handleChange = () => {}
  let context
  function Test() {
    context = useContext(fieldsetContext)
    return null
  }
  let { container } = render(
    <ThemeProvider>
      <Fieldset value={5} onChange={handleChange} name="foo">
        <Test />
      </Fieldset>
    </ThemeProvider>,
  )

  expect(context[0]).toBe(5)
  expect(context[1]).toBe(handleChange)
  expect(context[2]).toMatchInlineSnapshot(`
    Object {
      "name": "foo",
    }
  `)
})

test('ControlledFieldset provides the right context, defaulting to defaultValue', () => {
  let handleChange = () => {}
  let context
  function Test() {
    context = useContext(fieldsetContext)
    return null
  }
  let { container } = render(
    <ThemeProvider>
      <ControlledFieldset defaultValue={3} onChange={handleChange}>
        <Test />
      </ControlledFieldset>
    </ThemeProvider>,
  )

  expect(context[0]).toBe(3)
})
