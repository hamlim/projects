import React from 'react'
import { types, getInitialState } from '../index'

let propertyControls = {
  backgroundColor: {
    type: types.string,
    label: 'The background color of the avatar',
    default: null,
  },
  size: {
    type: types.enum,
    values: [20, 40, 80],
    label: 'The size of the Avatar',
    default: 20,
  },
  initials: {
    type: types.string,
    label: 'The Avatar initials',
  },
}

test('getInitialState returns the expected state shape', () => {
  expect(getInitialState(propertyControls)).toMatchInlineSnapshot(`
    Object {
      "backgroundColor": null,
      "initials": null,
      "size": 20,
    }
  `)
})
