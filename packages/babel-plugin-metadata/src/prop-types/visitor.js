export default function constructPropTypeVisitor({ data, types: t }) {
  return {
    AssignmentExpression(path) {
      if (
        // Foo.propTypes
        t.isMemberExpression(path.node.left) &&
        path.node.left.property.name === 'propTypes'
      ) {
        // Foo
        let componentName = path.node.left.object.name
        // Setup the data we will return
        data[componentName] = {}
        let propData = {}
        // Iterate through the prop-types
        // @TODO assumes an object expression definition
        path.node.right.properties.forEach(propertyNode => {
          // If there are leading comments we want to process the prop
          // @TODO we probably want to process every prop and then strip at runtime
          if (Array.isArray(propertyNode.leadingComments)) {
            // grab the prop name
            // @TODO test for expressions here: {[foo]: PropTypes.string}
            let propName = propertyNode.key.name
            // This is a bit weird, but if the prop is like PropTypes.string.isRequired
            // its nested another layer
            if (t.isMemberExpression(propertyNode.value)) {
              console.log(propertyNode.value.object)
              let propType = propertyNode.value.object.name
              // if (t.isMemberExpression(propertyNode.value.object)) {
              // propType += propertyNode.value.object.name +
            }
          }
        })
      }
    },
  }
}
