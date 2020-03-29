import React from 'react'
import { Tapable } from './Tapable.js'
import { useTheme } from './ThemeProvider.js'
import styled from 'styled-components'

let BaseButton = styled(Tapable)(
  ({ theme, unstable_Focused }) => `
    cursor: pointer;
    user-select: none;
    &:disabled {
      cursor: not-allowed;
    }
    &:hover:not(:disabled), &:focus:not(:disabled) {
      background-color: ${theme.colors.primaryDark};
    }
    &:focus {
      outline: dashed 1px ${theme.colors.secondary};
    }
    outline: ${unstable_Focused ? theme.outline : null};
    background-color: ${unstable_Focused ? theme.colors.primaryDark : null};
`,
)

export function Button({
  unstable_Focused = false,
  isFullWidth = false,
  onClick,
  disabled,
  ...props
}) {
  return (
    <BaseButton
      onTap={onClick}
      disabled={disabled}
      display={isFullWidth ? 'flex' : 'inline-flex'}
      justifyContent="center"
      alignItems="center"
      fontSize={1}
      py={4}
      px={8}
      borderRadius={0}
      width={isFullWidth ? '100%' : null}
      color={!disabled ? 'white' : 'black'}
      bg={!disabled ? 'primary' : 'gray.5'}
      height={50}
      border="none"
      unstable_Focused={unstable_Focused}
      {...props}
    />
  )
}
