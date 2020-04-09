module.exports = {
  "initialRawCode": "import propType from './external-types'\n\n// Usage:\n// <Foo bar=\"blah\" />\nexport default function Foo() {\n  return <div />\n}\n\nFoo.propTypes = {\n  // some comment here\n  bar: PropTypes.string.isRequired,\n  // another comment here\n  // multi-line this time\n  foo: PropTypes.bool,\n  /**\n   * Block comment here\n   *\n   * With multiple lines\n   */\n  test: propType,\n}\n",
  "filename": "/Users/matt/development/projects/packages/babel-plugin-metadata/src/__fixtures__/external-prop-types/code.js",
  "components": [
    {
      "name": "Foo",
      "props": [
        {
          "name": "bar",
          "comments": "some comment here",
          "type": {
            "raw": "PropTypes.string.isRequired"
          }
        },
        {
          "name": "foo",
          "comments": "another comment here\nmulti-line this time",
          "type": {
            "raw": "PropTypes.bool"
          }
        },
        {
          "name": "test",
          "comments": "Block comment here\n      With multiple lines",
          "type": {
            "raw": "propType"
          }
        }
      ]
    }
  ],
  "imports": [
    {
      "specifiers": [
        {
          "type": "default",
          "value": {
            "local": "propType",
            "imported": "propType"
          }
        }
      ],
      "source": "./external-types"
    }
  ]
}