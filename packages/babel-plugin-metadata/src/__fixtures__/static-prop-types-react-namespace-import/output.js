import * as react from 'react'
export default class Foo extends react.Component {
  static propTypes = {
    // Some comment here
    bar: PropTypes.string,
  }
  static defaultProps = {
    bar: 'foo',
  }
  static _propTypes = 'something internal'

  render() {
    return null
  }
}
