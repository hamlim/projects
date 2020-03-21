import { render, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import { Button } from '../Button.js'
import { Form, useForm } from '../Form.js'
import { ThemeProvider } from '../ThemeProvider.js'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('integration', () => {
  function WrappedButton() {
    let submit = useForm()
    return <Button onTap={submit}>Click</Button>
  }
  let handleSubmit = jest.fn()
  let { container } = render(
    <ThemeProvider>
      <Form onSubmit={handleSubmit}>
        <WrappedButton />
      </Form>
    </ThemeProvider>,
  )

  fireEvent.click(container.querySelector('[role="button"]'))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
