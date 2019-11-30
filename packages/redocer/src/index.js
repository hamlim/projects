export default function makeRedocer(reducer, initialState) {
  if (typeof reducer !== 'function') {
    throw new Error(
      `Invalid reducer passed to \`makeRedocer\`, you provided: ${typeof reducer}.`,
    )
  }

  let past = []
  let future = []
  let present = initialState

  return function redoable(state, action) {
    if (action === 'undo') {
      if (past.length) {
        let [last, ...history] = past
        future = [state, ...future]
        past = history
        return last
      }
      return present
    }
    if (action === 'redo') {
      if (future.length) {
        let [last, ...soonToBe] = future
        past = [present, ...past]
        future = soonToBe
        return last
      }
      return present
    }
    let newPresent = reducer(state, action)
    if (present === newPresent) {
      return state
    }
    past = [state, ...past]
    present = newPresent
    return present
  }
}
