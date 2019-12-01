# `@matthamlin/redocer`

_Pronounced: reducer_

A custom reducer enhancer that returns a reducer that handles undo and redo
actions.

### API

```jsx
import makeRedocer from '@matthamlin/redocer'

function reducer(state, action) { ... };

let redoable = makeRedocer(reducer, initialState);

// Regular actions pass through to the original reducer
redoable(state, 'some-action')
// if you have already called the reducer with a custom action
// then you can call it with a `redo` action, returning the previous state
redoable(state, 'redo')
// Once you have redone a change, you can call the reducer with `undo`
redoable(state, 'undo')
```
