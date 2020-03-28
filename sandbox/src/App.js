import React, { useContext, useState } from 'react'
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
  Checkbox,
  UncontrolledCheckbox,
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
  let [checked, setChecked] = useState(true)
  return (
    <ThemeProvider>
      <Box m={4}>
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
        <Label m={6} flexWrap="wrap">
          <Box>Textarea:</Box>
          <UncontrolledTextarea defaultValue="Type something else here ..." />
        </Label>
        <Label m={6} flexWrap="wrap">
          <Box>Input:</Box>
          <UncontrolledInput />
        </Label>
        <Box m={6}>
          <Label>
            <Checkbox mr={2} checked={checked} disabled onChange={setChecked} />{' '}
            Check this
          </Label>
        </Box>
        <Box m={6}>
          <Label>
            <UncontrolledCheckbox
              mr={2}
              defaultChecked={checked}
              onChange={setChecked}
            />{' '}
            Check this
          </Label>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
