import React from 'react'
import { Tapable } from './Tapable.js'
import { useTheme } from './ThemeProvider.js'

export function Button({
  unstable_Focused = false,
  isFullWidth = false,
  onClick,
  disabled,
  ...props
}) {
  let theme = useTheme()
  return (
    <Tapable
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
      color={theme.colors.white}
      bg={theme.colors.primary}
      height={50}
      border="none"
      unstable_Focused={unstable_Focused}
      css={({ theme, unstable_Focused }) => `
        &:disabled {
          background-color: ${theme.colors.gray[5]};
          color: ${theme.colors.black};
        }
        &:hover:not(:disabled), &:focus:not(:disabled) {
          background-color: ${theme.colors.primaryDark};
        }
        &:focus {
          outline: dashed 1px ${theme.colors.secondary};
        }
        ${
          unstable_Focused
            ? `
              outline: dashed 1px ${theme.colors.secondary};
              background-color: ${theme.colors.primaryDark};
            `
            : ''
        },
      `}
      {...props}
    />
  )
}
