# `@matthamlin/property-controls`

A package that implements FramerX like Property Controls for any React component.

## Example

```js
import { getInitialState, types, reducer } from '@matthamlin/property-controls'

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
    type: types.string,
    label: 'The users initials to display over the background image'
  },
  backgroundImage: {
    type: types.string,
    label: `The background image on the avatar.

Ensure that this image has a high enough contrast for the color of the initials provided.`
    default: null
  },
  size: {
    type: types.enum,
    values: [ 20, 40, 80 ],
    label: `The dimensions of the avatar component`,
    default: 40
  }
}

const initialState = getInitialState(Avatar.propertyControls);

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

- `types` - An object of support property controls
- `getInitialState` - A function that takes in the property controls and returns an object with the initial state
- `reducer` - A reducer function that accepts `state` and an `action` that looks like `{ name, value }`
- `updateState` - A function that takes in the current state, namePath, value and index and returns the new state with the name and value

#### Suggested Rendering patterns:

Rendering property control inputs is left up to the implementer to customize the rendering inputs and rendering context.

Here is a snippet of an example rendering pattern:

```jsx
function PropertyControls({
  // A `useReducer` dispatch function
  dispatch,
  // The current state of the property controls
  state,
  // Property Controls passed to the component
  propertyControls = componentPropertyControls,
  // A name property
  name = null,
  // A value property
  value = null,
}) {
  // Use this as a flag to determine if we have recursed within the PropertyControls component
  let isNested = name !== null
  let propertyControlEntries = Object.entries(propertyControls)
  return propertyControlEntries.map(([propName, control]) => {
    switch (control.type) {
      case types.string: {
        if (isNested) {
          return (
            <StringInput
              key={propName}
              {...control}
              name={`${name}.${propName}`}
              value={value[propName]}
              dispatch={dispatch}
            />
          )
        }
        return (
          <StringInput
            key={propName}
            {...control}
            name={propName}
            value={state[name]}
            dispatch={dispatch}
          />
        )
      }
      case types.number: {
        if (isNested) {
          return (
            <NumberInput
              key={propName}
              {...control}
              name={`${name}.${propName}`}
              value={value[propName]}
              dispatch={dispatch}
            />
          )
        }
        return (
          <NumberInput
            key={propName}
            {...control}
            name={propName}
            value={state[name]}
            dispatch={dispatch}
          />
        )
      }
      case types.boolean: {
        if (isNested) {
          return (
            <BooleanInput
              key={propName}
              {...control}
              name={`${name}.${propName}`}
              value={value[name]}
              dispatch={dispatch}
            />
          )
        }
        return (
          <BooleanInput
            key={propName}
            {...control}
            name={propName}
            value={state[name]}
            dispatch={dispatch}
          />
        )
      }
      case types.range: {
        if (isNested) {
          return (
            <RangeInput
              key={propName}
              {...control}
              name={`${name}.${propName}`}
              value={value[name]}
              dispatch={dispatch}
            />
          )
        }
        return (
          <RangeInput
            key={propName}
            {...control}
            name={propName}
            value={state[propName]}
            dispatch={dispatch}
          />
        )
      }
      case types.enum: {
        if (isNested) {
          return (
            <EnumInput
              key={propName}
              {...control}
              name={`${name}.${propName}`}
              value={value[name]}
              dispatch={dispatch}
            />
          )
        }
        return (
          <EnumInput
            key={propName}
            {...control}
            value={state[propName]}
            name={propName}
            dispatch={dispatch}
          />
        )
      }
      case types.shape: {
        if (isNested) {
          return (
            <PropertyControls
              key={propName}
              {...control}
              name={`${name}.${propName}`}
              propertyControls={control.types}
              value={value[name]}
              dispatch={dispatch}
            />
          )
        }
        return (
          <PropertyControls
            key={propName}
            {...control}
            propertyControls={control.types}
            name={propName}
            value={state[propName]}
            dispatch={dispatch}
          />
        )
      }
    }
  })
}
```

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
