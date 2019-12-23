export let types = {
  string: 'string',
  number: 'number',
  range: 'range',
  enum: 'enum',
  boolean: 'bool',
  shape: 'shape',
}

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

export function getInitialState(propertyControls) {
  return Object.entries(propertyControls).reduce((acc, [name, control]) => {
    acc[name] = control.default || null
    return acc
  }, {})
}
