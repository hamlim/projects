import * as React from 'react'

const { useState, useEffect } = React

export function useCache(
  // A map of key => record (storing the miss response)
  cache,
  // A static key to lookup the resource
  key,
  // A function that returns a promise to resolve the data
  miss,
  // If the cache should be evicted when set
  { shouldEvictCache = () => true } = {},
) {
  // Cache the current value locally, with use state.
  let [value, setValue] = useState(null)
  let [prevKey, setPrevKey] = useState(null)

  if (key !== prevKey) {
    // When the key changes, we need to update the locally cached value. Read
    // the corresponding value from the cache using Suspense.
    value = readCache(cache, key, miss)
    setValue(value)
    setPrevKey(key)
  }

  // Once this value successfully commits, immediately evict it from the cache.
  useEffect(() => {
    if (shouldEvictCache({ cache, key })) {
      evictCache(cache, key)
    }
  }, [cache, key, shouldEvictCache])

  function updateCache(key, value) {
    cache.set(key, value)
    setValue(value)
  }

  return [value, updateCache]
}

// This rest is a basic Suspense cache implementation.
const PENDING = 0
const RESOLVED = 1
const REJECTED = 2

function readCache(cache, key, miss) {
  if (cache.has(key)) {
    const record = cache.get(key)
    switch (record.status) {
      case PENDING:
        const promise = record.value
        throw promise
      case RESOLVED:
        const value = record.value
        return value
      case REJECTED:
        const error = record.value
        throw error
    }
  } else {
    const promise = miss()
    const record = {
      status: PENDING,
      value: promise,
    }
    promise.then(
      value => {
        if (record.status === PENDING) {
          record.status = RESOLVED
          record.value = value
        }
      },
      error => {
        if (record.status === PENDING) {
          record.status = REJECTED
          record.value = error
        }
      },
    )
    cache.set(key, record)
    switch (record.status) {
      case PENDING:
        throw promise
      case RESOLVED:
        const value = record.value
        return value
      case REJECTED:
        const error = record.error
        throw error
    }
  }
}

function evictCache(cache, key) {
  cache.delete(key)
}
