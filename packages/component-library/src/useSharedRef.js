import { useRef } from 'react'

export default function useSharedRef(ref) {
  let localRef = useRef()

  return {
    set current(el) {
      if (typeof ref === 'function') {
        ref(el)
      } else if (typeof ref === 'object' && ref != null) {
        ref.current = el
      }
      localRef.current = el
    },
    get current() {
      return localRef.current
    },
  }
}
