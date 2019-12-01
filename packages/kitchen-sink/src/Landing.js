import React from 'react'
import { useRoute } from '@matthamlin/reroute-browser'
import { Box } from '@matthamlin/component-library'

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
