# `@matthamlin/react-code-editor`

This package provides an opinionated package built on top of React Hooks and `react-simple-code-editor`.

It implements a lightweight code editor component that supports the following enhancements:

- Line commenting via `Cmd + /` or `Ctrl + /`
- Format on Save via `Cmd + s` or `Ctrl + s` - with `formatOnSave` prop
- Format code via `Cmd + f` or `Ctrl + f`

## Usage

```jsx
import React from 'react'
import Editor from '@matthamlin/react-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import prettier from 'prettier/standalone'
import babelPlugin from 'prettier/parser-babylon'

const code = `import React from "react";
import ReactDOM from "react-dom";
function App() {
  return (
    <h1>Hello world</h1>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));`

function App() {
  return (
    <Editor
      initialValue={code}
      highlight={code => highlight(code, languages.jsx)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      formatOnSave
      formatCode={code =>
        prettier.format(code, { parser: 'babel', plugins: [babelPlugin] })
      }
    />
  )
}
```
