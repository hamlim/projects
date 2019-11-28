/**
 * Entry point for the CSS transformer plugin for
 * the native bundler application.
 *
 * The intent is to take in a raw string of CSS code and
 * parse it, and return a transformed string of js code.
 */

import { transformAsync } from '@babel/core'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'

export const plugin = async ({ source, config: userConfig }) => {
  // default babel config
  let babelConfig = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [],
  }
  // if the user provided a `babelConfig` object in their native-bundler
  // config then we want to extract those
  if (typeof userConfig.babelConfig !== 'undefined') {
    // we pull off plugins and presets
    // and initialize them to the default config above
    let {
      presets = babelConfig.presets,
      plugins = babelConfig.plugins,
    } = userConfig.babelConfig

    // re-assign the config the new values
    babelConfig.presets = presets
    babelConfig.plugins = plugins
  }
  let autoprefixerConfig = userConfig.autoprefixer || {}
  const prefixer = autoprefixer(autoprefixerConfig)

  const processor = postcss([prefixer])

  const result = await processor.process(source, { from: undefined })
  // return a promise with code, map
  return transformAsync(`export default \`${result.css}\``, babelConfig)
}
