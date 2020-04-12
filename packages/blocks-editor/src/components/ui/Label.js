/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css, Box } from 'theme-ui'

export default props => (
  <Box
    as="label"
    {...props}
    css={css({
      display: 'flex',
      flexDirection: 'column',
      fontWeight: 'bold',
      fontSize: 0,
      userSelect: 'none'
    })}
  />
)
