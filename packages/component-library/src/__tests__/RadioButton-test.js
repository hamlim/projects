import { render, fireEvent, cleanup } from '@testing-library/react'
import React, { useContext } from 'react'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'
import { fieldsetContext, Fieldset, ControlledFieldset } from '../Fieldset'
import { RadioButton, ControlledRadioButton } from '../RadioButton.js'

afterEach(cleanup)

// Workaround react bug, see: https://github.com/facebook/react/issues/12485
const pauseErrorLogging = codeToRun => {
  const logger = console.error
  console.error = () => {}

  codeToRun()

  console.error = logger
}

test('ControlledRadioButton throws when rendered outside of a Fieldset', () => {
  pauseErrorLogging(() => {
    expect(() =>
      render(
        <ThemeProvider>
          <ControlledRadioButton />
        </ThemeProvider>,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"ControlledRadioButton rendered outside of a Fieldset. Either wrap the ControlledRadioButton in a Fieldset, or use the default RadioButton component."`,
    )
  })
})

test('ControlledRadioButton calls back with the selected value', () => {
  let handleChange = jest.fn()
  let { getByLabelText } = render(
    <ThemeProvider>
      <ControlledFieldset name="foo" defaultValue="a" onChange={handleChange}>
        <label>
          <ControlledRadioButton value="a" />A
        </label>
        <label>
          <ControlledRadioButton value="b" />B
        </label>
        <label>
          <ControlledRadioButton value="c" />C
        </label>
      </ControlledFieldset>
    </ThemeProvider>,
  )

  fireEvent.click(getByLabelText('B'))

  expect(handleChange).toHaveBeenCalledWith('b')
})
