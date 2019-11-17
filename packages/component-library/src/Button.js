/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Tapable } from './Tapable.js'

export function Button({
  unstable_Focused = false,
  isFullWidth = false,
  onClick,
  disabled,
  ...props
}) {
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
      css={theme =>
        css({
          color: theme.colors.white,
          backgroundColor: theme.colors.primary,
          height: 50,
          border: 'none',
          ':disabled': {
            backgroundColor: theme.colors.gray[5],
            color: theme.colors.black,
          },
          ':hover:not(:disabled), :focus:not(:disabled)': {
            backgroundColor: theme.colors.primaryDark,
          },
          ':focus': {
            outline: `dashed 1px ${theme.colors.secondary}`,
          },
          ...(unstable_Focused
            ? {
                outline: `dashed 1px ${theme.colors.secondary}`,
                backgroundColor: theme.colors.primaryDark,
              }
            : {}),
        })
      }
      {...props}
    />
  )
}
