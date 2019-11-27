import React from 'react'

export let controlTypes = {
  string: 'string',
  number: 'number',
  range: 'range',
  enum: 'enum',
  boolean: 'bool',
  shape: 'shape',
}

/*

import {controlTypes as types} from 'pkg'

Foo.propertyControls = {
  string: {
    type: types.string,
    label: 'Some text content here',
    default: 'Some default value here',
    required: true
  },
  number: {
    type: types.number,
    label: 'some content here',
    default: 0,
    required: false
  },
  range: {
    type: types.range,
    label: 'content',
    default: 5,
    min: 0,
    max: 10,
    required: true
  },
  enum: {
    type: types.enum,
    label: 'content',
    default: 'foo',
    values: ['foo', 'bar', 'baz']
  },
  shape: {
    type: types.shape,
    label: 'content',
    // If all types have undefined defaults then the default for this type is undefined too
    // Otherwise the default is an object of key to default mapping
    types: {
      string: {
        type: types.string,
        label: 'blah',
        default: null,
      },
      number: {
        type: types.number,
        label: 'label',
        default: null
      }
    }
  }
}

Common properties:

* type
* label
* default
* required


*/

export function updateState({ state, namePath, value, index = 0 }) {
  return Object.entries(state).reduce(
    (newState, [name, val]) => {
      if (
        namePath[index] === name &&
        // Should we recurse or not
        index !== namePath.length - 1
      ) {
        return {
          ...newState,
          [name]: updateState({
            state: state[name],
            namePath,
            index: index + 1,
            value,
          }),
        }
      } else if (namePath[index] === name && index === namePath.length - 1) {
        return {
          ...newState,
          [name]: value,
        }
      }
      return {
        ...newState,
        [name]: val,
      }
    },
    { ...state },
  )
}

export function reducer(state, { name, value }) {
  // Nested names, e.g. shape types "join" the prop names together using a period
  // If we don't have a period in the name, we assume this value is at the top level of the state
  if (!name.includes('.')) {
    return {
      ...state,
      [name]: value,
    }
  } else {
    let namePath = name.split('.')
    return updateState({ state, namePath, value })
  }
}

export function createControls({
  inputs,
  propertyControls: componentPropertyControls,
} = {}) {
  if (!propertyControls) {
    throw new Error(`No \`propertyControls\` found provided.`)
  }

  let { StringInput, NumberInput, BooleanInput, EnumInput, RangeInput } = inputs

  let propertyControlEntries = Object.entries(componentPropertyControls)
  let initialState = propertyControlEntries.reduce(
    (acc,
    ([name, control]) => {
      acc[name] = control.default || null
      return acc
    }),
    {},
  )

  function PropertyControls({
    dispatch,
    state,
    propertyControls = componentPropertyControls,
    name = null,
    value = null,
  }) {
    // Use this as a flag to determine if we have recursed within the PropertyControls component
    let isNested = name !== null
    let propertyControlEntries = Object.entries(propertyControls)
    return propertyControlEntries.map(([propName, control]) => {
      switch (control.type) {
        case controlTypes.string: {
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
        case controlTypes.number: {
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
        case controlTypes.boolean: {
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
        case controlTypes.range: {
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
        case controlTypes.enum: {
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
        case controlTypes.shape: {
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

  return {
    PropertyControls,
    initialState,
  }
}
