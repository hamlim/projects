/**
 * Save external assets
 *
 * This file exports a function that takes in
 * a path to an asset, something like https://unpkg.com/react@16.5.1/umd/react.production.min.js
 * downloads that asset into the `_vendor_` directory
 * then returns the created time for the asset and the local path to the asset
 */

import { writeFile, makeDirectory, stat, exists } from '../utils/file-system.js'
import fetch from 'node-fetch'
import path from 'path'

const getAssetName = assetPath => {
  const splitOnSlash = assetPath.split('/')
  const { [splitOnSlash.length - 1]: last } = splitOnSlash
  return last.split('?')[0]
}

function defaultTransformAsset(body) {
  return body
}

export async function saveExternalAsset({
  assetPath,
  outputDirectory,
  transformAsset = defaultTransformAsset,
}) {
  if (!assetPath.startsWith('https://') && !assetPath.startsWith('http://')) {
    // if the asset doesn't begin with `http(s)` then resolve with an Error
    // We don't throw here to avoid try catch blocks in parent contexts
    return Promise.resolve({
      error: new Error(
        `Asset Path does not begin with https or http. Asset Path: ${assetPath}.`,
      ),
    })
  } else {
    // the path is validated, we can attempt to fetch it
    const name = getAssetName(assetPath)
    try {
      const response = await fetch(assetPath)
      const body = await response.text()
      const fileContents = await transformAsset(body)
      const vendorDirectory = `${outputDirectory}/_vendor_`
      const directoryExists = await exists(vendorDirectory)
      if (!directoryExists) {
        await makeDirectory(vendorDirectory)
      }
      const filepath = `${vendorDirectory}/${name}`
      await writeFile(filepath, fileContents)
      const absolutePath = path.resolve(process.cwd(), filepath)
      const { birthtime } = await stat(absolutePath)
      return Promise.resolve({
        birthtime,
        name,
        filepath,
      })
    } catch (error) {
      return Promise.resolve({
        error,
      })
    }
  }
}
