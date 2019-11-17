import React from 'react'
import { useMedia } from '../UseMedia.js'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

test.skip('useMedia calls addListener and removeListener', () => {
  let addListener = jest.fn()
  let removeListener = jest.fn()
  function fakeMatchMedia() {
    return { matches: true, addListener, removeListener }
  }
  let matches
  function Comp() {
    matches = useMedia({
      query: '(min-width: 600px)',
      matchMedia: fakeMatchMedia,
    })
    return null
  }
  let { unmount } = render(<Comp />)

  expect(addListener).toHaveBeenCalled()
  unmount()
  expect(removeListener).toHaveBeenCalled()
})
