import pluginTester from 'babel-plugin-tester'
import plugin, { defaultFormatComments } from './index.js'
import path from 'path'

pluginTester({
  plugin,
  fixtures: path.join(__dirname, '__fixtures__'),
})

describe('defaultFormatComments', () => {
  it('joins the array of comments to a single string', () => {
    expect(
      defaultFormatComments([
        { value: 'some first comment' },
        { value: 'another second comment' },
      ]),
    ).toMatch('some first comment\nanother second comment')
  })
})
