import * as React from 'react'
import { BrowserRouter } from '@matthamlin/reroute-browser'
import { ThemeProvider, Box } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'
import ErrorBoundary from '@matthamlin/error-boundary'

import * as monaco from 'monaco-editor'

import * as parser from '@babel/parser'

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

let { useRef, useEffect, useState } = React

function Editor({
  value,
  onChange,
  language = 'javascript',
  minHeight = '100vh',
}) {
  let editorEl = useRef()
  useEffect(() => {
    if (editorEl.current) {
      let editor = monaco.editor.create(editorEl.current, {
        value,
        language,
      })

      editor.onDidChangeModelContent(evt => {
        onChange(editor.getValue())
      })
    }
  }, [])

  return <div ref={editorEl} style={{ minHeight }} />
}

let parserOpts = {
  sourceType: 'module',
  allowImportExportEverywhere: false,
  allowReturnOutsideFunction: false,
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

function ASTPreview({ value }) {
  return (
    <Editor
      value={JSON.stringify(parser.parse(value, parserOpts), null, 2)}
      language="json"
    />
  )
}

function App() {
  let [value, setValue] = useState(`console.log('foo');
      
export default function Foo() {
  return <div />
}`)
  let [
    transform,
    setTransform,
  ] = useState(`export default function createPlugin(babel) {
  let {types: t} = babel;
  return {
    visitor: {
      CallExpression(path) {
        console.log(path);
      }
    }
  }
}`)

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Box display="grid" flexGrow={1} gridTemplateColumns="1fr 1fr">
          <Box style={{ resize: 'both' }} border="solid 1px">
            <Editor value={value} onChange={setValue} minHeight="50vh" />
            <Editor
              value={transform}
              onChange={setTransform}
              minHeight="50vh"
            />
          </Box>
          <Box style={{ resize: 'both' }} border="solid 1px">
            <ErrorBoundary
              key={value}
              Fallback={({ error }) => (
                <Editor
                  value={`${error.message}\n${error.stack}`}
                  language=""
                />
              )}
            >
              <ASTPreview value={value} />
            </ErrorBoundary>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

createRoot(document.querySelector('#root')).render(<App />)
