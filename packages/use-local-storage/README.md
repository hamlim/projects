# `@matthamlin/use-local-storage`

A small hook wrapping the local storage API

![Coverage: 100%](https://img.shields.io/badge/coverage-100%25-brightgreen?logo=jest)

## API

The default export of the library is a `useLocalStorage` hook that you call with
another state-style hook. The requirement being that the value you provide
`useLocalStorage` should be an array with at least two values, the first being
the stateful value to store in local storage, and the second being an updater
function (e.g. dispatch, setState, etc.).

The second argument for the hook is an options object that supports the
following:

- `key` - A string that is used as the key for where the value will be stored in
  local storage
- `hydrate` - An optional boolean that if try will call setValue on the hook
  mounting with the value from localStorage
- `getItem` - An optional override to the default
  `JSON.parse(window.localStorage.getItem(key))`
- `setItem` - An optional override to the default
  `window.localStorage.setItem(key, JSON.stringify(value))`

```jsx
import useLocalStorage from '@matthamlin/use-local-storage'

function Component() {
  let [value, setValue] = useLocalStorage(useState('foo'), { key: 'your-app' })

  return (
    <label>
      Enter your name:
      <input
        type="text"
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </label>
  )
}
```
