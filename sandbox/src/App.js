import React from 'react'
import { ThemeProvider, Button, Banner } from '@matthamlin/component-library'

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Button onTap={() => console.log('Tap')}>Click Me</Button>
        <Banner variant="success">Banner</Banner>
      </div>
    </ThemeProvider>
  )
}

export default App
