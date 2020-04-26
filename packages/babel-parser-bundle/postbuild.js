let { writeFileSync, readFileSync } = require('fs')

let out = readFileSync('./dist/index.js', 'utf-8').toString()

let babelParserVersion = require('./package.json').dependencies['@babel/parser']

writeFileSync(
  './dist/index.js',
  `let exports = {};
export const babelParserVersion = "${babelParserVersion}";
${out}
export {parse, parseExpression, types as tokTypes};
`,
)
