import parse from './index.js'

test('integration', () => {
  expect(
    JSON.stringify(
      parse(`/**
* useFoo
*
* const val = useFoo(initialState);
*
* @param {number} initialState - The initial state of the useFoo hook
* @returns {number} state - The current value
*/`),
      null,
      2,
    ),
  ).toMatchInlineSnapshot(`
    "[
      {
        \\"tags\\": [
          {
            \\"tag\\": \\"param\\",
            \\"type\\": \\"number\\",
            \\"name\\": \\"initialState\\",
            \\"optional\\": false,
            \\"description\\": \\"- The initial state of the useFoo hook\\",
            \\"line\\": 5,
            \\"source\\": \\"@param {number} initialState - The initial state of the useFoo hook\\"
          },
          {
            \\"tag\\": \\"returns\\",
            \\"type\\": \\"number\\",
            \\"name\\": \\"state\\",
            \\"optional\\": false,
            \\"description\\": \\"- The current value\\",
            \\"line\\": 6,
            \\"source\\": \\"@returns {number} state - The current value\\"
          }
        ],
        \\"line\\": 0,
        \\"description\\": \\"useFoo\\\\n\\\\nconst val = useFoo(initialState);\\",
        \\"source\\": \\"useFoo\\\\n\\\\nconst val = useFoo(initialState);\\\\n\\\\n@param {number} initialState - The initial state of the useFoo hook\\\\n@returns {number} state - The current value\\"
      }
    ]"
  `)
})
