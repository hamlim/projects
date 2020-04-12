import 'regenerator-runtime'
import * as React from 'react'
import { BrowserRouter } from '@matthamlin/reroute-browser'
import * as Components from '@matthamlin/component-library'
import { createRoot } from 'react-dom'
import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Mdx from '@mdx-js/runtime'
import ErrorBoundary from '@matthamlin/error-boundary'

let { ThemeProvider, Box, H1 } = Components

let { useState, useDeferredValue, useMemo, useRef } = React

let editor = withReact(createEditor())

function serializeToMdx(nodes) {
  return nodes.map(n => Node.string(n)).join('\n')
}

function Fallback({ error }) {
  return <pre>{JSON.stringify(error, null, 2)}</pre>
}

let styledComps = {
  ...Components,
  a: props => <Components.Link forwardedAs="a" {...props} />,
  p: Components.Text,
  button: Components.Button,
}

function Header() {
  return (
    <Box
      forwardedAs="header"
      height="var(--header-height)"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <H1 fontSize={3}>Slate MDX Editor</H1>
      <Box>Made with MDX and Slate</Box>
    </Box>
  )
}

function useDebouncedValue(value, { timeoutMs = 200 }) {
  let [localValue, setLocalValue] = useState(value)
  let cbRef = useRef()
}

function MDXEditor() {
  let [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.\n\n' }],
    },
  ])

  let renderable = useMemo(() => serializeToMdx(value), [value])

  let mdx = useDeferredValue(renderable, { timeoutMs: 500 })

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Box
          border="solid 1px"
          borderColor="gray.2"
          minHeight="calc(100vh - var(--header-height, 10px))"
        >
          <Editable />
        </Box>
        <Box
          border="solid 1px"
          borderColor="gray.2"
          minHeight="calc(100vh - var(--header-height, 10px))"
        >
          <ErrorBoundary
            Fallback={({ error }) => (
              <pre style={{ whiteSpace: 'nowrap' }}>
                {JSON.stringify(error, null, 2)}
              </pre>
            )}
            key={mdx}
          >
            <Mdx components={styledComps}>{mdx}</Mdx>
          </ErrorBoundary>
        </Box>
      </Slate>
    </div>
  )
}

createRoot(document.querySelector('#root')).render(
  <ThemeProvider>
    <style>{`:root { --header-height: 50px }`}</style>
    <BrowserRouter>
      <Header />
      <MDXEditor />
    </BrowserRouter>
  </ThemeProvider>,
)
