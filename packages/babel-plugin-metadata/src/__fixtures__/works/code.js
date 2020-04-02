// Usage:
// <Foo bar="blah" />
export default function Foo() {
  return <div />
}

Foo.propTypes = {
  // some comment here
  bar: PropTypes.string.isRequired,
}
