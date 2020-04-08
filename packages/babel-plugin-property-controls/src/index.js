export function getPropertyControls(node) {
  return []
}

export default function({ types: t }) {
  return {
    name: 'babel-plugin-property-controls',
    visitor: {
      AssignmentExpression(path, state) {
        if (
          t.isMemberExpression(path.node.left) &&
          path.node.left.property.name === 'propertyControls'
        ) {
          if (state.opts.replaceWithProptypes) {
            let propertyControls = getPropertyControls(path.node)
            let propTypes = t.stringLiteral('TODO')
            let defaultProps = t.stringLiteral('TODO')
            path.replaceWithMultiple([propTypes, defaultProps])
          }

          // strip propert-controls
          if (state.opts.remove) {
            path.remove()
          }
        }
      },
    },
  }
}
