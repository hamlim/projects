let fs = require('fs')
let path = require('path')
let prettier = require('prettier')
let { exec } = require('child_process')

let args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.includes('=')) {
    let [key, val] = arg.split('=')
    acc[key] = val
  } else {
    let [, key] = arg.split('--')
    acc[key] = true
  }
  return acc
}, {})

function main() {
  if (args.help || Object.keys(args).length === 0) {
    console.log(`Running add-component...
  
  Usage: add-component componentName=some-string
  
  Also supporting --dry and --help`)
    return
  }

  if (!args.componentName) {
    throw new Error('No componentName provided')
  }

  function writeOrConsole(path, contents, parser = 'babel') {
    if (args.dry) {
      console.log('------------')
      console.log('Creating File: ')
      console.log(path)
      console.log('')
      console.log(contents)
      console.log('------------')
      return
    }
    fs.writeFileSync(
      path,
      parser ? prettier.format(contents, { parser }) : contents,
    )
  }

  let componentPath = path.join(
    'packages',
    'component-library',
    'src',
    args.componentName,
  )

  // make component file
  writeOrConsole(`${componentPath}.js`, '', null)

  // add to index
  let indexPath = path.join('packages', 'component-library', 'src', 'index.js')

  let currentIndex = fs.readFileSync(indexPath).toString()

  writeOrConsole(
    indexPath,
    `${currentIndex}
export * from './${args.componentName}.js'`,
  )

  // add failing test to index.test.js
  let indexTestPath = path.join(
    'packages',
    'component-library',
    'src',
    '__tests__',
    'index-test.js',
  )

  let currentIndexTests = fs.readFileSync(indexTestPath).toString()

  writeOrConsole(
    indexTestPath,
    `${currentIndexTests}
    
test('${args.componentName} is defined', () => {
  expect(undefined).toBeDefined()
})`,
  )
}

main()
