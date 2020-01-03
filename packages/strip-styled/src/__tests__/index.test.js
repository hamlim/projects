import { removeStyledProps } from '../index'

test('it removes styled props and lets others pass through', () => {
  expect(
    removeStyledProps({
      display: 'flex',
      color: 'red',
      someProp: true,
      customProp: 42,
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "customProp": 42,
      "someProp": true,
    }
  `)
})
