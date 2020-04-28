import path from 'path'
import fs from 'fs'
import generate from '@babel/generator'
import defaultJSDocCommentParser from '@matthamlin/jsdoc-comment-parser'

export function defaultFormatComments(comments) {
  return comments
    .map(comment => {
      if (comment.type === 'CommentBlock') {
        return `/*${comment.value}\n*/`
      }
      return comment.value
    })
    .join('\n')
}

function isReactSuperClass({
  superClass,
  t,
  reactComponentImport = 'Component',
  reactDefaultImport = 'React',
}) {
  if (t.isMemberExpression(superClass)) {
    return (
      superClass.object.name === reactDefaultImport &&
      superClass.property.name === 'Component'
    )
  } else {
    return superClass.name === reactComponentImport
  }
}

// Flag to determine if an import is a nameespace import
// We probably don't need this if we just collect the raw import declarations
let namespaceImportSigil = {}

function lookupImportedReferences({ prop, propObj, imports }) {
  console.log(imports)
  let foundReference = imports.find(importObject => {
    return importObject.specifiers.find(importSpecifier => {
      // imported -> value exported from other file
      // local -> local reference to that value
      if (importSpecifier.value.local === prop.name) {
        return true
      }
    })
  })
  if (foundReference) {
    // time to go look at that file
    // Need to track down the specifier that it matched
  }
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
        imports: [],
        hooks: [],
      }
      // Array of named imports from prop-types package
      this.propTypesNamedImports = []
      // imported specifier for the default/namespace prop-types import
      this.propTypesImport = ''
    },
    visitor: {
      ImportDeclaration(path, state) {
        // Collect import metadata about React and React.Component
        let {
          opts: {
            reactSource = 'react',
            reactComponentValue = 'Component',
          } = {},
        } = state
        if (path.node.source.value === reactSource) {
          for (let specifier of path.node.specifiers) {
            // import * as React from 'react';
            if (t.isImportNamespaceSpecifier(specifier)) {
              this.reactDefaultImport = specifier.local.name
              // import React from 'react';
            } else if (t.isImportDefaultSpecifier(specifier)) {
              this.reactDefaultImport = specifier.local.name
              // import {Component} from 'react';
            } else if (t.isImportSpecifier(specifier)) {
              if (specifier.imported.name === reactComponentValue) {
                this.reactComponentImport = specifier.local.name
              }
            }
          }
        }

        // Collect PropTypes import
        let { opts: { propTypesSource = 'prop-types' } = {} } = state
        if (path.node.source.value === propTypesSource) {
          for (let specifier of path.node.specifiers) {
            // import * as propTypes from 'prop-types'
            if (t.isImportNamespaceSpecifier(specifier)) {
              this.propTypesImport = specifier.local.name
              // import PropTypes from 'prop-types'
            } else if (t.isImportDefaultSpecifier(specifier)) {
              this.propTypesImport = specifier.local.name
              // import {string, bool} from 'prop-types'
            } else if (t.isImportSpecifier(specifier)) {
              this.propTypesNamedImports.push({
                type: specifier.imported.name,
                value: specifier.local.name,
              })
            }
          }
        }

        // Push all imports into the imports metadata
        this.data.imports.push({
          specifiers: path.node.specifiers.map(specifier => {
            return {
              type: t.isImportDefaultSpecifier(specifier) ? 'default' : 'named',
              value: {
                local: specifier.local.name,
                imported: specifier.imported
                  ? specifier.imported.name
                  : t.isImportNamespaceSpecifier(specifier)
                  ? namespaceImportSigil
                  : specifier.local.name,
              },
            }
          }),
          source: path.node.source.value,
        })
      },
      // PropType visitor
      // Classical componentName.propTypes handler
      AssignmentExpression(path, state) {
        let {
          opts: { formatComments = defaultFormatComments },
        } = state
        let didEncounterProps = false
        // Foo
        let componentName = path.node.left.object.name
        // Setup the data we will return
        let component = this.data.components.find(
          comp => comp.name === componentName,
        )
        if (!component) {
          component = {
            name: componentName,
          }
        }
        let propData = component.props || []
        if (
          // Foo.propTypes
          t.isMemberExpression(path.node.left) &&
          path.node.left.property.name === 'propTypes'
        ) {
          didEncounterProps = true
          // Iterate through the prop-types
          // @TODO assumes an object expression definition
          let props = path.node.right.properties
          props.forEach(prop => {
            // grab the prop name
            // @TODO test for expressions here: {[foo]: PropTypes.string}
            let propName = prop.key.name
            let propObj = {
              name: propName,
              type: {},
            }
            if (Array.isArray(prop.leadingComments)) {
              propObj.type.comments = formatComments(prop.leadingComments)
            }
            // Foo.propTypes = { bar: value }
            if (t.isIdentifier(prop.value)) {
              lookupImportedReferences({
                prop: prop.value,
                imports: this.data.imports,
                propObj,
              })
            } else if (t.isMemberExpression(prop.value)) {
              // Foo.propTypes = {bar: PropTypes.value }
              let propType = prop.value.object.name
              // Again here handles nested calls, e.g. `Foo.propTypes = { bar: PropTypes.string.isRequired }`
              if (t.isMemberExpression(prop.value.object)) {
                propObj.type.raw = generate(prop.value).code
              } else {
                propObj.type.raw = generate(prop.value).code
              }
            } else {
              // Otherwise give up and try to parse the code
              propObj.type.raw = generate(prop.value).code
            }

            // Merge the prop into existing propData
            if (propData.find(prop => prop.name === propName)) {
              propData = propData.map(propDatum => {
                if (propDatum.name === propObj.name) {
                  return {
                    ...propDatum,
                    ...propObj,
                  }
                }
                return propDatum
              })
            } else {
              propData = [...propData, propObj]
            }
          })
        } else if (
          // Foo.defaultProps
          t.isMemberExpression(path.node.left) &&
          path.node.left.property.name === 'defaultProps'
        ) {
          didEncounterProps = true
          // Iterate through the prop-types
          // @TODO assumes an object expression definition
          let defaultProps = path.node.right.properties
          defaultProps.forEach(prop => {
            // grab the prop name
            // @TODO test for expressions here: {[foo]: PropTypes.string}
            let propName = prop.key.name
            let propObj = {
              name: propName,
              default: {},
            }
            if (Array.isArray(prop.leadingComments)) {
              propObj.default.comments = formatComments(prop.leadingComments)
            }
            // This is a bit weird, but if the prop is like PropTypes.string.isRequired
            // its nested another layer
            if (t.isMemberExpression(prop.value)) {
              let propType = prop.value.object.name
              if (t.isMemberExpression(prop.value.object)) {
                propObj.default.raw = generate(prop.value).code
              } else {
                propObj.default.raw = generate(prop.value).code
              }
            } else {
              propObj.default.raw = generate(prop.value).code
            }

            // Merge the prop into existing propData
            if (propData.find(prop => prop.name === propName)) {
              propData = propData.map(propDatum => {
                if (propDatum.name === propObj.name) {
                  return {
                    ...propDatum,
                    ...propObj,
                  }
                }
                return propDatum
              })
            } else {
              propData = [...propData, propObj]
            }
          })
        }

        if (didEncounterProps) {
          component.props = propData
          if (this.data.components.find(comp => comp.name === componentName)) {
            this.data.components = this.data.components.map(comp => {
              if (comp.name === componentName) {
                return {
                  ...comp,
                  ...component,
                  props: [...comp.props, ...component.props].reduce(
                    (acc, prop) => {
                      if (acc.find(p => p.name === prop.name)) {
                        return acc.map(p => {
                          if (p.name === prop.name) {
                            return {
                              ...p,
                              ...prop,
                            }
                          }
                          return p
                        })
                      }
                      return [...acc, prop]
                    },
                    [],
                  ),
                }
              }
              return comp
            })
          } else {
            this.data.components = [component]
          }
        }
      },
      // Handle static propTypes = { ... } in a class
      ClassDeclaration(path, state) {
        let { reactComponentImport, reactDefaultImport } = this
        if (
          path.node.superClass &&
          isReactSuperClass({
            superClass: path.node.superClass,
            t,
            reactDefaultImport,
            reactComponentImport,
          })
        ) {
          // We know we are in a `class Foo extrends React.Component` here
          // find any static values in the class that are `propTypes`
          let staticPropTypes = path.node.body.body.find(bodyStatement => {
            return (
              t.isClassProperty(bodyStatement) &&
              bodyStatement.static &&
              bodyStatement.key.name === 'propTypes'
            )
          })
          let staticDefaultProps = path.node.body.body.find(bodyStatement => {
            return (
              t.isClassProperty(bodyStatement) &&
              bodyStatement.static &&
              bodyStatement.key.name === 'defaultProps'
            )
          })
          if (!staticPropTypes || !staticDefaultProps) {
            return
          }
          let {
            opts: { formatComments = defaultFormatComments },
          } = state
          let didEncounterProps = false
          // Foo
          let componentName = path.node.id.name
          // Setup the data we will return
          let component = this.data.components.find(
            comp => comp.name === componentName,
          )
          if (!component) {
            component = {
              name: componentName,
            }
          }
          let propData = component.props || []
          if (staticPropTypes) {
            didEncounterProps = true
            // Iterate through the prop-types
            // @TODO assumes an object expression definition
            let props = staticPropTypes.value.properties
            props.forEach(prop => {
              // grab the prop name
              // @TODO test for expressions here: {[foo]: PropTypes.string}
              let propName = prop.key.name
              let propObj = {
                name: propName,
                type: {},
              }
              if (Array.isArray(prop.leadingComments)) {
                propObj.type.comments = formatComments(prop.leadingComments)
              }
              // This is a bit weird, but if the prop is like PropTypes.string.isRequired
              // its nested another layer
              if (t.isMemberExpression(prop.value)) {
                let propType = prop.value.object.name
                if (t.isMemberExpression(prop.value.object)) {
                  propObj.type.raw = generate(prop.value).code
                } else {
                  propObj.type.raw = generate(prop.value).code
                }
              } else {
                propObj.type.raw = generate(prop.value).code
              }

              // Merge the prop into existing propData
              if (propData.find(prop => prop.name === propName)) {
                propData = propData.map(propDatum => {
                  if (propDatum.name === propObj.name) {
                    return {
                      ...propDatum,
                      ...propObj,
                    }
                  }
                  return propDatum
                })
              } else {
                propData = [...propData, propObj]
              }
            })
          }
          if (staticDefaultProps) {
            didEncounterProps = true
            // Iterate through the prop-types
            // @TODO assumes an object expression definition
            let defaultProps = staticDefaultProps.value.properties
            defaultProps.forEach(prop => {
              // grab the prop name
              // @TODO test for expressions here: {[foo]: PropTypes.string}
              let propName = prop.key.name
              let propObj = {
                name: propName,
                default: {},
              }
              if (Array.isArray(prop.leadingComments)) {
                propObj.default.comments = formatComments(prop.leadingComments)
              }
              // This is a bit weird, but if the prop is like PropTypes.string.isRequired
              // its nested another layer
              if (t.isMemberExpression(prop.value)) {
                let propType = prop.value.object.name
                if (t.isMemberExpression(prop.value.object)) {
                  propObj.default.raw = generate(prop.value).code
                } else {
                  propObj.default.raw = generate(prop.value).code
                }
              } else {
                propObj.default.raw = generate(prop.value).code
              }

              // Merge the prop into existing propData
              if (propData.find(prop => prop.name === propName)) {
                propData = propData.map(propDatum => {
                  if (propDatum.name === propObj.name) {
                    return {
                      ...propDatum,
                      ...propObj,
                    }
                  }
                  return propDatum
                })
              } else {
                propData = [...propData, propObj]
              }
            })
          }

          if (didEncounterProps) {
            component.props = propData
            if (
              this.data.components.find(comp => comp.name === componentName)
            ) {
              this.data.components = this.data.components.map(comp => {
                if (comp.name === componentName) {
                  return {
                    ...comp,
                    ...component,
                    props: [...comp.props, ...component.props].reduce(
                      (acc, prop) => {
                        if (acc.find(p => p.name === prop.name)) {
                          return acc.map(p => {
                            if (p.name === prop.name) {
                              return {
                                ...p,
                                ...prop,
                              }
                            }
                            return p
                          })
                        }
                        return [...acc, prop]
                      },
                      [],
                    ),
                  }
                }
                return comp
              })
            } else {
              this.data.components = [component]
            }
          }
        }
      },
      FunctionDeclaration(path, state) {
        let {
          opts: {
            formatComments = defaultFormatComments,
            parseJSDocComments = defaultJSDocCommentParser,
          },
        } = state
        // handle `function use*`
        if (path.node.id.name.startsWith('use')) {
          let leadingComments =
            path.node.leadingComments || path.parentPath.node.leadingComments
          let formattedComments = formatComments(leadingComments)
          let jsDoc = parseJSDocComments(formattedComments)

          this.data.hooks.push({
            name: path.node.id.name,
            rawLeadingComments: formattedComments,
            jsDoc: jsDoc,
          })
        }
        // @todo handle `{ useFoo() {} }` (aka object methods)
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
