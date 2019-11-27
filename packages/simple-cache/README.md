# `@hamlim/simple-cache`

A simple react-cache implementation using hooks.

### API

```js
import { useCache } from '@hamlim/simple-cache'

const cache = new Map()

function useFetch(endpoint) {
  return useCache(cache, endpoint, () => fetch(endpoint).then(data => data.json()))
}
```
