import React, { useContext } from 'react'
import {
  ThemeProvider,
  Button,
  Banner,
  ControlledFieldset,
  ControlledRadioButton,
  fieldsetContext,
  Box,
} from '@matthamlin/component-library'

function handleChange(val) {
  console.log(val)
}

function Radio({ value, disabled }) {
  let [selectedValue] = useContext(fieldsetContext)

  return (
    <label
      style={{
        display: 'block',
        outline: selectedValue === value ? 'solid 1px mediumseagreen' : 'none',
        padding: 20,
      }}
    >
      <ControlledRadioButton disabled={disabled} value={value} />{' '}
      {value.toUpperCase()}
    </label>
  )
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Button onTap={() => console.log('Tap')}>Click Me</Button>
        <Banner variant="success">Banner</Banner>
        <ControlledFieldset name="foo" defaultValue="a" onChange={handleChange}>
          <Box m={4}>
            <Radio value="a" />
            <Radio value="b" />
            <Radio value="c" />
          </Box>
        </ControlledFieldset>
      </div>
    </ThemeProvider>
  )
}

export default App
