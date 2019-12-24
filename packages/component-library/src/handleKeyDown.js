export function handleKeyDown(cb) {
  return function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.key === ' ') {
        event.preventDefault()
      }
      cb(event)
    }
  }
}
