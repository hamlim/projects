/**
 * Transform Asset
 *
 * This file will take in a config and then some metadata
 * about an asset and will transform it into code
 */

import { JS, MDX, CSS, shouldTransformExternals } from './get-asset-type.js'

import { plugin as JSPlugin } from '@matthamlin/native-bundler-plugin-js'
import { plugin as MDXPlugin } from '@matthamlin/native-bundler-plugin-mdx'
import { plugin as CSSPlugin } from '@matthamlin/native-bundler-plugin-css'

export function getAssetTransformer(config = {}) {
  return async function transformAsset({
    source,
    filename,
    ast,
    isExternal,
    assetType,
  }) {
    if (isExternal && !shouldTransformExternals(filename, assetType.type)) {
      return Promise.resolve({ code: source })
    }
    switch (assetType.type) {
      case JS: {
        return JSPlugin({
          source,
          config: {
            ...config,
            babelConfig: { ...(config.babelConfig || {}), filename },
          },
        })
      }
      case MDX: {
        return MDXPlugin({
          source,
          config: {
            ...config,
            babelConfig: { ...(config.babelConfig || {}), filename },
          },
        })
      }
      case CSS: {
        return CSSPlugin({
          source,
          config: { ...config, filename },
        })
      }
      default: {
        return Promise.resolve({ code: '' })
      }
    }
  }
}
