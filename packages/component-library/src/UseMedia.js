import { useState, useEffect } from 'react'

export function useMedia({
  query,
  defaultMatches = false,
  matchMedia = window.matchMedia,
}) {
  let [matches, setMatches] = useState(defaultMatches)

  useEffect(() => {
    let mql = matchMedia(query)
    setMatches(mql.matches)
    function listener({ matches }) {
      setMatches(matches)
    }
    mql.addListener(listener)
    return () => mql.removeListener(listener)
  }, [query])
  return matches
}
