let fs = require('fs')
let path = require('path')
let prettier = require('prettier')
let prettierConfig = require('../.prettierrc.js')
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
    console.log(`Running create-site...
  
  Usage: create-site name=some-string
  
  Also supporting --dry and --help`)
    return
  }

  if (!args.name) {
    throw new Error('No name provided')
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
      parser
        ? prettier.format(contents, { ...prettierConfig, parser })
        : contents,
    )
  }

  let packagePath = path.join('packages', args.name)

  // make package folder
  if (args.dry) {
    console.log('Creating Package: ')
    console.log(packagePath)
    console.log('')
  } else {
    fs.mkdirSync(packagePath)
  }

  // make src folder
  if (args.dry) {
    console.log('Creating Src folder: ')
    console.log(`${packagePath}/src`)
    console.log('')
  } else {
    fs.mkdirSync(path.join(packagePath, 'src'))
  }

  writeOrConsole(
    path.join(packagePath, 'src', 'index.html'),
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>${args.name}</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="./index.js"></script>
      </body>
    </html>
    `,
    'html',
  )

  writeOrConsole(
    path.join(packagePath, 'src', 'index.js'),
    `import React from 'react'
    import { BrowserRouter } from '@matthamlin/reroute-browser'
    import { ThemeProvider } from '@matthamlin/component-library'
    import { createRoot } from 'react-dom'
    
    createRoot(document.querySelector('#root')).render(
      <ThemeProvider>
        <BrowserRouter>
          <div>TODO</div>
        </BrowserRouter>
      </ThemeProvider>,
    )
    `,
  )

  // make readme
  writeOrConsole(
    path.join(packagePath, 'README.md'),
    `# \`@matthamlin/${args.name}\`
  
  TODO
  
  ## Running
  
  * yarn zaps run watch
  `,
    'markdown',
  )

  // make babel.config.js
  writeOrConsole(
    path.join(packagePath, 'babel.config.js'),
    `module.exports = function(api) {
    api.cache.never()
    return {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }
  }`,
  )

  // make package.json
  writeOrConsole(
    path.join(packagePath, 'package.json'),
    `{
    "name": "@matthamlin/${args.name}",
    "version": "0.0.0",
    "author": "Matthew Hamlin <matthewjameshamlin@gmail.com> (https://matthamlin.me/)",
    "license": "MIT",
    "scripts": {
      "watch": "parcel src/index.html",
      "build": "parcel build src/index.html --out-dir public",
      "test": "jest",
      "test-watch": "jest --watch"
    },
    "jest": {
      "transform": {
        "^.+\\\\.js$": "babel-jest"
      }
    },
    "dependencies": {
      "@matthamlin/property-controls": "*",
      "@matthamlin/component-library": "*",
      "@matthamlin/reroute-browser": "*",
      "@matthamlin/reroute-core": "*",
      "@matthamlin/simple-cache": "*",
      "@matthamlin/error-boundary": "*",
      "react": "experimental",
      "react-dom": "experimental"
    },
    "alias": {
      "react": "./node_modules/react",
      "react-dom": "./node_modules/react-dom"
    },
    "devDependencies": {
      "@babel/cli": "7.5.0",
      "@babel/core": "7.5.0",
      "@babel/preset-env": "7.5.0",
      "@babel/preset-react": "^7.7.4",
      "@testing-library/jest-dom": "^4.2.4",
      "@testing-library/react": "^9.3.2",
      "jest": "24.9.0",
      "parcel": "1.12.4"
    },
    "publishConfig": {
      "access": "public",
      "registry": "https://registry.npmjs.org/"
    },
    "repository": {
      "type": "git",
      "url": "ssh://git@github.com/hamlim/projects.git",
      "directory": "packages/${args.name}"
    }
  }`,
    'json',
  )

  // Write to labeler config

  let labelerPath = path.join('.github', 'labeler.yml')

  let originalLabeler = fs.readFileSync(labelerPath).toString()

  let labelName = args.name
    .split('-')
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join(' ')

  writeOrConsole(
    labelerPath,
    `${originalLabeler}
📦 ${labelName}:
  - packages/${args.name}/**/*`,
    'yaml',
  )

  // Write to .gitconfig

  let gitIgnorePath = path.join('.gitignore')

  let originalGitIgnore = fs.readFileSync(gitIgnorePath).toString()

  writeOrConsole(
    gitIgnorePath,
    `${originalGitIgnore}
packages/${args.name}/.cache/
packages/${args.name}/public/`,
    false,
  )

  // Run zaps init after making the package
  exec(`yarn zaps init`, { stdio: 'inherit' })
}

main()
