import React from 'react'
import { types, getInitialState } from '../index'

function Avatar({ backgroundColor, initials, size }) {
  return (
    <div
      style={{
        backgroundColor,
        height: size,
        width: size,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span>{initials}</span>
    </div>
  )
}

Avatar.propertyControls = {
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
  expect(getInitialState(Avatar.propertyControls)).toMatchInlineSnapshot(`
    Object {
      "backgroundColor": null,
      "initials": null,
      "size": 20,
    }
  `)
})
