import { render, fireEvent, cleanup } from '@testing-library/react'
import React, { useContext } from 'react'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'
import { fieldsetContext, Fieldset, UncontrolledFieldset } from '../Fieldset'
import { RadioButton, UncontrolledRadioButton } from '../RadioButton.js'

afterEach(cleanup)

// Workaround react bug, see: https://github.com/facebook/react/issues/12485
const pauseErrorLogging = codeToRun => {
  const logger = console.error
  console.error = () => {}

  codeToRun()

  console.error = logger
}

test('UncontrolledRadioButton throws when rendered outside of a Fieldset', () => {
  pauseErrorLogging(() => {
    expect(() =>
      render(
        <ThemeProvider>
          <UncontrolledRadioButton />
        </ThemeProvider>,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"UncontrolledRadioButton rendered outside of a Fieldset. Either wrap the UncontrolledRadioButton in a Fieldset, or use the default RadioButton component."`,
    )
  })
})

test('UncontrolledRadioButton calls back with the selected value', () => {
  let handleChange = jest.fn()
  let { getByLabelText } = render(
    <ThemeProvider>
      <UncontrolledFieldset name="foo" defaultValue="a" onChange={handleChange}>
        <label>
          <UncontrolledRadioButton value="a" />A
        </label>
        <label>
          <UncontrolledRadioButton value="b" />B
        </label>
        <label>
          <UncontrolledRadioButton value="c" />C
        </label>
      </UncontrolledFieldset>
    </ThemeProvider>,
  )

  fireEvent.click(getByLabelText('B'))

  expect(handleChange).toHaveBeenCalledWith('b')
})
