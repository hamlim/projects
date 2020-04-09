import propType from './external-types' // Usage:
// <Foo bar="blah" />

export default function Foo() {
  return <div />
}
Foo.propTypes = {
  // some comment here
  bar: PropTypes.string.isRequired,
  // another comment here
  // multi-line this time
  foo: PropTypes.bool,

  /**
   * Block comment here
   *
   * With multiple lines
   */
  test: propType,
}
