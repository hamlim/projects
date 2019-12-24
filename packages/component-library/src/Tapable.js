import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { css } from 'styled-components'
import { Box } from './Box.js'
import useSharedRef from './useSharedRef'
import { handleKeyDown } from './handleKeyDown'

function _Tapable({ onTap, disabled, innerRef, role = 'button', ...props }) {
  let ref = useSharedRef(innerRef)
  let tapableProps = useTapable({ onTap, disabled, ref, role })
  return <Box {...tapableProps} {...props} />
}

export let Tapable = forwardRef((props, ref) => (
  <_Tapable {...props} innerRef={ref} />
))

export function useTapable({ onTap, disabled = false, ref, role }) {
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
    role: disabled ? null : role,
    tabIndex: disabled ? null : '0',
    'aria-disabled': disabled || null,
    ref,
  }
}
