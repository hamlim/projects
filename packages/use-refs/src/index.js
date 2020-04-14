import { useRef } from 'react'

export function useRefs() {
  const refs = useRef(new Map())

  function register(key) {
    if (!key) {
      throw new Error("`useRefs`' `register` method called without a key.")
    }
    return function(ref) {
      refs.current.set(key, ref)
    }
  }

  function getRef(key) {
    if (!refs.current.has(key)) {
      return null
    }
    return refs.current.get(key)
  }

  return [register, getRef, refs.current]
}

export function mergeRefs(...refs) {
  return function(reference) {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(reference)
      } else if (
        typeof ref === 'object' &&
        ref != null &&
        !Array.isArray(ref)
      ) {
        ref.current = reference
      }
    })
  }
}

export function useSharedRef(...refs) {
  let localRef = useRef()

  return {
    set current(el) {
      mergeRefs(...refs, localRef)(el)
    },
    get current() {
      return localRef.current
    },
  }
}
