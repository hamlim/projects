/**
 * General Utility functions
 */

export const isExternalImport = importPath => importPath.startsWith('http')

export const isUniversalImport = importPath =>
  !importPath.startsWith('.') && !importPath.startsWith('http')
