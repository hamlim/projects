/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Box } from './Box.js'
import { useState, useRef, useEffect, forwardRef } from 'react'
import useSharedRef from './useSharedRef'

function _Tapable({ onTap, disabled, innerRef, ...props }) {
  let ref = useSharedRef(innerRef)
  let tapableProps = useTapable({ onTap, disabled, ref })
  return <Box {...tapableProps} {...props} />
}

export let Tapable = forwardRef((props, ref) => (
  <_Tapable {...props} innerRef={ref} />
))

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

export function useTapable({ onTap, disabled = false, ref }) {
  let [didClick, setDidClick] = useState(false)

  function handleTap(event) {
    setDidClick(true)
    onTap(event)
  }

  useEffect(() => {
    if (didClick) {
      setDidClick(false)
      if (ref.current && document.activeElement !== ref.current) {
        requestAnimationFrame(() => {
          if (ref.current && typeof ref.current.focus === 'function') {
            ref.current.focus()
          }
        })
      }
    }
  }, [didClick])

  return {
    onClick: disabled ? null : handleTap,
    onKeyDown: disabled ? null : handleKeyDown(handleTap),
    role: disabled ? null : 'button',
    tabIndex: disabled ? null : '0',
    'aria-disabled': disabled || null,
    ref,
  }
}
