import React from 'react'
import { useHistory } from '@matthamlin/reroute-core'
import _ErrorBoundary from '@matthamlin/error-boundary'

export default function ErrorBoundary(props) {
  let {
    location: { pathname },
  } = useHistory()

  return <_ErrorBoundary {...props} key={pathname} />
}
