import React from 'react'

let { useState } = React

export function useError() {
  let [, setError] = useState(null)
  return errorInstanceOrString =>
    setError(() => {
      if (typeof errorInstanceOrString === 'string') {
        throw new Error(errorInstanceOrString)
      } else {
        throw errorInstanceOrString
      }
    })
}
