import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor() {
    super()
    this.state = {
      error: null,
    }
  }

  componentDidCatch(error) {
    ;(this.props.onError || (() => {}))(error)
  }

  render() {
    let { Fallback, children } = this.props

    if (this.state.error) {
      return React.createElement(Fallback, { error: this.state.error })
    }
    return children
  }
}

ErrorBoundary.getDerivedStateFromError = function(error) {
  return { error }
}
