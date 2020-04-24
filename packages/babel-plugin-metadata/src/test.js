import pluginTester from 'babel-plugin-tester'
import plugin, {
  defaultFormatComments,
  defaultParseJSDocComments,
  removeAsterisks,
} from './index.js'
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

describe('removeAsterisks', () => {
  it('strips leading asterisks', () => {
    expect(
      removeAsterisks(`/*
* @usage
* 
* import {useFoo} from 'use-foo';
* 
* let value = useFoo(bar);
* 
* @param bar {number} - The default value
* 
* @returns value {number} - The current state
*/`),
    ).toMatchInlineSnapshot(`
      @usage
      * 
      * import {useFoo} from 'use-foo';
      * 
      * let value = useFoo(bar);
      * 
      * @param bar {number} - The default value
      * 
      * @returns value {number} - The current state
    `)
  })

  it("doesn't mess with other asterisks", () => {
    expect(
      `/*
* @usage
* 
* import {useFoo} from 'use-foo';
* 
* let value = useFoo(bar);
* 
* @param bar {*} - The default value
* 
* @returns value {number} - The current state
*/`
        .split('\n')
        .map(removeAsterisks)
        .join('\n'),
    ).toMatchInlineSnapshot(`
      /*
      @usage

      import {useFoo} from 'use-foo';

      let value = useFoo(bar);

      @param bar {*} - The default value

      @returns value {number} - The current state

    `)
  })
})

describe('defaultParseJSDocComments', () => {
  it('handles well formed comments', () => {
    let res = defaultParseJSDocComments(
      removeAsterisks(`/*
    * @usage
    * 
    * import {useFoo} from 'use-foo';
    * 
    * let value = useFoo(bar);
    * 
    * @param bar {number} - The default value
    * 
    * @returns value {number} - The current state
    */`),
    )
    expect(res).toMatchInlineSnapshot(`
      Object {
        params: Array [],
        returns: null,
        usage: null,
      }
    `)
  })
})
