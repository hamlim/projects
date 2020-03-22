# `@matthamlin/use-error`

A hook to trigger error boundaries higher up in the React tree.

## API

```jsx
import { useError } from '@matthamlin/use-error'

function ComponentThatThrows() {
  let trigger = useError()

  useEffect(() => {
    if (thing) {
      // Calling trigger will force the parent error boundary
      trigger(`Passed 'thing' to ComponentThatThrows`)
    }
  })

  return <SomeComponent />
}
```

`useError` can be called with a single argument that is either:

- A string, this string will be passed to the `Error` constructor directly or
- Any other type which will be thrown
