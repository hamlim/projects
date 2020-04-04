# `@matthamlin/ast-gql`

> 🚨 This project is a Work in Progress and may not work yet

A library that lets you query an AST using GraphQL.

## API

```js
import { parse } from '@babel/parse'
import { query, gql } from '@matthamlin/ast-gql'

let ast = parse(`
Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  bordered: PropTypes.bool
}
`)

let result = query(
  ast,
  gql`
    AssignmentExpression {
      left {
        object {
          name
        }
        property(name: 'propTypes') {
          parent {
            right {
              properties {
                key {
                  name
                }
              }
            }
          }
        }
      }
    }
  `,
)
```

```js
// result
{
  data: {
    AssignmentExpression: [
      {
        left: {
          object: {
            name: 'Avatar',
          },
          property: {
            parent: {
              right: {
                properties: ['size', 'bordered'],
              },
            },
          },
        },
      },
    ]
  }
}
```
