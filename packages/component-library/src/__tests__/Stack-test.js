import { render, fireEvent, cleanup, wait } from '@testing-library/react'
import React from 'react'
import { Stack } from '../Stack.js'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('it wraps children in a Box', () => {
  function Custom({ children }) {
    return <div data-testid="Custom">{children}</div>
  }
  let { getByTestId } = render(
    <ThemeProvider>
      <Stack props={{ forwardedAs: Custom }}>
        <p>Test</p>
      </Stack>
    </ThemeProvider>,
  )

  expect(getByTestId('Custom')).toBeInTheDocument()
})
