import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = {
    err: null,
  }

  static getDerivedStateFromError(err) {
    return { err }
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
