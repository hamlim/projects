import React from 'react'
import { createControls, controlTypes, reducer } from '../index'
import { render } from '@testing-library/react'

test('throws if not provided a valid component with a propertyControls static', () => {
  function Comp() {
    return null
  }

  expect(() =>
    createControls({ inputs: {} }),
  ).toThrowErrorMatchingInlineSnapshot(`"No \`propertyControls\` provided."`)
})

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
    type: controlTypes.string,
    label: 'The background color of the avatar',
    default: null,
  },
  size: {
    type: controlTypes.enum,
    values: [20, 40, 80],
    label: 'The size of the Avatar',
    default: 20,
  },
  initials: {
    type: controlTypes.string,
    label: 'The Avatar initials',
  },
}

function StringInput({ label, value, dispatch, name }) {
  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        onChange={({ target: { value } }) => dispatch({ name, value })}
      />
    </label>
  )
}

function NumberInput({ label, value, dispatch, name }) {
  return (
    <label>
      {label}
      <input
        type="number"
        value={value}
        onChange={({ target: { value } }) => dispatch({ name, value })}
      />
    </label>
  )
}

function RangeInput({ label, min, max, step, value, dispatch, name }) {
  return (
    <label>
      {label}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={({ target: { value } }) => dispatch({ name, value })}
      />
    </label>
  )
}

function BooleanInput({ label, value, dispatch, name }) {
  return (
    <label>
      {label}
      <input
        type="checkbox"
        value={value}
        onChange={({ target: { checked } }) =>
          dispatch({ name, value: checked })
        }
      />
    </label>
  )
}

function EnumInput({ label, value, values, dispatch, name }) {
  return (
    <label>
      {label}
      <select
        onChange={({ target: { value } }) => dispatch({ name, value })}
        value={value}
      >
        {values.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  )
}

test('createControls returns a component and an initialState shape', () => {
  let result = createControls({
    inputs: {
      StringInput,
      NumberInput,
      EnumInput,
      BooleanInput,
      RangeInput,
    },
    propertyControls: Avatar.propertyControls,
  })

  expect(result.PropertyControls).toBeDefined()
  expect(result.initialState).toBeDefined()
})

test('rendering PropertyControls renders the expected inputs', () => {
  let { PropertyControls, initialState } = createControls({
    inputs: {
      StringInput,
      NumberInput,
      EnumInput,
      BooleanInput,
      RangeInput,
    },
    propertyControls: Avatar.propertyControls,
  })

  let { getByLabelText } = render(<PropertyControls state={initialState} />)

  expect(
    getByLabelText('The background color of the avatar'),
  ).toBeInTheDocument()
})
