import React, { Component } from 'react'
import { useHistory } from '@matthamlin/reroute-core'

class _ErrorBoundary extends Component {
  state = {
    err: null,
  }

  static getDerivedStateFromError(err) {
    return { err }
  }

  componentDidCatch(err) {
    ;(this.props.onError || (() => {}))(err)
  }

  render() {
    let { FallbackComponent, children } = this.props
    let { err } = this.state
    if (err) {
      return <FallbackComponent error={err} />
    }
    return children
  }
}

export default function ErrorBoundary(props) {
  let {
    location: { pathname },
  } = useHistory()

  return <_ErrorBoundary {...props} key={pathname} />
}
