import React, { useRef, useEffect } from 'react'
import { BrowserRouter } from '@matthamlin/reroute-browser'
import { ThemeProvider, Box } from '@matthamlin/component-library'
import { createRoot } from 'react-dom'

import * as monaco from 'monaco-editor'

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

function Editor({ value, onChange, language = 'javascript' }) {
  let editorEl = useRef()
  let monacoInstance = useRef()
  useEffect(() => {
    if (editorEl.current) {
      let editor = monaco.editor.create(editorEl.current, {
        value,
        language,
      })

      monacoInstance.current = editor
    }
  }, [])

  return <div ref={editorEl} style={{ minHeight: '100vh' }} />
}

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Box display="grid" gridTemplateColumns="1fr 1fr">
        <Box style={{ resize: 'both' }} border="solid 1px">
          <Editor
            value={`console.log('foo');
      
export default function Foo() {
  return <div />
}`}
          />
        </Box>
        <Box style={{ resize: 'both' }} border="solid 1px" />
      </Box>
    </BrowserRouter>
  </ThemeProvider>,
)
