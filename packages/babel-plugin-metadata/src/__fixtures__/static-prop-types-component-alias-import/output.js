import { Component as Comp } from 'react'
export default class Foo extends Comp {
  static propTypes = {
    // Some comment here
    bar: PropTypes.string,
  }
  static _propTypes = 'something internal'

  render() {
    return null
  }
}
