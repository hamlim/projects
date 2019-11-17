import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { BrowserRouter, Link, Route } from '../index.js'

afterEach(cleanup)

test('it renders', () => {
  expect(() =>
    render(
      <BrowserRouter>
        <div>Foo</div>
      </BrowserRouter>,
    ),
  ).not.toThrow()
})

test('it renders a link as an anchor', () => {
  let { container } = render(
    <BrowserRouter>
      <Link to="/foo" data-testid="link">
        Link!
      </Link>
    </BrowserRouter>,
  )

  expect(container.querySelector('a[data-testid="link"]')).not.toBe(null)
})

test('calls children provided to the route component with a match', () => {
  let match
  render(
    <BrowserRouter>
      <Route path="/">
        {rProps => {
          match = rProps.match
          return null
        }}
      </Route>
    </BrowserRouter>,
  )

  expect(match).toBe(true)
})

// maybe this is testing the history package, but oh well might as well test it
// Test is broken 🤔
test.skip('it re-renders the route when a link is clicked', async () => {
  let { container } = render(
    <BrowserRouter>
      <>
        <Route path="/foo">{({ match }) => match && <span data-testid="foo">Foo</span>}</Route>
        <Link to="/foo">Go To Foo</Link>
      </>
    </BrowserRouter>,
  )

  expect(container.querySelector('[data-testid="foo"]')).toBe(null)

  await fireEvent.click(container.querySelector('a'))

  expect(container.querySelector('[data-testid="foo"]')).not.toBe(null)
})
