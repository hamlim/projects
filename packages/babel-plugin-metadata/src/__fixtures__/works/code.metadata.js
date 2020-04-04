module.exports = {
  "initialRawCode": "// Usage:\n// <Foo bar=\"blah\" />\nexport default function Foo() {\n  return <div />\n}\n\nFoo.propTypes = {\n  // some comment here\n  bar: PropTypes.string.isRequired,\n}\n",
  "filename": "/Users/matt/development/projects/packages/babel-plugin-metadata/src/__fixtures__/works/code.js",
  "components": [
    {
      "name": "Foo",
      "props": [
        {
          "name": "bar",
          "comments": "some comment here"
        }
      ]
    }
  ]
}