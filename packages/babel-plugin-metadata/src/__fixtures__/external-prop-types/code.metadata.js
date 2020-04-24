module.exports = {
  "initialRawCode": "import propType from './external-types'\n\n// Usage:\n// <Foo bar=\"blah\" />\nexport default function Foo() {\n  return <div />\n}\n\nFoo.propTypes = {\n  // some comment here\n  bar: PropTypes.string.isRequired,\n  // another comment here\n  // multi-line this time\n  foo: PropTypes.bool,\n  /**\n   * Block comment here\n   *\n   * With multiple lines\n   */\n  test: propType,\n}\n\nFoo.defaultProps = {\n  bar: 'foo',\n  foo: false,\n  test: 'anotherTest',\n}\n",
  "filename": "/Users/matt/development/projects/packages/babel-plugin-metadata/src/__fixtures__/external-prop-types/code.js",
  "components": [
    {
      "name": "Foo",
      "props": [
        {
          "name": "bar",
          "type": {
            "comments": " some comment here",
            "raw": "PropTypes.string.isRequired"
          },
          "default": {
            "raw": "'foo'"
          }
        },
        {
          "name": "foo",
          "type": {
            "comments": " another comment here\n multi-line this time",
            "raw": "PropTypes.bool"
          },
          "default": {
            "raw": "false"
          }
        },
        {
          "name": "test",
          "type": {
            "comments": "/**\n   * Block comment here\n   *\n   * With multiple lines\n   \n*/",
            "raw": "propType"
          },
          "default": {
            "raw": "'anotherTest'"
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
  ],
  "hooks": []
}