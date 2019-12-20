/**
 * Asset Types
 *
 * This file handles the logic around categorizing asset
 * types.
 *
 * Assets are categorized by their query param
 * If they don't have a query param then we
 * default to treating them as JS assets.
 */

export const JS = 'js'
export const SVG = 'svg'
export const HTML = 'html'
export const CSS = 'css'
export const TXT = 'txt'
export const MDX = 'mdx'

export function getAssetType(assetPath) {
  let queryParam = assetPath.split('?nb=')[1]

  if (typeof queryParam === 'undefined') {
    queryParam = assetPath
      .split('')
      .reverse()
      .join('')
      .split('.')[0]
      .split('')
      .reverse()
      .join('')
  }
  switch (queryParam) {
    case JS: {
      return {
        type: JS,
        extension: '.js',
      }
    }
    case HTML: {
      return {
        type: HTML,
        extension: '.html',
      }
    }
    case SVG: {
      return {
        type: SVG,
        extension: '.svg',
      }
    }
    case TXT: {
      return {
        type: TXT,
        extension: '.txt',
      }
    }
    case CSS: {
      return {
        type: CSS,
        extension: '.css',
      }
    }
    case MDX: {
      return {
        type: MDX,
        extension: '.mdx',
      }
    }
    default: {
      return {
        type: JS,
        extension: '.js',
      }
    }
  }
}

export function shouldTransformExternals(filename, type) {
  switch (type) {
    case JS:
      return filename.includes('esm=true')
    default:
      return false
  }
}
