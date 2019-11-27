import { createControls } from '../index'

// @TODO

test('throws if not provided a valid component with a propertyControls static', () => {
  function Comp() {
    return null
  }

  expect(() =>
    createControls({ inputs: {}, component: Comp }),
  ).toThrowErrorMatchingInlineSnapshot(`"propertyControls is not defined"`)
})
