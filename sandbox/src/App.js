import React, { useContext, useState } from 'react'
import {
  ThemeProvider,
  Button,
  Banner,
  UncontrolledFieldset,
  UncontrolledHiddenRadioButton,
  fieldsetContext,
  UncontrolledTextarea,
  UncontrolledInput,
  Box,
  Label,
  Checkbox,
  UncontrolledCheckbox,
} from '@matthamlin/component-library'

import Editor from '@matthamlin/blocks-ui'
const JSX = `
import React from 'react'
import { HeaderBasic } from '@matthamlin/blocks-react'
export default () => (
  <Blocks.Root>
    <HeaderBasic>
      <HeaderBasic.Logo to="/">Hello</HeaderBasic.Logo>
      <HeaderBasic.Nav>
        <HeaderBasic.Link to="/about">About</HeaderBasic.Link>
        <HeaderBasic.Link to="/blog">Blog</HeaderBasic.Link>
        <HeaderBasic.Link to="/contact">Contact</HeaderBasic.Link>
      </HeaderBasic.Nav>
    </HeaderBasic>
  </Blocks.Root>
)
`

function handleChange(val) {
  console.log(val)
}

function Radio({ value, disabled }) {
  let [selectedValue] = useContext(fieldsetContext)

  return (
    <Label
      display="block"
      p="20px"
      style={{
        outline: selectedValue === value ? 'solid 1px mediumseagreen' : 'none',
      }}
    >
      <UncontrolledHiddenRadioButton disabled={disabled} value={value} />{' '}
      {value.toUpperCase()}
    </Label>
  )
}

function ComponentExamples() {
  let [checked, setChecked] = useState(true)
  return (
    <Box m={4}>
      <Button onTap={() => console.log('Tap')}>Click Me</Button>
      <Banner variant="success">Banner</Banner>
      <UncontrolledFieldset name="foo" defaultValue="a" onChange={handleChange}>
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
  )
}

function App() {
  return (
    <ThemeProvider>
      <Editor src={JSX} />
      <ComponentExamples />
    </ThemeProvider>
  )
}

export default App
