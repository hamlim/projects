# `@matthamlin/babel-plugin-metadata`

> 🚨 This project is a Work in Progress and may not work yet

A babel plugin for extracting metadata from parsed files.

## Usage:

```js
// in babelrc.js, babel.config.js, .babelrc, etc
module.exports = {
  plugins: [
    [
      '@matthamlin/babel-plugin-metadata',
      {
        // options here
        // see API section for more details
      },
    ],
  ],
}
```

## API

### Options:

- `skipWriteFile` - Don't generate the `.metadata.js` file next to each file
  (defaults to `false`)
- `reactSource` - the source module that should be treated like `React`
  (defaults to `'react'`)
- `reactComponentValue` - the named import to treat as the `React.Component`
  super class (defaults to `'Component'`)
- `formatComments` - A function called with the leadingComments ast node to be
  formatted and returned as a string (defaults to `defaultFormatComments`)
- `propTypesSource` - the source module that should be treated like `prop-types`
  (defaults to `'prop-types'`)

## TODO:

- [ ] Handle `defaultProps`
- [ ] Finish parsing propTypes for both assignments and statics
- [ ] Implement external file tracking for imported values
- [ ] Handle accessing Component from React import later in the file
