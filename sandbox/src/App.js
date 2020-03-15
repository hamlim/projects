import React, { useContext } from 'react'
import {
  ThemeProvider,
  Button,
  Banner,
  UncontrolledFieldset,
  UncontrolledRadioButton,
  fieldsetContext,
  UncontrolledTextarea,
  UncontrolledInput,
  Box,
  Label,
} from '@matthamlin/component-library'

function handleChange(val) {
  console.log(val)
}

function Radio({ value, disabled }) {
  let [selectedValue] = useContext(fieldsetContext)

  return (
    <Label
      style={{
        display: 'block',
        outline: selectedValue === value ? 'solid 1px mediumseagreen' : 'none',
        padding: 20,
      }}
    >
      <UncontrolledRadioButton disabled={disabled} value={value} />{' '}
      {value.toUpperCase()}
    </Label>
  )
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Button onTap={() => console.log('Tap')}>Click Me</Button>
        <Banner variant="success">Banner</Banner>
        <UncontrolledFieldset
          name="foo"
          defaultValue="a"
          onChange={handleChange}
        >
          <Box m={4}>
            <Radio value="a" />
            <Radio value="b" />
            <Radio value="c" />
          </Box>
        </UncontrolledFieldset>
        <Label m={6}>
          Textarea:
          <UncontrolledTextarea defaultValue="Type something else here ..." />
        </Label>
        <Label m={6}>
          Input:
          <UncontrolledInput />
        </Label>
      </div>
    </ThemeProvider>
  )
}

export default App
