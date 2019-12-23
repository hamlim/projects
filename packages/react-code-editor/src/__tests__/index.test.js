import React from 'react'
import { render } from '@testing-library/react'
import Editor from '../index.js'

const CODE = `import React from "react";
import ReactDOM from "react-dom";
function App() {
  return (
    <h1>Hello world</h1>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));`

test('it renders', () => {
  expect(() =>
    render(<Editor initialValue={CODE} highlight={code => code} />),
  ).not.toThrow()
})
