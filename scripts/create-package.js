let fs = require('fs')
let path = require('path')

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
  if (args.help) {
    console.log(`Running create-package...
  
  Usage: create-package packageName=some-string
  
  Also supporting --dry and --help`)
    return
  }

  if (!args.packageName) {
    throw new Error('No packageName provided')
  }

  function writeOrConsole(path, contents) {
    if (args.dry) {
      console.log('------------')
      console.log('Creating File: ')
      console.log(path)
      console.log('')
      console.log(contents)
      console.log('------------')
      return
    }
    fs.writeFileSync(path, contents)
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
    "name": "@matthamlin/${args.packageName}",
    "version": "0.0.0",
    "main": "dist/index.js",
    "author": "Matthew Hamlin <matthewjameshamlin@gmail.com> (https://matthamlin.me/)",
    "license": "MIT",
    "scripts": {
      "build": "babel src/ --out-dir dist/ --ignore '**/*.test.js'",
      "test": "jest",
      "test-watch": "jest --watch"
    },
    "jest": {
      "transform": {
        "^.+\\\\.js$": "babel-jest"
      }
    },
    "devDependencies": {
      "@babel/cli": "7.5.0",
      "@babel/core": "7.5.0",
      "@babel/preset-env": "7.5.0",
      "@babel/preset-react": "^7.7.4",
      "@testing-library/jest-dom": "^4.2.4",
      "@testing-library/react": "^9.3.2",
      "jest": "24.8.0",
      "react": "^16.12.0",
      "react-dom": "^16.12.0"
    },
    "publishConfig": {
      "access": "public",
      "registry": "https://npm.pkg.github.com"
    },
    "repository": {
      "type": "git",
      "url": "ssh://git@github.com/hamlim/projects.git",
      "directory": "packages/${args.packageName}"
    }
  }`,
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
  )
}

main()
