import makeRedocer from '../index.js'

test('makeRedocer throws if not provided a reducer', () => {
  expect(() => makeRedocer(null)).toThrowErrorMatchingInlineSnapshot(
    `"Invalid reducer passed to \`makeRedocer\`, you provided: object."`,
  )
})

test('makeRedocer returns a reducer function', () => {
  let reducer = makeRedocer(s => s)

  expect(typeof reducer).toBe('function')
})

test('unkown actions pass through', () => {
  let reducer = jest.fn(s => s)
  let redoable = makeRedocer(reducer)
  redoable(null, 'foo')

  expect(reducer).toHaveBeenCalledWith(null, 'foo')
})

test('undo with no past actions does nothing', () => {
  let reducer = jest.fn(s => s)
  let redoable = makeRedocer(reducer, null)

  let state = redoable(null, 'undo')

  expect(state).toBe(null)
})

test('redo with no past actions does nothing', () => {
  let reducer = jest.fn(s => s)
  let redoable = makeRedocer(reducer, null)

  let state = redoable(null, 'redo')

  expect(state).toBe(null)
})

test('undo undoes the last action', () => {
  let reducer = jest.fn((state, action) => state + action)
  let redoable = makeRedocer(reducer, 0)

  let newState = redoable(0, 5)
  expect(newState).toBe(5)
  let state = redoable(newState, 'undo')
  expect(state).toBe(0)
})

test('redo undoes the future action', () => {
  let reducer = jest.fn((state, action) => state + action)
  let redoable = makeRedocer(reducer, 0)

  let state = redoable(0, 5)
  expect(state).toBe(5)
  state = redoable(state, 'undo')
  expect(state).toBe(0)
  state = redoable(state, 'redo')
  expect(state).toBe(5)
})
