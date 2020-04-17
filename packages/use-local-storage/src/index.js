import * as React from 'react'

let { useEffect, useRef } = React

function defaultGetItem(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (e) {
    return window.localStorage.getItem(key)
  }
}

function defaultSetItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export default function useLocalStorage(
  [value, setValue],
  {
    key,
    hydrate = true,
    getItem = defaultGetItem,
    setItem = defaultSetItem,
  } = {},
) {
  if (typeof setValue !== 'function') {
    throw new TypeError(
      `Invalid type provided for the second value of the first argument. You provided: ${typeof setValue}`,
    )
  }
  if (typeof key !== 'string') {
    throw new TypeError(
      `Invalid type provided for the key. Expected string, you provided: ${typeof key}`,
    )
  }

  let mountedRef = useRef(false)

  useEffect(() => {
    // only hydrate once
    if (hydrate && !mountedRef.current) {
      setValue(getItem(key))
    }
  }, [key, hydrate, getItem])

  useEffect(() => {
    if (mountedRef.current) {
      setItem(key, value)
    } else {
      mountedRef.current = true
    }
  }, [key, value, setItem])

  return [value, setValue]
}
