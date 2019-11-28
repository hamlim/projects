import { createControls } from '../index'

test('throws if not provided a valid component with a propertyControls static', () => {
  function Comp() {
    return null
  }

  expect(() =>
    createControls({ inputs: {} }),
  ).toThrowErrorMatchingInlineSnapshot(`"No \`propertyControls\` provided."`)
})
