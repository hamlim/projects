let fs = require('fs')
let path = require('path')
let prettier = require('prettier')
let { exec } = require('child_process')
let prettierConfig = require('../.prettierrc.js')

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
    console.log(`Running create-package...
  
  Usage: create-package packageName=some-string
  
  Also supporting --dry and --help`)
    return
  }

  if (!args.packageName) {
    throw new Error('No packageName provided')
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
      prettier.format(contents, { ...prettierConfig, parser }),
    )
  }

  let packagePath = path.join('packages', args.packageName)

  // make package folder
  if (args.dry) {
    console.log('Creating Package: ')
    console.log(packagePath)
    console.log('')
  } else {
    fs.mkdirSync(packagePath)
  }

  // make readme
  writeOrConsole(
    path.join(packagePath, 'README.md'),
    `# \`@matthamlin/${args.packageName}\`
  
  TODO
  
  ## API
  
  TODO
  `,
    'markdown',
  )

  // make babel.config.js
  writeOrConsole(
    path.join(packagePath, 'babel.config.js'),
    `module.exports = require('@matthamlin/babel-config')()`,
  )

  // make package.json
  writeOrConsole(
    path.join(packagePath, 'package.json'),
    `{
    "name": "@matthamlin/${args.packageName}",
    "version": "0.0.0",
    "main": "dist/index.js",
    "author": "Matthew Hamlin <matthewjameshamlin@gmail.com> (https://matthamlin.me/)",
    "license": "MIT",
    "scripts": {
      "build": "babel src/ --out-dir dist/ --ignore '**/*.test.js'",
      "test": "jest",
      "test-watch": "jest --watch",
      "prepub": "yarn build",
      "pub": "yarn publish --access public --no-git-tag-version"
    },
    "jest": {
      "transform": {
        "^.+\\\\.js$": "babel-jest"
      }
    },
    "devDependencies": {
      "@babel/cli": "7.5.0",
      "@matthamlin/babel-config": "*",
      "@testing-library/jest-dom": "^4.2.4",
      "@testing-library/react": "^9.3.2",
      "jest": "24.9.0",
      "react": "*",
      "react-dom": "*"
    },
    "publishConfig": {
      "access": "public",
      "registry": "https://registry.npmjs.org/"
    },
    "repository": {
      "type": "git",
      "url": "ssh://git@github.com/hamlim/projects.git",
      "directory": "packages/${args.packageName}"
    }
  }`,
    'json',
  )

  // Write to labeler config

  let labelerPath = path.join('.github', 'labeler.yml')

  let originalLabeler = fs.readFileSync(labelerPath).toString()

  let labelName = args.packageName
    .split('-')
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join(' ')

  writeOrConsole(
    labelerPath,
    `${originalLabeler}
📦 ${labelName}:
  - packages/${args.packageName}/**/*`,
    'yaml',
  )

  // Run zaps init after making the package
  exec(`yarn zaps init`, { stdio: 'inherit' })
}

main()
