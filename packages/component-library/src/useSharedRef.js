import { useRef } from 'react'

export default function useSharedRef(...refs) {
  let localRef = useRef()

  return {
    set current(el) {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(el)
        } else if (typeof ref === 'object' && ref != null) {
          ref.current = el
        }
      })
      localRef.current = el
    },
    get current() {
      return localRef.current
    },
  }
}
