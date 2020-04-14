# `@matthamlin/use-refs`

A small package that offers a few shared functions to interact with React `ref`s

![Coverage: 100%](https://img.shields.io/badge/coverage-100%25-brightgreen?logo=jest)

## API

```jsx
import { useRefs, useSharedRef, mergeRefs } from '@matthamlin/use-refs'

// useRefs
function Component() {
  // refs is a Map of key to element
  let [register, get, refs] = useRefs()

  useEffect(() => {
    // logs out the div element
    console.log(get('container'))
    // logs out the p element
    console.log(get('text'))
  })

  return (
    <div ref={register('container')}>
      <p ref={register('text')}>Text</p>
    </div>
  )
}

// useSharedRef
function AnotherComponent({ innerRef }) {
  let localRef = useSharedRef(innerRef)

  useEffect(() => {
    console.log(localRef.current)
  })

  return <div ref={localRef} />
}

// mergeRefs
function getElementProps({ ref, ...props }) {
  return {
    ref: mergeRefs(ref, localRef),
  }
}
```

### `useRefs`

This hook is a helper for working with multiple references within the same
component without needing to hardcode each `useRef` call.

It returns:

- `register` - a function that is called with a `key`, and then returns a
  function to accept the reference you want to store with that key
- `get` - a function for accessing a ref with a specific `key` - falls back to
  returning `null` if no `key` is found in the refs map
- `refs` - a `Map` instance mapping each `key` to the reference

### `useSharedRef`

This hook is a small helper hook for both applying a ref being passed in via
props as well as a local ref. This is useful for when both the parent and the
component need to store and read from a single ref.

It can be called with as many refs as you would like (either functions or ref
object).

It returns:

- `ref` - A `ref` object with a `current` property pointing to the reference

### `mergeRefs`

This is a helper function for applying multiple ref handlers to the same
reference. It is what implements the above `useSharedRef` helper.

It can be called with as many refs as you would like (either functions or ref
objects).

It returns:

- `handleRef` - A function that accepts a `reference` to be passed to each of
  the refs it was called with

## Credit and Thanks

Shoutout to [@Jayphen](https://twitter.com/Jayphen) on Twitter for sharing this
implementation of `useRefs`:
https://twitter.com/Jayphen/status/1245335960277172224
