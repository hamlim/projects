/**
 * Get Dependency Tree
 *
 * This file is heavily inspired by/copied from [minipack](https://github.com/ronami/minipack/blob/master/src/minipack.js)
 *
 * The aim is to take in an input path (this should be a string that is the path to the entry module)
 * create an array of modules (an object that represents the import path)
 * iterate through that array, whenever we find more imports we push those onto the queue
 */

import fs from 'fs'
import path from 'path'
import { isExternalImport, isUniversalImport } from './utils/index.js'
import { assetGenerator } from './asset/make-asset.js'

export const getDependencyTree = async ({
  inputPath,
  resolveExternalAsset,
  config,
  transformAsset,
}) => {
  const makeAsset = assetGenerator()
  const entryAsset = await makeAsset({
    filename: inputPath,
    isExternal: false,
    transformAsset,
  })

  const externalPaths = []

  const queue = [entryAsset]

  // Crawl through the dependencies and create a mapping of them
  for (const asset of queue) {
    asset.mapping = {}
    const dirname = path.dirname(asset.filename)
    for (const depPath of asset.dependencies) {
      let absolutePath,
        isExternal = false

      if (isUniversalImport(depPath)) {
        // ignore universal imports i.e. import X from 'react';
        break
      } else if (isExternalImport(depPath) && config.cacheExternals) {
        isExternal = true
        absolutePath = await resolveExternalAsset(depPath)
      } else {
        absolutePath = path.join(dirname, depPath)
      }
      const child = await makeAsset({
        filename: absolutePath,
        isExternal,
        transformAsset,
      })
      if (isExternal) {
        asset.code = asset.code.replace(depPath, absolutePath)
        externalPaths.push({
          depPath,
          absolutePath,
          linkedId: asset.id,
          ownId: child.id,
        })
      }
      asset.mapping[depPath] = child.id
      queue.push(child)
    }
  }

  // Go through the external assets and remap the original assets
  // to import from the new path
  for (const externalAsset of externalPaths) {
    const { linkedId, absolutePath, depPath, ownId } = externalAsset
    const linkedAssets = queue.filter(asset => asset.id === linkedId)
    linkedAssets.forEach(asset => {
      if (asset.mapping[depPath]) {
        asset.mapping[absolutePath] = ownId
        delete asset.mapping[depPath]
      }
      const assetDep = asset.dependencies.findIndex(dep => dep === depPath)
      if (assetDep !== -1) {
        asset.dependencies.splice(assetDep, 1, absolutePath)
      }
    })
  }

  return {
    tree: queue,
    externalPaths,
  }
}
