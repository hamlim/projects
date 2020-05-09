import * as React from 'react'
import { Box } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'
import ErrorBoundary from '@matthamlin/error-boundary'
import useLocalStorage from '@matthamlin/use-local-storage'

import * as monaco from 'monaco-editor'

import { parse } from '@babel/parser'
import generate from '@babel/generator'
import template from '@babel/template'

// handle loading workers
self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === 'json') {
      return './json.worker.js'
    }
    if (label === 'css') {
      return './css.worker.js'
    }
    if (label === 'html') {
      return './html.worker.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js'
    }
    return './editor.worker.js'
  },
}

let {
  useRef,
  useEffect,
  useState,
  unstable_useDeferredValue: useDeferredValue,
  useLayoutEffect,
} = React

function Editor({
  value,
  onChange,
  language = 'javascript',
  minHeight = '100vh',
  theme = 'vs-dark',
}) {
  let editorEl = useRef()
  let monacoRef = useRef()

  let hasSetValue = useRef(false)

  useEffect(() => {
    if (editorEl.current) {
      let editor = monaco.editor.create(editorEl.current, {
        value,
        language,
        theme,
      })

      editor.onDidChangeModelContent(evt => {
        onChange(editor.getValue())
      })

      monacoRef.current = editor

      function handleResize() {
        editor.layout()
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // account for hydration from local storage, on mount if the value is different then set it
    if (
      monacoRef.current &&
      monacoRef.current.getValue() !== value &&
      hasSetValue.current === false
    ) {
      monacoRef.current.setValue(value)
      hasSetValue.current = true
    }
  }, [value])

  return <div ref={editorEl} style={{ minHeight }} />
}

let parserOpts = {
  sourceType: 'module',
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  ranges: false,
  tokens: false,
  plugins: [
    'asyncGenerators',
    'classProperties',
    ['decorators', { decoratorsBeforeExport: false }],
    'doExpressions',
    'exportExtensions',
    'flow',
    'functionSent',
    'functionBind',
    'jsx',
    'objectRestSpread',
    'dynamicImport',
    'nullishCoalescingOperator',
    'numericSeparator',
    'optionalChaining',
    'optionalCatchBinding',
  ],
}

let transformOpts = {
  sourceType: 'module',
  presets: [['stage-0', { decoratorsBeforeExport: false }]],
  plugins: ['syntax-jsx'],
}

function ASTPreview({ source }) {
  return (
    <Editor
      value={JSON.stringify(parse(source, parserOpts), null, 2)}
      language="json"
      minHeight="50vh"
    />
  )
}

/*

 transform looks like:

  `export default function createAPI(babel) {
    return {}
  }`

  We can swap export default for return

  `
  function createAPI(babel) {};
  return createAPI
  `

  Then we need to pass that to `babel.transform(source, {
    ...parserOpts,
    plugins: [...parserOpts.plugins, call a function that returns the above]
  })`

  return that

*/

function swapExportForReturn({ types }) {
  return {
    visitor: {
      // replace imports with quotes
      ImportDeclaration(path) {
        let importCode = generate(path.node).code
        path.replaceWith(template.statement(`"${importCode}"`)())
      },
      // reemove or replace other `export`s in the snippet
      ExportNamedDeclaration(path) {
        const value = path.node.declaration
        if (
          types.isVariableDeclaration(value) ||
          types.isFunctionDeclaration(value)
        ) {
          path.replaceWith(value)
        } else {
          path.remove()
        }
      },
      ExportDefaultDeclaration(path) {
        const value = path.node.declaration
        // export default Demo
        if (types.isIdentifier(value)) {
          path.replaceWith(types.ReturnStatement(value))
        } else if (types.isArrowFunctionExpression(value)) {
          // export default () => {}
          const uuid = path.scope.generateUidIdentifier('export')
          const name = uuid.name
          // export default function Demo() {}
          path.replaceWithMultiple([
            // move the body of the export to be above the return
            types.VariableDeclaration('var', [
              types.VariableDeclarator(uuid, value),
            ]),
            // return the exported value
            types.ReturnStatement(types.Identifier(name)),
          ])
        } else {
          // Account for anonymous exports
          // e.g. export default function() {}
          let name, funcBody
          if (!value.id) {
            const uuid = path.scope.generateUidIdentifier('export')
            name = uuid.name
            path.node.declaration.id = uuid
            funcBody = path.node.declaration
          } else {
            name = value.id.name
            funcBody = path.node.declaration
          }
          // export default function Demo() {}
          path.replaceWithMultiple([
            // move the body of the export to be above the return
            funcBody,
            // return the exported value
            types.ReturnStatement(types.Identifier(name)),
          ])
        }
      },
    },
  }
}

function doTransform({ source, transform }) {
  let withoutExportDefault = window.Babel.transform(transform, {
    ...transformOpts,
    plugins: [...transformOpts.plugins, swapExportForReturn],
  })

  let createPlugin = new Function(withoutExportDefault.code)

  let plugin = createPlugin()

  if (typeof plugin !== 'function') {
    throw new Error('No plugin was exported by default!')
  }

  try {
    return window.Babel.transform(source, {
      ...transformOpts,
      plugins: [...transformOpts.plugins, createPlugin()],
    }).code
  } catch (err) {
    throw new Error(
      `${err.message}\n${JSON.stringify(
        err,
        null,
        2,
      )}\nSource:\n${createPlugin.toString()}`,
    )
  }
}

function Transformed({ source, transform }) {
  let transformed = doTransform({ source, transform })

  return <Editor value={transformed} minHeight="50vh" />
}

function ErrorEditor({ error }) {
  return (
    <Editor
      value={`${error.message}\n${error.stack}`}
      language=""
      minHeight="50vh"
    />
  )
}

export default function Sandbox() {
  let [source, setSource] = useLocalStorage(
    useState(`console.log('foo');
      
export default function Foo() {
  return <div />
}`),
    { key: 'source', hydrate: true },
  )
  let [transform, setTransform] = useLocalStorage(
    useState(`export default function swapExportForReturn({ types }) {
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        const value = path.node.declaration
        // export default Demo
        if (types.isIdentifier(value)) {
          path.replaceWith(types.ReturnStatement(value))
        } else if (types.isArrowFunctionExpression(value)) {
          // export default () => {}
          const uuid = path.scope.generateUidIdentifier('export')
          const name = uuid.name
          // export default function Demo() {}
          path.replaceWithMultiple([
            // move the body of the export to be above the return
            types.VariableDeclaration('var', [
              types.VariableDeclarator(uuid, value),
            ]),
            // return the exported value
            types.ReturnStatement(types.Identifier(name)),
          ])
        } else {
          // Account for anonymous exports
          // e.g. export default function() {}
          let name, funcBody
          if (!value.id) {
            const uuid = path.scope.generateUidIdentifier('export')
            name = uuid.name
            path.node.declaration.id = uuid
            funcBody = path.node.declaration
          } else {
            name = value.id.name
            funcBody = path.node.declaration
          }
          // export default function Demo() {}
          path.replaceWithMultiple([
            // move the body of the export to be above the return
            funcBody,
            // return the exported value
            types.ReturnStatement(types.Identifier(name)),
          ])
        }
      },
    },
  }
}`),
    { key: 'transform', hydrate: true },
  )

  useLayoutEffect(() => {
    document.getElementById('root').style =
      'display: flex; min-height: 100vh; min-width: 100vw; height: 100vh; width: 100vw; max-height: 100vh; max-width: 100vw; overflow: hidden; background-color: #1e1e1e;'
  }, [])

  let deferredSource = useDeferredValue(source, { timeoutMs: 200 })
  let deferredTransform = useDeferredValue(transform, { timeoutMs: 200 })

  return (
    <Box display="grid" flexGrow={1} gridTemplateColumns="1fr 1fr">
      <Box border="solid 1px">
        <Editor value={source} onChange={setSource} minHeight="50vh" />
        <Editor value={transform} onChange={setTransform} minHeight="50vh" />
      </Box>
      <Box border="solid 1px">
        <ErrorBoundary key={deferredSource} Fallback={ErrorEditor}>
          <ASTPreview source={deferredSource} />
        </ErrorBoundary>
        <ErrorBoundary
          key={deferredSource + deferredTransform}
          Fallback={ErrorEditor}
        >
          <Transformed source={deferredSource} transform={deferredTransform} />
        </ErrorBoundary>
      </Box>
    </Box>
  )
}
