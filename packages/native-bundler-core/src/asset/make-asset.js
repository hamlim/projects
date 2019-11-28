import traverse from '@babel/traverse'
import { parse } from 'babylon'
import { isUniversalImport } from '../utils/index.js'
import { readFile } from '../utils/file-system.js'
import { getAssetType, JS } from './get-asset-type.js'

// @TODO
// Right now this is only handling Javascript assets
// This should also handle CSS, TXT, HTML, and SVG assets as well
// this should probably be a point where we can inject plugins
export const assetGenerator = () => {
  let COUNTER = 0
  return async function makeAsset({
    filename,
    isExternal = false,
    transformAsset,
  } = {}) {
    const content = await readFile(filename, 'utf-8')
    const assetType = getAssetType(filename)

    let ast = null
    let dependencies = []

    if (assetType.type === JS && !isExternal) {
      try {
        ast = parse(content, {
          sourceType: 'module',
          plugins: ['jsx'],
        })
      } catch (e) {
        console.log('Babylon parse error')
        console.log(e.message)
      }
      traverse(ast, {
        ImportDeclaration({ node }) {
          if (!isUniversalImport(node.source.value)) {
            dependencies.push(node.source.value)
          }
        },
      })
    }

    const id = COUNTER++

    let code
    try {
      ;({ code } = await transformAsset({
        source: content,
        filename,
        ast,
        isExternal,
        assetType,
      }))
    } catch (e) {
      console.log('Failed to transform Asset: ' + filename)
      console.log(e)
      // console.error(e.message)
      return Promise.resolve({
        id: -1,
        filename: '',
        dependencies: [],
        isExternal: false,
        code: '',
      })
    }

    return {
      id,
      filename,
      dependencies,
      isExternal,
      code,
    }
  }
}
