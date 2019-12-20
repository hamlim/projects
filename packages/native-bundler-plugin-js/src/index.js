/**
 * Entry point for the JS transformer plugin for
 * the native bundler application.
 *
 * The intent is to take in a raw string of code and
 * parse it, and return a transformed string of code.
 */

import { transformAsync } from '@babel/core'

export const plugin = async ({ source, config: userConfig }) => {
  // default babel config
  let config = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['macros'],
  }
  // if the user provided a `babelConfig` object in their native-bundler
  // config then we want to extract those
  if (typeof userConfig.babelConfig !== 'undefined') {
    // we pull off plugins and presets
    // and initialize them to the default config above
    let {
      presets = config.presets,
      plugins = config.plugins,
      ...rest
    } = userConfig.babelConfig

    // re-assign the config the new values
    config.presets = presets
    config.plugins = plugins
    config = {
      ...config,
      ...rest,
    }
  }

  // return a promise with code, map, and an ast
  // note that the @native-bundler/core module
  // will only care about the code and the map
  // values
  return transformAsync(source, config)
}
