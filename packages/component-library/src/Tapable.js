/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Box } from './Box.js'

export function Tapable({ onTap, disabled, ...props }) {
  let tapableProps = useTapable({ onTap, disabled })
  return <Box {...tapableProps} {...props} />
}

function handleKeyDown(cb) {
  return function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.key === ' ') {
        event.preventDefault()
      }
      cb(event)
    }
  }
}

export function useTapable({ onTap, disabled = false }) {
  return {
    onClick: disabled ? null : onTap,
    onKeyDown: disabled ? null : handleKeyDown(onTap),
    role: disabled ? null : 'button',
    tabIndex: disabled ? null : '0',
    'aria-disabled': disabled || null,
  }
}
