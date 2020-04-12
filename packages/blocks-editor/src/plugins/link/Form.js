/** @jsx jsx */
import { useState } from 'react'
import { jsx } from '@emotion/core'
import { Styled, css, Flex, Box } from 'theme-ui'

import { Card, Label, Input, Button } from '../../components/ui'

const Form = ({ node, editor }) => {
  const title = node.data.get('title') || ''
  const href = node.data.get('href') || ''
  const onSubmit = data => {
    editor.setNodeByKey(node.key, { data }).deselect()
  }
  const [state, setState] = useState({ title, href })

  return (
    <Card contentEditable={false}>
      <form
        onClick={e => {
          e.stopPropagation()
        }}
        onSubmit={e => {
          e.preventDefault()
          onSubmit(state)
        }}
      >
        <Flex alignItems="flex-end">
          <Label mr={2}>
            URL
            <Input
              type="text"
              name="href"
              value={state.href}
              onChange={e => {
                setState({ ...state, href: e.target.value })
              }}
            />
          </Label>
          <Label mr={2}>
            Title
            <Input
              type="text"
              name="title"
              value={state.title}
              onChange={e => {
                setState({ ...state, title: e.target.value })
              }}
            />
          </Label>
          <Button>Apply</Button>
          <Button
            css={css({
              bg: 'red',
              color: 'white',
              ml: 2
            })}
            onClick={() => editor.unwrapLink()}
          >
            Remove
          </Button>
        </Flex>
      </form>

      <Box fontSize={1} mt={2}>
        <Styled.p>
          Open link:{' '}
          <Styled.a href={state.href} target="_blank">
            {state.href}
          </Styled.a>
        </Styled.p>
      </Box>
    </Card>
  )
}

export default Form
