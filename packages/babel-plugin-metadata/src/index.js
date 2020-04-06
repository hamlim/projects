import path from 'path'
import fs from 'fs'

export function defaultFormatComments(comments) {
  return comments
    .map(comment => comment.value.replace(/\*[ \n]/g, '').trim())
    .join('\n')
}

export default function babelPluginMetadata({ types: t }) {
  return {
    name: 'babel-plugin-metadata',
    inherits: require('babel-plugin-syntax-jsx'),
    pre(state) {
      this.data = {
        initialRawCode: state.code,
        filename: state.opts.filename,
        components: [],
      }
    },
    visitor: {
      // PropType visitor
      AssignmentExpression(path, state) {
        let {
          opts: { formatComments = defaultFormatComments },
        } = state
        let { data } = this
        if (
          // Foo.propTypes
          t.isMemberExpression(path.node.left) &&
          path.node.left.property.name === 'propTypes'
        ) {
          // Foo
          let componentName = path.node.left.object.name
          // Setup the data we will return
          let component = {
            name: componentName,
          }
          let propData = []
          // Iterate through the prop-types
          // @TODO assumes an object expression definition
          let props = path.node.right.properties
          props.forEach(prop => {
            // If there are leading comments we want to process the prop
            // @TODO we probably want to process every prop and then strip at runtime
            if (Array.isArray(prop.leadingComments)) {
              // grab the prop name
              // @TODO test for expressions here: {[foo]: PropTypes.string}
              let propName = prop.key.name
              let propObj = {
                name: propName,
                comments: formatComments(prop.leadingComments),
              }
              // This is a bit weird, but if the prop is like PropTypes.string.isRequired
              // its nested another layer
              if (t.isMemberExpression(prop.value)) {
                console.log('first', prop.value.object)
                let propType = prop.value.object.name
                if (t.isMemberExpression(prop.value.object)) {
                  console.log('second', prop.value.object)
                }
              }
              propData.push(propObj)
            }
          })
          component.props = propData
          data.components = [...data.components, component]
        }
      },
    },
    post(state) {
      if (state.opts.skipWriteFile) {
        return
      }
      let dir = path.dirname(state.opts.filename)
      let filename = path.basename(state.opts.filename).split('.')[0]
      fs.writeFileSync(
        path.join(dir, `${filename}.metadata.js`),
        `module.exports = ${JSON.stringify(this.data, null, 2)}`,
      )
    },
  }
}
