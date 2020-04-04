import path from 'path'
import fs from 'fs'

import createPropTypesVisitor from './prop-types/visitor.js'

export default function babelPluginMetadata({ types: t }) {
  let data = {}
  return {
    name: 'babel-plugin-metadata',
    inherits: require('babel-plugin-syntax-jsx'),
    pre(state) {
      data = {
        ...data,
        initialRawCode: state.code,
        filename: state.opts.filename,
      }
    },
    visitor: {
      // PropType visitor
      ...createPropTypesVisitor({ data, types: t }),
    },
    post(state) {
      if (state.opts.skipWriteFile) {
        return
      }
      let dir = path.dirname(state.opts.filename)
      let filename = path.basename(state.opts.filename).split('.')[0]
      fs.writeFileSync(
        path.join(dir, `${filename}.metadata.js`),
        `module.exports = ${JSON.stringify(data, null, 2)}`,
      )
    },
  }
}
