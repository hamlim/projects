/**
 * Initial module of the native-bundler package
 *
 * In here we need to do a few things:
 *
 * 1. Define a bundler function that we will export
 * 2. Call out to other transformation functions
 */

import { getDependencyTree } from './get-dependency-tree.js'
import { resolveExternalAssets } from './externals/resolve-external-assets.js'
import { getAssetTransformer } from './asset/transform-asset.js'
import { writeFile } from './utils/file-system.js'

export async function bundler({
  entry,
  out,
  config: providedConfig = {},
  cache,
} = {}) {
  let config = {
    cacheExternals: true,
    babel: { presets: undefined, plugins: undefined },
    ...providedConfig,
  }
  const { tree } = await getDependencyTree({
    inputPath: entry,
    resolveExternalAsset: resolveExternalAssets({ config, cache, out }),
    config,
    transformAsset: getAssetTransformer(config),
  })

  let modules = ''

  tree.forEach(mod => {
    modules += `${mod.id}: [
function(require, module, exports) {
  ${mod.code}
},
${JSON.stringify(mod.mapping)}
],`
  })

  const result = `(function(modules){
function require(id) {
  const mod = modules[id];
  if (typeof mod === 'undefined') {
    throw new Error('Attempted to import module that does not exist. Ensure peer dependencies are correctly imported.');
  }
  const [fn, mapping] = mod;
  function localRequire(name) {
    return require(mapping[name])
  }
  const module = { exports: {} }
  fn(localRequire, module, module.exports);

  return module.exports;
}
require(${tree[0].id});
})({${modules}})
  `

  // write bundle
  await writeFile(`${out}/bundle.js`, result)
}
