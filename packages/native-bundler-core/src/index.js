/**
 * Initial module of the native-bundler package
 *
 * This file only imports our main module from main.js,
 * and immediately calls it.
 */

export { bundler as default } from './bundler.js'

// @TODO get args
// Example: @matthamlin/native-bundler --entry=path/to/entry/module.js --out=path/to/dir/or/dir/name
// then call `main({ entry: 'path/to/entry/module.js', out: 'path/to/dir/or/dir/name' })`
