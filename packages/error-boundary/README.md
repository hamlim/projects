# `@matthamlin/error-boundary`

A generic ErrorBoundry component.

## API

```jsx
import ErrorBoundary from '@matthamlin/error-boundary'

function Fallback({ error }) {
  // render fallback UI
}

render(
  <ErrorBoundary Fallback={Fallback} onError={err => logErr(err)}>
    <App />
  </ErrorBoundary>,
)
```

The default export of the library exposes an `ErrorBoundary` component that
supports the following props:

- `children` - The React tree that may throw an error
- `Fallback` - A React component to render when an error is caught
- `onError` - A callback prop called when an error is caught
