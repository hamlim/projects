function stripPropertyControls(path, { t, template }) {}

let componentName = 'NO_COMPONENT_FOUND'

function getType(propValue, { t, template }) {
  const values = propValue.properties
  const type = values.find(node => node.key.name === 'type')
  const propTypes = t.identifier('PropTypes')
  switch (type.value.property.name) {
    case 'string':
      return t.memberExpression(propTypes, t.identifier('string'))
    case 'enum': {
      const vals = values.find(node => node.key.name === 'values')
      const args = vals.value.elements.map(val => {
        return t[val.type[0].toLowerCase() + val.type.slice(1)](val.value)
      })
      console.log(args)
      return t.expressionStatement(
        t.memberExpression(
          propTypes,
          // TODO
          t.callExpression(t.identifier('oneOf'), args),
        ),
      )
    }
  }
  return null
}

function assignProperty({ t, to, name, value }) {
  return t.assignmentExpression(
    '=',
    t.memberExpression(t.identifier(to), t.identifier(name)),
    value,
  )
}

function applyPropTypes(path, { t, template }) {
  componentName = path.node.expression.left.object.name
  const properties = path.node.expression.right.properties

  const types = properties.reduce((acc, property) => {
    acc[property.key.name] = getType(property.value, t)
    return acc
  }, {})

  console.log(types)

  // propTypes
  path.insertBefore(
    assignProperty({
      t,
      to: componentName,
      name: 'propTypes',
      // TODO
      value: t.objectExpression(types),
    }),
  )

  // TODO
  // defaultProps
  path.insertBefore(
    assignProperty({
      t,
      to: componentName,
      name: 'defaultProps',
      value: t.stringLiteral('foo'),
    }),
  )
}

/*

[
  'babel-plugin-property-controls',
  { 
    mode: 'production'
  }
]

*/

export default function(babel) {
  const { types: t, template } = babel

  return {
    name: 'ast-transform', // not required
    visitor: {
      ExpressionStatement(path, { opts }) {
        if (path.node.expression.left.property.name !== 'propertyControls') {
          return
        }

        if (opts.mode === 'production') {
          stripPropertyControls(path, { t, template })
        } else {
          applyPropTypes(path, { t, template })
        }

        // console.log(path);
      },
    },
  }
}
