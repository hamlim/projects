import { render, fireEvent, cleanup } from '@testing-library/react'
import React, { useContext } from 'react'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'
import { fieldsetContext, Fieldset, UncontrolledFieldset } from '../Fieldset'
import {
  HiddenRadioButton,
  UncontrolledHiddenRadioButton,
} from '../HiddenRadioButton.js'

afterEach(cleanup)

// Workaround react bug, see: https://github.com/facebook/react/issues/12485
const pauseErrorLogging = codeToRun => {
  const logger = console.error
  console.error = () => {}

  codeToRun()

  console.error = logger
}

test('UncontrolledHiddenRadioButton throws when rendered outside of a Fieldset', () => {
  pauseErrorLogging(() => {
    expect(() =>
      render(
        <ThemeProvider>
          <UncontrolledHiddenRadioButton />
        </ThemeProvider>,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"UncontrolledHiddenRadioButton rendered outside of a Fieldset. Either wrap the UncontrolledHiddenRadioButton in a Fieldset, or use the default HiddenRadioButton component."`,
    )
  })
})

test('UncontrolledHiddenRadioButton calls back with the selected value', () => {
  let handleChange = jest.fn()
  let { getByLabelText } = render(
    <ThemeProvider>
      <UncontrolledFieldset name="foo" defaultValue="a" onChange={handleChange}>
        <label>
          <UncontrolledHiddenRadioButton value="a" />A
        </label>
        <label>
          <UncontrolledHiddenRadioButton value="b" />B
        </label>
        <label>
          <UncontrolledHiddenRadioButton value="c" />C
        </label>
      </UncontrolledFieldset>
    </ThemeProvider>,
  )

  fireEvent.click(getByLabelText('B'))

  expect(handleChange).toHaveBeenCalledWith('b')
})
