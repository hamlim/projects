import 'regenerator-runtime'
import * as React from 'react'
import { BrowserRouter } from '@matthamlin/reroute-browser'
import * as Components from '@matthamlin/component-library'
import { createRoot } from 'react-dom'
import {
  createEditor,
  Node,
  Transforms,
  Text as SlateText,
  Editor,
} from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Mdx from '@mdx-js/runtime'
import ErrorBoundary from '@matthamlin/error-boundary'

let { ThemeProvider, Box, H1 } = Components

let { useState, useDeferredValue, useMemo, useRef, useEffect } = React

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

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function MDXEditor() {
  let editor = useMemo(() => withReact(createEditor()), [])
  let [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.\n\n' }],
    },
  ])

  let [mdx, setMdx] = useState('')

  let updateMdx = useMemo(() => () => setMdx(serializeToMdx(value)), [value])

  useInterval(updateMdx, 500)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Box
          border="solid 1px"
          borderColor="gray.2"
          minHeight="calc(100vh - var(--header-height, 10px))"
        >
          <Editable
            onKeyDown={event => {
              console.log(event.metaKey)
              if (!event.metaKey) {
                return
              }

              switch (event.key) {
                // When "`" is pressed, keep our existing code block logic.
                case '`': {
                  event.preventDefault()
                  const [match] = Editor.nodes(editor, {
                    match: n => n.type === 'code',
                  })
                  Transforms.setNodes(
                    editor,
                    { type: match ? 'paragraph' : 'code' },
                    { match: n => Editor.isBlock(editor, n) },
                  )
                  break
                }

                // When "B" is pressed, bold the text in the selection.
                case 'b': {
                  event.preventDefault()
                  Transforms.setNodes(
                    editor,
                    { bold: true },
                    // Apply it to text nodes, and split the text node up if the
                    // selection is overlapping only part of it.
                    { match: n => SlateText.isText(n), split: true },
                  )
                  break
                }
              }
            }}
          />
        </Box>
        <Box
          border="solid 1px"
          borderColor="gray.2"
          minHeight="calc(100vh - var(--header-height, 10px))"
        >
          <ErrorBoundary Fallback={Fallback} key={mdx}>
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
