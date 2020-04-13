module.exports = {
  "initialRawCode": "import { Component as Comp } from 'react'\n\nexport default class Foo extends Comp {\n  static propTypes = {\n    // Some comment here\n    bar: PropTypes.string,\n  }\n\n  static defaultProps = {\n    bar: 'foo',\n  }\n\n  static _propTypes = 'something internal'\n\n  render() {\n    return null\n  }\n}\n",
  "filename": "/Users/matt/development/projects/packages/babel-plugin-metadata/src/__fixtures__/static-prop-types-component-alias-import/code.js",
  "components": [
    {
      "name": "Foo",
      "props": [
        {
          "name": "bar",
          "type": {
            "comments": "Some comment here",
            "raw": "PropTypes.string"
          },
          "default": {
            "raw": "'foo'"
          }
        }
      ]
    }
  ],
  "imports": [
    {
      "specifiers": [
        {
          "type": "named",
          "value": {
            "local": "Comp",
            "imported": "Component"
          }
        }
      ],
      "source": "react"
    }
  ]
}