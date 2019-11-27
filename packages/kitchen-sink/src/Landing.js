import React from 'react'
import { useRoute } from '@hamlim/reroute-browser'
import { Box } from '@hamlim/component-library'

export default function Landing() {
  let { match } = useRoute('/')

  if (!match) {
    return
  }

  return (
    <Box>
      <H1>Kitchen Sink Application</H1>
    </Box>
  )
}
