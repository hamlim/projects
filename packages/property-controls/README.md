# `@matthamlin/property-controls`

A package that implements FramerX like Property Controls for any React component.

## Example

```js
import { createControls, controlTypes, reducer } from '@matthamlin/property-controls'

import * as UI from 'your-local-component-library'

function Avatar({
  initials,
  backgroundImage,
  size
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width: size,
        height: size,
				borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span>{initials}</span>
    </div>
  );
}

Avatar.propertyControls = {
  initials: {
    type: controlTypes.string,
    label: 'The users initials to display over the background image'
  },
  backgroundImage: {
    type: controlTypes.string,
    label: `The background image on the avatar.

Ensure that this image has a high enough contrast for the color of the initials provided.`
    default: null
  },
  size: {
    type: controlTypes.enum,
    values: [ 20, 40, 80 ],
    label: `The dimensions of the avatar component`,
    default: 40
  }
}

const {PropertyControls, initialState} = createControls({
  inputs: UI,
  propertyControls: Avatar.propertyControls,
})

function App() {
  let [state, dispatch] = useReducer(initialState, reducer);
  return (
    <PropertyControls
      state={state}
      dispatch={dispatch}
    />
  )
}

render(<App />)
```

## Package API

The Property Controls package exports the following:

- `controlTypes` - An object of support property controls
- `createControls` - A function that accepts an object of `inputs` and `propertyControls` and returns an object of `PropertyControls` (a React component) and `initialState`
- `reducer` - A reducer function that accepts `state` and an `action` that looks like `{ name, value }`

The `PropertyControls` component accepts the following props:

- `state` - Should match the same shape as the `initialState` object returned from `createControls`
- `dispatch` - A function that will be called with the an object with the shape of `{ name, value }`. Note that for `shape` types, name may be `.` separated.

#### Example Input Components:

All inputs follow this API:

Provided:

- `name`
- `value`
- `dispatch`
- Everything else applied to the `control`

- `dispatch` must be called with `{ name, value }` for all input types

```jsx
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
```
