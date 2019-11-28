let fs = require('fs')
let path = require('path')

let args = process.argv.slice(2).reduce((acc, arg) => {
  let [key, val] = arg.split('=')
  acc[key] = val
  return acc
}, {})

if (!args.packageName) {
  throw new Error('No packageName provided')
}

let packagePath = path.join('packages', args.packageName)

// make package folder
fs.mkdirSync(packagePath)

// make readme
fs.writeFileSync(
  path.join(packagePath, 'README.md'),
  `# \`@hamlim/${args.packageName}\`

TODO

## API

TODO
`,
)

// make babel.config.js
fs.writeFileSync(
  path.join(packagePath, 'babel.config.js'),
  `module.exports = function(api) {
  api.cache.never()
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
  }
}`,
)

// make package.json
fs.writeFileSync(
  path.join(packagePath, 'package.json'),
  `{
  "name": "@hamlim/${args.packageName}",
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

let labelName = packageName
  .split('-')
  .map(s => s.toUpperCase())
  .join(' ')

fs.writeFileSync(
  labelerPath,
  `${originalLabeler}
📦 ${labelName}:
  - packages/${args.packageName}/**/*`,
)
