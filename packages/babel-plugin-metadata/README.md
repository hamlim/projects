# `@matthamlin/babel-plugin-metadata`

> 🚨 This project is a Work in Progress and may not work yet

A babel plugin for extracting metadata from parsed files.

## API

### Options:

- `skipWriteFile` - Don't generate the `.metadata.js` file next to each file

## Usage:

```js
// in babelrc.js, babel.config.js, .babelrc, etc
module.exports = {
  plugins: [
    [
      '@matthamlin/babel-plugin-metadata',
      {
        // options here
      },
    ],
  ],
}
```
