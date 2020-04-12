import { testPlugin } from './test-util'
import plugin from './add-block-imports'

test('add additional blocks named imports', () => {
  const result = testPlugin(
    plugin,
    'import React from "react"\nimport { Blocks } from "@matthamlin/blocks-react"',
    {
      blocks: [{ name: 'HeaderBasic' }],
    },
  )

  expect(result).toEqual(
    `import React from "react";\nimport { Blocks, HeaderBasic } from "@matthamlin/blocks-react"`,
  )
})

test('should not update non block ImportDeclaration', () => {
  const result = testPlugin(plugin, 'import React from "react"')

  expect(result).toEqual(`import React from "react"`)
})
