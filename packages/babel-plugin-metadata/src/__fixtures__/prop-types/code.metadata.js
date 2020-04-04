module.exports = {
  "initialRawCode": "// Usage:\n// <Foo bar=\"blah\" />\nexport default function Foo() {\n  return <div />\n}\n\nlet test\n\nFoo.propTypes = {\n  // some comment here\n  bar: PropTypes.string.isRequired,\n  // another comment here\n  // multi-line this time\n  foo: PropTypes.bool,\n  /**\n   * Block comment here\n   *\n   * With multiple lines\n   */\n  test,\n}\n",
  "filename": "/Users/matt/development/projects/packages/babel-plugin-metadata/src/__fixtures__/prop-types/code.js"
}