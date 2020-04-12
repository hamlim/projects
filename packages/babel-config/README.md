# `@matthamlin/babel-config`

A shared babel config for packages in the Projects repo.

## API

```js
let babelConfig = require('@matthamlin/babel-config')

module.exports = babelConfig({
  // if the config should compile for node LTS or not, defaults to false
  node: true,
  // if the config should preserve the esmodule output or not, defaults to false
  esmodules: true,
})
```

## Included:

### Plugins:

- `@babel/plugin-transform-runtime`
- `babel-plugin-styled-components`
- `@babel/plugin-proposal-class-properties`
- `@babel/plugin-proposal-export-namespace-from`
- `@babel/plugin-proposal-object-rest-spread`

### Presets:

- `@babel/preset-env`
- `@babel/preset-react`
